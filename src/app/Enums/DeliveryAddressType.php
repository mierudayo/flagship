<?php

namespace App\Enums;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum DeliveryAddressType: int
{
    use WithLabel, WithValueArray;

    case CONSIGNEE  = 1;
    case SHIPPER    = 2;
    case BOTH       = 3;

    public function getLabel(): string
    {
        return match($this) {
            self::CONSIGNEE => '納品先',
            self::SHIPPER   => '引取先',
            self::BOTH      => '兼用',
        };
    }
}
