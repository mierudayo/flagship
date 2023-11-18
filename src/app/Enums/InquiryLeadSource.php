<?php

namespace App\Enums;

enum InquiryLeadSource: int
{
    case HP         = 1;
    case TEL        = 2;
    case Mail       = 3;
    case Exhibition = 4;

    public function getLabel(): string
    {
        return match($this) {
            self::HP         => 'HP',
            self::TEL        => 'TEL',
            self::Mail       => 'メール',
            self::Exhibition => '展示会',
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
}
