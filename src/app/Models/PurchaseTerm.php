<?php

namespace App\Models;

use App\Enums\PaymentTerm\BillingType;
use App\Enums\PaymentTerm\CutoffDay;
use App\Enums\PaymentTerm\PaymentDay;
use App\Enums\PaymentTerm\PaymentDayOffset;
use App\Enums\PaymentTerm\PaymentMonthOffset;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PurchaseTerm extends Model
{
    use HasFactory;

    protected $appends = [
        'billing_type_label',
        'cutoff_day_label',
        'payment_month_offset_label',
        'payment_day_label',
        'payment_day_offset_label',
    ];

    protected $fillable = [
        'customer_id',
        'billing_type',
        'cutoff_day',
        'payment_month_offset',
        'payment_day',
        'payment_day_offset',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */
    protected function getBillingTypeLabelAttribute(): ?string
    {
        return BillingType::getLabelFromValue($this->billing_type);
    }

    protected function getCutoffDayLabelAttribute(): ?string
    {
        return CutoffDay::getLabelFromValue($this->cutoff_day);
    }

    protected function getPaymentMonthOffsetLabelAttribute(): ?string
    {
        return PaymentMonthOffset::getLabelFromValue($this->payment_month_offset);
    }

    protected function getPaymentDayLabelAttribute(): ?string
    {
        return PaymentDay::getLabelFromValue($this->payment_day);
    }
    
    protected function getPaymentDayOffsetLabelAttribute(): ?string
    {
        return PaymentDayOffset::getLabelFromValue($this->payment_day_offset);
    }
}
