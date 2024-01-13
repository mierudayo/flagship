<?php

namespace App\Models;

use App\Services\AddressService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'name_kana',
        'shortcut',
        'postal_code',
        'address',
        'tel',
        'fax',
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

    public function contacts(): HasMany
    {
        return $this->hasMany(CustomerContact::class);
    }

    public function deliveryAddresses(): HasMany
    {
        return $this->hasMany(DeliveryAddress::class);
    }

    public function purchaseTerm(): HasOne
    {
        return $this->hasOne(PurchaseTerm::class);
    }

    public function salesTerm(): HasOne
    {
        return $this->hasOne(SalesTerm::class);
    }

    public function salesOrders(): HasMany
    {
        return $this->hasMany(SalesOrder::class);
    }

    public function purchaseOrders(): HasMany
    {
        return $this->hasMany(PurchaseOrder::class);
    }

    public function billingAddresses(): BelongsToMany
    {
        return $this->belongsToMany(BillingAddress::class, 'billing_address_customer');
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors & Mutators
    |--------------------------------------------------------------------------
    */
    public function setAddressAttribute(?string $value): void
    {
        $this->attributes['address'] = $value;

        $addressService = new AddressService();
        $prefectureId   = $addressService->getPrefectureIdFromAddress($value);

        $this->attributes['prefecture_id'] = $prefectureId;
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
            $query->where('name', 'like', "%$keyword%")
                ->orWhere('name_kana', 'like', "%$keyword%")
                ->orWhere('shortcut', 'like', "%$keyword%");
        });
    }

    public function scopeSearchById(Builder $query, ?string $id): Builder
    {
        if (!$id) {
            return $query;
        }

        return $query->where('id', $id);
    }

    public function scopeSearchByInCharge(Builder $query, ?string $inChargeId): Builder
    {
        if (!$inChargeId) {
            return $query;
        }

        return $query->where('in_charge_user_id', $inChargeId);
    }

    public function scopeSearchByAddress(Builder $query, ?string $address): Builder
    {
        if (!$address) {
            return $query;
        }

        return $query->where('address', 'like', "%$address%");
    }

    public function scopeSearchByPhone(Builder $query, ?string $phone): Builder
    {
        if (!$phone) {
            return $query;
        }

        return $query->where(function ($q) use ($phone) {
            $q->where('tel', 'like', "%$phone%")
                ->orWhere('fax', 'like', "%$phone%");
        });
    }

    public function scopeSearchByDeliveryAddress(Builder $query, ?string $deliveryAddress): Builder
    {
        if (!$deliveryAddress) {
            return $query;
        }

        return $query->whereHas('deliveryAddresses', function ($q) use ($deliveryAddress) {
            $q->where('address', 'like', "%$deliveryAddress%");
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Business Logic
    |--------------------------------------------------------------------------
    */
    public function canDelete(): bool
    {
        if ($this->contacts()->exists()) {
            return false;
        }

        if ($this->deliveryAddresses()->exists()) {
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

    public function hasBillingAddress(int $billingAddressId): bool
    {
        return $this->billingAddresses()->where('billing_addresses.id', $billingAddressId)->exists();
    }
}
