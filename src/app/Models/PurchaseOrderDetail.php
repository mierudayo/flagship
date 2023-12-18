<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PurchaseOrderDetail extends Model
{
    use HasFactory;

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
}
