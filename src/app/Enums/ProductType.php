<?php

namespace App\Enums;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum ProductType: int
{
    use WithLabel, WithValueArray;

    case Product  = 1;
    case Service  = 2;

    public function getLabel(): string
    {
        return match($this) {
            self::Product  => '製品',
            self::Service  => 'サービス',
        };
    }
}
