<?php

namespace App\Enums;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum InquiryLeadSource: int
{
    use WithLabel, WithValueArray;

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
}
