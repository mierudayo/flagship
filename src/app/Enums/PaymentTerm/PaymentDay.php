<?php

namespace App\Enums\PaymentTerm;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum PaymentDay: int
{
    use WithLabel, WithValueArray;

    case DAY_10    = 10;
    case DAY_15    = 15;
    case DAY_20    = 20;
    case DAY_25    = 25;
    case END_MONTH = 99;

    public function getLabel(): string
    {
        return match($this) {
            self::DAY_10    => '10日',
            self::DAY_15    => '15日',
            self::DAY_20    => '20日',
            self::DAY_25    => '25日',
            self::END_MONTH => '末日',
        };
    }
}

