<?php

namespace App\Enums;

enum DeliveryAddressType: int
{
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

    public static function toArray(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn($case) => [$case->value => $case->getLabel()])
            ->all();
    }
}
