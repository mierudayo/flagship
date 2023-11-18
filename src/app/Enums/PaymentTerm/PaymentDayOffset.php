<?php

namespace App\Enums\PaymentTerm;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum PaymentDayOffset: int
{
    use WithLabel, WithValueArray;

    case PREPAYMENT        = 0;
    case WITHIN_3_DAYS     = 3;
    case WITHIN_7_DAYS     = 7;

    public function getLabel(): string
    {
        return match($this) {
            self::PREPAYMENT      => '前払い',
            self::WITHIN_3_DAYS   => '3営業日以内',
            self::WITHIN_7_DAYS   => '7営業日以内',
        };
    }
}
