<?php

namespace App\Enums\PaymentTerm;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum BillingType: int
{
    use WithLabel, WithValueArray;

    case CloseBilling  = 1;
    case EachTime      = 2;

    public function getLabel(): string
    {
        return match($this) {
            self::CloseBilling => '締め請求',
            self::EachTime     => '都度請求',
        };
    }
}
