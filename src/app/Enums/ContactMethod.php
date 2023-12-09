<?php

namespace App\Enums;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum ContactMethod: int
{
    use WithLabel, WithValueArray;

    case Hp         = 1;
    case Tel        = 2;
    case Email      = 3;
    case Exhibition = 4;

    public function getLabel(): string
    {
        return match($this) {
            self::Hp         => 'HP',
            self::Tel        => 'TEL',
            self::Email      => 'メール',
            self::Exhibition => '展示会',
        };
    }
}
