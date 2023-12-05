<?php

namespace App\Enums;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum InquiryStatus: int
{
    use WithLabel, WithValueArray;

    case Processing     = 1;
    case AwaitingReply  = 2;
    case OnHold         = 3;
    case Success        = 4;
    case Failed         = 5;
    case Passed         = 6;
    case Other          = 7;

    public function getLabel(): string
    {
        return match($this) {
            self::Processing     => '対応中',
            self::AwaitingReply  => '返信待ち',
            self::OnHold         => '保留',
            self::Success        => '成約',
            self::Failed         => '失注',
            self::Passed         => '見送り',
            self::Other          => 'その他',
        };
    }
}
