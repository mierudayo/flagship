<?php

namespace App\Models;

use App\Enums\DeliveryAddressType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DeliveryAddress extends Model
{
    use HasFactory;

    protected $appends = ['address_type_label'];

    protected $fillable = [
        'customer_id',
        'address_type',
        'post_code',
        'address',
        'company_name',
        'contact_name',
        'tel',
        'note',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    |
    */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */
    protected function getAddressTypeLabelAttribute(): string
    {
        return DeliveryAddressType::from($this->address_type)->getLabel();
    }
}
