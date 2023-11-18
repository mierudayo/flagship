<?php

namespace App\Enums\PaymentTerm;

enum CutoffDay: int
{
    case DAY_10    = 10;
    case DAY_15    = 15;
    case DAY_20    = 20;
    case DAY_25    = 25;
    case END_MONTH = 99;

    public function getLabel(): string
    {
        return match($this) {
            self::DAY_10    => '10日締め',
            self::DAY_15    => '15日締め',
            self::DAY_20    => '20日締め',
            self::DAY_25    => '25日締め',
            self::END_MONTH => '月末締め',
        };
    }

    public static function toArray(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn($case) => [$case->value => $case->getLabel()])
            ->all();
    }

    public static function getLabelFromValue(?int $value): ?string
    {
        if ($value === null) {
            return null;
        }

        try {
            return self::from($value)->getLabel();
        } catch (\ValueError $exception) {
            return null;
        }
    }
}
