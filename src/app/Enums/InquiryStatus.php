<?php

namespace App\Enums;

enum InquiryStatus: int
{
    case PROCESSING     = 1;
    case AWAITING_REPLY = 2;
    case ON_HOLD        = 3;
    case SUCCESS        = 4;
    case FAILED         = 5;
    case PASSED         = 6;
    case OTHER          = 7;

    public function getLabel(): string
    {
        return match($this) {
            self::PROCESSING     => '対応中',
            self::AWAITING_REPLY => '返信待ち',
            self::ON_HOLD        => '保留',
            self::SUCCESS        => '成約',
            self::FAILED         => '失注',
            self::PASSED         => '見送り',
            self::OTHER          => 'その他',
        };
    }

    public static function toArray(): array
    {
        return collect(self::cases())
            ->mapWithKeys(function ($case) {
                return [$case->value => $case->getLabel()];
            })
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
