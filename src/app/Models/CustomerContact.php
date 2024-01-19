<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CustomerContact extends Model
{
    use HasFactory;

    protected $appends = [
        'is_active_label'
    ];

    protected $fillable = [
        'customer_id',
        'lead_source_id',
        'name',
        'name_kana',
        'tel',
        'mobile_number',
        'email',
        'position',
        'role',
        'is_active',
        'note',
        'in_charge_user_id',
        'created_by_id',
        'updated_by_id',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime:Y-m-d H:i',
        'updated_at' => 'datetime:Y-m-d H:i',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function leadSource(): BelongsTo
    {
        return $this->belongsTo(LeadSource::class);
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

    public function inquiries(): HasMany
    {
        return $this->hasMany(Inquiry::class);
    }

    public function salesActivities(): HasMany
    {
        return $this->hasMany(SalesActivity::class);
    }

    public function salesOrders(): HasMany
    {
        return $this->hasMany(SalesOrder::class);
    }

    public function purchaseOrders(): HasMany
    {
        return $this->hasMany(PurchaseOrder::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */
    protected function getIsActiveLabelAttribute(): string
    {
        return $this->is_active ? '✅' : '🆖';
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
            $q->where('name', 'like', "%$keyword%")
                ->orWhere('name_kana', 'like', "%$keyword%")
                ->orWhereHas('customer', function (Builder $subQuery) use ($keyword) {
                    $subQuery->where('name', 'like', "%$keyword%")
                        ->orWhere('name_kana', 'like', "%$keyword%");
                });
        });
    }

    public function scopeSearchById(Builder $query, ?string $id): Builder
    {
        if (!$id) {
            return $query;
        }

        return $query->where('id', $id);
    }

    public function scopeSearchByCustomerName(Builder $query, ?string $customerName): Builder
    {
        if (!$customerName) {
            return $query;
        }

        return $query->whereHas('customer', function ($q) use ($customerName) {
            $q->where('name', 'like', "%$customerName%");
        });
    }

    public function scopeSearchByPhone(Builder $query, ?string $phone): Builder
    {
        if (!$phone) {
            return $query;
        }

        return $query->where(function ($q) use ($phone) {
            $q->where('tel', 'like', "%$phone%")
                ->orWhere('mobile_number', 'like', "%$phone%");
        });
    }

    public function scopeSearchByEmail(Builder $query, ?string $email): Builder
    {
        if (!$email) {
            return $query;
        }

        return $query->where('email', 'like', "%$email%");
    }

    public function scopeSearchByLeadSource(Builder $query, ?string $lead_source_id): Builder
    {
        if (!$lead_source_id) {
            return $query;
        }

        return $query->where('lead_source_id', $lead_source_id);
    }

    /*
    |--------------------------------------------------------------------------
    | Custom Methods
    |--------------------------------------------------------------------------
    */
    public function canDelete(): bool
    {
        if ($this->inquiries()->exists()) {
            return false;
        }

        if ($this->salesActivities()->exists()) {
            return false;
        }

        if ($this->salesOrders()->exists()) {
            return false;
        }

        if ($this->purchaseOrders()->exists()) {
            return false;
        }

        return true;
    }
}
