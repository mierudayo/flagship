<?php

namespace App\Models;

use App\Enums\SalesActivityStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SalesActivity extends Model
{
    use HasFactory;

    protected $appends = ['status_label'];

    protected $fillable = [
        'contact_date',
        'status',
        'customer_contact_id',
        'proposal',
        'feedback',
        'note',
        'in_charge_user_id',
        'created_by_id',
        'updated_by_id',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i',
        'updated_at' => 'datetime:Y-m-d H:i',
    ];

    public function customerContact(): BelongsTo
    {
        return $this->belongsTo(CustomerContact::class);
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

    /** Enumクラスに定義した表示用ラベル */
    protected function getStatusLabelAttribute(): string
    {
        if (!isset($this->attributes['status'])) {
            return '';
        }

        return SalesActivityStatus::getLabelFromValue($this->status);
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

        return $query->where(function ($q) use ($keyword) {
            $q->whereHas('customerContact', function (Builder $subQuery) use ($keyword) {
                $subQuery->where('name', 'like', "%$keyword%")
                    ->orWhere('name_kana', 'like', "%$keyword%")
                    ->orWhereHas('customer', function (Builder $subSubQuery) use ($keyword) {
                        $subSubQuery->where('name', 'like', "%$keyword%");
                    });
            });
        });
    }

    public function scopeSearchByStatus(Builder $query, ?string $status): Builder
    {
        if (!$status) {
            return $query;
        }

        return $query->where('status', $status);
    }

    public function scopeSearchByInquiryPeriod(Builder $query, ?string $startDate, ?string $endDate): Builder
    {
        if ($startDate && $endDate) {
            return $query->whereBetween('contact_date', [$startDate, $endDate]);
        }

        if ($startDate) {
            return $query->where('contact_date', '>=', $startDate);
        }

        if ($endDate) {
            return $query->where('contact_date', '<=', $endDate);
        }

        return $query;
    }

    public function scopeSearchByInCharge(Builder $query, ?string $inChargeId): Builder
    {
        if (!$inChargeId) {
            return $query;
        }

        return $query->where('in_charge_user_id', $inChargeId);
    }
}
