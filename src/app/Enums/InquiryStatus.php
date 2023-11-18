<?php

namespace App\Enums;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum InquiryStatus: int
{
    use WithLabel, WithValueArray;

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
}
