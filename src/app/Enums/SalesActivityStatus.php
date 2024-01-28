<?php

namespace App\Enums;

use App\Enums\Traits\WithLabel;
use App\Enums\Traits\WithValueArray;

enum SalesActivityStatus: int
{
    use WithLabel, WithValueArray;

    case AwaitingReply  = 1;
    case OnHold         = 2;
    case Success        = 3;
    case Failed         = 4;
    case Passed         = 5;
    case Other          = 6;

    public function getLabel(): string
    {
        return match($this) {
            self::AwaitingReply  => '返信待ち',
            self::OnHold         => '保留',
            self::Success        => '成約',
            self::Failed         => '失注',
            self::Passed         => '見送り',
            self::Other          => 'その他',
        };
    }
}
