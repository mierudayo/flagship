<?php

namespace App\Models;

use App\Enums\InquiryStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inquiry extends Model
{
    use HasFactory;

    protected $appends = ['status_label'];

    protected $fillable = [
        'inquiry_date',
        'customer_contact_id',
        'product_id',
        'product_detail',
        'inquiry_type_id',
        'project_scale',
        'contact_method',
        'status',
        'subject',
        'message',
        'answer',
        'feedback',
        'note',
        'in_charge_user_id',
        'created_by_id',
        'updated_by_id',
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i',
        'updated_at' => 'datetime:Y-m-d H:i',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */
    public function customerContact(): BelongsTo
    {
        return $this->belongsTo(CustomerContact::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function inquiryType(): BelongsTo
    {
        return $this->belongsTo(InquiryType::class);
    }

    public function inChargeUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'in_charge_user_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by_id');
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */
    protected function getStatusLabelAttribute(): string
    {
        return InquiryStatus::getLabelFromValue($this->status);
    }

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */
    public function scopeSearchByKeyword(Builder $query, ?string $keyword): Builder
    {
        if (!$keyword) {
            return $query;
        }

        return $query->where(function ($query) use ($keyword) {
            $query->where('subject', 'like', "%$keyword%")
                ->orWhere('message', 'like', "%$keyword%");
        });
    }

    public function scopeSearchByInquiryPeriod(Builder $query, ?string $startDate, ?string $endDate): Builder
    {
        if ($startDate && $endDate) {
            return $query->whereBetween('inquiry_date', [$startDate, $endDate]);
        }

        if ($startDate) {
            return $query->where('inquiry_date', '>=', $startDate);
        }

        if ($endDate) {
            return $query->where('inquiry_date', '<=', $endDate);
        }

        return $query;
    }

    public function scopeSearchById(Builder $query, ?string $id): Builder
    {
        if (!$id) {
            return $query;
        }

        return $query->where('id', $id);
    }

    public function scopeSearchByCustomerInfo(Builder $query, ?string $customerInfo): Builder
    {
        if (!$customerInfo) {
            return $query;
        }

        return $query->where(function ($q) use ($customerInfo) {
            $q->whereHas('customerContact', function (Builder $subQuery) use ($customerInfo) {
                $subQuery->where('name', 'like', "%$customerInfo%")
                    ->orWhere('name_kana', 'like', "%$customerInfo%")
                    ->orWhereHas('customer', function (Builder $subSubQuery) use ($customerInfo) {
                        $subSubQuery->where('name', 'like', "%$customerInfo%");
                    });
            });
        });
    }
}
