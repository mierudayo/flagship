<?php

namespace App\Enums;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum DeliveryAddressType: int
{
    use WithLabel, WithValueArray;

    case SHIPPER    = 1;
    case CONSIGNEE  = 2;
    case BOTH       = 3;

    public function getLabel(): string
    {
        return match($this) {
            self::SHIPPER   => '出荷元',
            self::CONSIGNEE => '納品先',
            self::BOTH      => '出荷/納品兼用',
        };
    }
}
