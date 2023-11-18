<?php

namespace App\Enums\PaymentTerm;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum BillingType: int
{
    use WithLabel, WithValueArray;

    case CLOSE_BILLING  = 1;
    case EACH_TIME      = 2;

    public function getLabel(): string
    {
        return match($this) {
            self::CLOSE_BILLING => '締め請求',
            self::EACH_TIME     => '都度請求',
        };
    }
}
