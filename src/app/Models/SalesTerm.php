<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SalesTerm extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'cutoff_day',
        'payment_month_offset',
        'payment_day',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
