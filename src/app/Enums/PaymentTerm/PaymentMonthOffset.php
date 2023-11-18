<?php

namespace App\Enums\PaymentTerm;

enum PaymentMonthOffset: int
{
    case CURRENT_MONTH    = 0;
    case NEXT_MONTH       = 1;
    case MONTH_AFTER_NEXT = 2;

    public function getLabel(): string
    {
        return match($this) {
            self::CURRENT_MONTH    => '当月',
            self::NEXT_MONTH       => '翌月',
            self::MONTH_AFTER_NEXT => '翌々月',
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
