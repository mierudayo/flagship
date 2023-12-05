<?php

namespace App\Enums\PaymentTerm;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum PaymentDay: int
{
    use WithLabel, WithValueArray;

    case Day10       = 10;
    case Day15       = 15;
    case Day20       = 20;
    case Day25       = 25;
    case EndMonth    = 99;

    public function getLabel(): string
    {
        return match($this) {
            self::Day10      => '10日',
            self::Day15      => '15日',
            self::Day20      => '20日',
            self::Day25      => '25日',
            self::EndMonth   => '末日',
        };
    }
}

