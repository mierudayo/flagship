<?php

namespace App\Enums\PaymentTerm;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum PaymentMonthOffset: int
{
    use WithLabel, WithValueArray;

    case CurrentMonth    = 0;
    case NextMonth       = 1;
    case MonthAfterNext  = 2;

    public function getLabel(): string
    {
        return match($this) {
            self::CurrentMonth    => '当月',
            self::NextMonth       => '翌月',
            self::MonthAfterNext  => '翌々月',
        };
    }
}
