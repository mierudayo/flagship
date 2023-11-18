<?php

namespace App\Enums;

enum InquiryLeadSource: int
{
    case HP         = 1;
    case TEL        = 2;
    case MAIL       = 3;
    case EXHIBITION = 4;

    public function getLabel(): string
    {
        return match($this) {
            self::HP         => 'HP',
            self::TEL        => 'TEL',
            self::MAIL       => 'メール',
            self::EXHIBITION => '展示会',
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
