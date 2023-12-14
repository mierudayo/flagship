<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SalesOrder extends Model
{
    use HasFactory;

    protected $appends = [
        'display_subtotal_amount',
        'display_total_amount',
    ];

    protected $fillable = [
        'customer_id',
        'customer_contact_id',
        'billing_address_id',
        'delivery_address_id',
        'product_category_id',
        'billing_type',
        'cutoff_day',
        'payment_month_offset',
        'payment_day',
        'payment_day_offset',
        'payment_date',
        'payment_status',
        'customer_name',
        'delivery_address',
        'order_date',
        'shipping_date',
        'shipping_status',
        'delivery_date',
        'delivery_status',
        'delivery_memo',
        'subtotal_amount',
        'total_amount',
        'note',
        'sales_in_charge_id',
        'created_by_id',
        'updated_by_id',
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

    public function customerContact(): BelongsTo
    {
        return $this->belongsTo(CustomerContact::class);
    }

    public function billingAddress(): BelongsTo
    {
        return $this->belongsTo(BillingAddress::class);
    }

    public function deliveryAddress(): BelongsTo
    {
        return $this->belongsTo(DeliveryAddress::class);
    }

    public function productCategory(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function salesInCharge(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sales_in_charge_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by_id');
    }

    public function salesOrderDetails(): HasMany
    {
        return $this->hasMany(SalesOrderDetail::class)->orderBy('row_number');
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

    /** 受注合計額(税抜き) */
    public function getSubtotalAmountAttribute(): int
    {
        return $this->salesOrderDetails->sum('subtotal');
    }

    public function getDisplaySubtotalAmountAttribute(): string
    {
        return number_format($this->subtotal_amount);
    }

    /** 受注合計額(税込) */
    public function getTotalAmountAttribute(): int
    {
        return $this->salesOrderDetails->sum('total');
    }

    public function getDisplayTotalAmountAttribute(): string
    {
        return number_format($this->total_amount);
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
            $query->where('id', $keyword)
                ->orWhere('customer_name', 'like', "%$keyword%");
        });
    }
}
