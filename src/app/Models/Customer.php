<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    |
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
        return $this->hasMany(CustomerContact::class, 'customer_id');
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
            $query->where('name', 'LIKE', "%$keyword%")
                  ->orWhere('name_kana', 'LIKE', "%$keyword%")
                  ->orWhere('shortcut', 'LIKE', "%$keyword%");
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Business Logic
    |--------------------------------------------------------------------------
    |
    */
    public function canDelete(): bool
    {
        if ($this->contacts()->exists()) {
            return false;
        }

        if ($this->deliveryAddresses()->exists()) {
            return false;
        }

        return true;
    }
}
