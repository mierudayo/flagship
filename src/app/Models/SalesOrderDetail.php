<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class SalesOrderDetail extends Model
{
    use HasFactory;

    protected $appends = [
        'display_subtotal',
        'display_total',
    ];

    protected $fillable = [
        'sales_order_id',
        'row_number',
        'product_id',
        'product_name',
        'product_detail',
        'quantity',
        'unit_price',
        'tax_rate',
        'is_tax_inclusive',
        'subtotal',
        'total',
        'note',
    ];

    public function salesOrder(): BelongsTo
    {
        return $this->belongsTo(SalesOrder::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function purchaseOrderDetails(): BelongsToMany
    {
        return $this->belongsToMany(PurchaseOrderDetail::class, 'sales_purchase_order_details');
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

    /** 小計(税抜き) */
    public function getSubtotalAttribute(): string
    {
        return number_format($this->calculateSubtotal(), 2, '.', '');
    }

    public function getDisplaySubtotalAttribute(): string
    {
        return number_format($this->subtotal);
    }

    /** 合計(税込) */
    public function getTotalAttribute(): string
    {
        $total = $this->calculateSubtotal() * (1 + $this->tax_rate);
        return number_format($total, 2, '.', '');
    }

    public function getDisplayTotalAttribute(): string
    {
        return number_format($this->total);
    }

    /*
    |--------------------------------------------------------------------------
    | other methods
    |--------------------------------------------------------------------------
    */

    protected function calculateSubtotal(): float
    {
        $subtotal = $this->quantity * $this->unit_price;

        if ($this->is_tax_inclusive) {
            $subtotal =  $subtotal / (1 + $this->tax_rate);
        }

        return $subtotal;
    }
}
