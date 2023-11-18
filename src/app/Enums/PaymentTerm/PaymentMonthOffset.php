<?php

namespace App\Enums\PaymentTerm;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum PaymentMonthOffset: int
{
    use WithLabel, WithValueArray;

    case CURRENT_MONTH    = 0;
    case NEXT_MONTH       = 1;
    case MONTH_AFTER_NEXT = 2;

    public function getLabel(): string
    {
        return match($this) {
            self::CURRENT_MONTH    => '当月',
            self::NEXT_MONTH       => '翌月',
            self::MONTH_AFTER_NEXT => '翌々月',
        };
    }
}
