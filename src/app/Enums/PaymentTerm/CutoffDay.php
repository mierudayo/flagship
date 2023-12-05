<?php

namespace App\Enums\PaymentTerm;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum CutoffDay: int
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
            self::Day10      => '10日締め',
            self::Day15      => '15日締め',
            self::Day20      => '20日締め',
            self::Day25      => '25日締め',
            self::EndMonth   => '月末締め',
        };
    }
}
