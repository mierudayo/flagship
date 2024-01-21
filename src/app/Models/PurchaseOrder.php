<?php

namespace App\Models;

use App\Enums\PaymentTerm\BillingType;
use App\Enums\PaymentTerm\CutoffDay;
use App\Enums\PaymentTerm\PaymentDay;
use App\Enums\PaymentTerm\PaymentDayOffset;
use App\Enums\PaymentTerm\PaymentMonthOffset;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PurchaseOrder extends Model
{
    use HasFactory;

    protected $appends = [
        'purchase_term_labels',
        'total',
        'total_with_tax',
    ];

    protected $fillable = [
        'customer_id',
        'customer_contact_id',
        'delivery_address_id',
        'product_category_id',
        'billing_type',
        'cutoff_day',
        'payment_month_offset',
        'payment_day',
        'payment_day_offset',
        'payment_date',
        'payment_status',
        'ship_from_address',
        'ship_from_company',
        'ship_from_contact',
        'purchase_date',
        'shipping_date',
        'note',
        'purchase_in_charge_id',
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
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function customerContact(): BelongsTo
    {
        return $this->belongsTo(CustomerContact::class);
    }

    public function deliveryAddress(): BelongsTo
    {
        return $this->belongsTo(DeliveryAddress::class);
    }

    public function productCategory(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function purchaseInCharge(): BelongsTo
    {
        return $this->belongsTo(User::class, 'purchase_in_charge_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by_id');
    }

    public function purchaseOrderDetails(): HasMany
    {
        return $this->hasMany(PurchaseOrderDetail::class)->orderBy('row_number');
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

    /** 発注合計額(税抜き) */
    public function getTotalAttribute(): int
    {
        return $this->purchaseOrderDetails->sum('price');
    }

    /** 発注合計額(税込) */
    public function getTotalWithTaxAttribute(): int
    {
        return $this->purchaseOrderDetails->sum('price_with_tax');
    }

    /** 支払条件の表示用ラベル */
    public function getPurchaseTermLabelsAttribute(): array
    {
        return [
            'billing_type'  => BillingType::getLabelFromValue($this->billing_type),
            'cutoff_day'    => CutoffDay::getLabelFromValue($this->cutoff_day),
            'payment_month_offset'  => PaymentMonthOffset::getLabelFromValue($this->payment_month_offset),
            'payment_day'           => PaymentDay::getLabelFromValue($this->payment_day),
            'payment_day_offset'    => PaymentDayOffset::getLabelFromValue($this->payment_day_offset),
        ];
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
                ->orWhereHas('customer', function ($q) use ($keyword) {
                    $q->where('name', 'like', "%$keyword%");
                });
        });
    }

    public function scopeSearchByShippingPeriod(Builder $query, ?string $startDate, ?string $endDate): Builder
    {
        if ($startDate && $endDate) {
            return $query->whereBetween('shipping_date', [$startDate, $endDate]);
        }

        if ($startDate) {
            return $query->where('shipping_date', '>=', $startDate);
        }

        if ($endDate) {
            return $query->where('shipping_date', '<=', $endDate);
        }

        return $query;
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

    public function scopeSearchByPurchaseInCharge(Builder $query, ?string $purchaseInChargeId): Builder
    {
        if (!$purchaseInChargeId) {
            return $query;
        }

        return $query->where('purchase_in_charge_id', $purchaseInChargeId);
    }

    public function scopeSearchByProductCategory(Builder $query, ?string $productCategoryId): Builder
    {
        if (!$productCategoryId) {
            return $query;
        }

        return $query->where('product_category_id', $productCategoryId);
    }

    public function scopeSearchByProductName(Builder $query, ?string $productName): Builder
    {
        if (!$productName) {
            return $query;
        }

        return $query->whereHas('purchaseOrderDetails', function ($q) use ($productName) {
            $q->where('product_name', 'like', "%$productName%");
        });
    }

    public function scopeSearchByShipFrom(Builder $query, ?string $shipFrom): Builder
    {
        if (!$shipFrom) {
            return $query;
        }

        return $query->where(function ($q) use ($shipFrom) {
            $q->where('ship_from_address', 'like', "%$shipFrom%")
                ->orWhere('ship_from_company', 'like', "%$shipFrom%");
        });
    }

    public function scopeSearchByProductDetail(Builder $query, ?string $productDetail): Builder
    {
        if (!$productDetail) {
            return $query;
        }

        return $query->whereHas('purchaseOrderDetails', function ($q) use ($productDetail) {
            $q->where('product_detail', 'like', "%$productDetail%");
        });
    }
}
