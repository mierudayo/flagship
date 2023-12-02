<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesOrder extends Model
{
    use HasFactory;

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
        'total_amount',
        'note',
        'sales_in_charge_id',
        'created_by_id',
        'updated_by_id',
    ];
}
