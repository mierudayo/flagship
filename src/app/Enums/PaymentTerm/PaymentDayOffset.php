<?php

namespace App\Enums\PaymentTerm;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum PaymentDayOffset: int
{
    use WithLabel, WithValueArray;

    case Prepayment       = 0;
    case Within3Days      = 3;
    case Within7Days      = 7;

    public function getLabel(): string
    {
        return match($this) {
            self::Prepayment    => '前払い',
            self::Within3Days   => '3営業日',
            self::Within7Days   => '7営業日',
        };
    }
}
