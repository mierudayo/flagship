<?php

namespace App\Enums\PaymentTerm;

enum PaymentDayOffset: int
{
    case PREPAYMENT        = 0;
    case WITHIN_3_DAYS     = 3;
    case WITHIN_7_DAYS     = 7;

    public function getLabel(): string
    {
        return match($this) {
            self::PREPAYMENT      => '前払い',
            self::WITHIN_3_DAYS   => '3営業日以内',
            self::WITHIN_7_DAYS   => '7営業日以内',
        };
    }

    public static function toArray(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn($case) => [$case->value => $case->getLabel()])
            ->all();
    }
}
