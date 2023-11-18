<?php

namespace App\Enums\PaymentTerm;

enum BillingType: int
{
    case CLOSE_BILLING  = 1;
    case EACH_TIME      = 2;

    public function getLabel(): string
    {
        return match($this) {
            self::CLOSE_BILLING => '締め請求',
            self::EACH_TIME     => '都度請求',
        };
    }

    public static function toArray(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn($case) => [$case->value => $case->getLabel()])
            ->all();
    }
}
