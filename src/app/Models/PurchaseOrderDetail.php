<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PurchaseOrderDetail extends Model
{
    use HasFactory;

    protected $appends = [
        'display_price',
        'display_price_with_tax',
    ];

    protected $fillable = [
        'purchase_order_id',
        'row_number',
        'product_id',
        'product_name',
        'product_detail',
        'quantity',
        'unit_price',
        'tax_rate',
        'is_tax_inclusive',
        'note',
    ];

    public function purchaseOrder(): BelongsTo
    {
        return $this->belongsTo(PurchaseOrder::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function purchaseOrderDetails(): BelongsToMany
    {
        return $this->belongsToMany(SalesOrderDetail::class, 'sales_purchase_order_details');
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

    /** 価格(税抜き) */
    public function getPriceAttribute(): string
    {
        return number_format($this->calculatePrice(), 2, '.', '');
    }

    public function getDisplayPriceAttribute(): string
    {
        return number_format($this->price);
    }

    /** 価格(税込) */
    public function getPriceWithTaxAttribute(): string
    {
        $priceWithTax = $this->calculatePrice() * (1 + $this->tax_rate);
        return number_format($priceWithTax, 2, '.', '');
    }

    public function getDisplayPriceWithTaxAttribute(): string
    {
        return number_format($this->price);
    }

    /*
    |--------------------------------------------------------------------------
    | other methods
    |--------------------------------------------------------------------------
    */

    protected function calculatePrice(): float
    {
        $price = $this->quantity * $this->unit_price;

        if ($this->is_tax_inclusive) {
            $price =  $price / (1 + $this->tax_rate);
        }

        return $price;
    }

}
