<?php

namespace App\Enums;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum AddressType: int
{
    use WithLabel, WithValueArray;

    case Consignee  = 1;
    case Shipper    = 2;
    case Both       = 3;

    public function getLabel(): string
    {
        return match($this) {
            self::Consignee => '納品先',
            self::Shipper   => '引取先',
            self::Both      => '兼用',
        };
    }
}
