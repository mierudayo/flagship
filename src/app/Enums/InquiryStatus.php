<?php

namespace App\Enums;

enum InquiryStatus: int
{
    case Processing     = 1;
    case AwaitingReply  = 2;
    case OnHold         = 3;
    case Successful     = 4;
    case Failed         = 5;
    case Passed         = 6;
    case Other          = 7;

    public function getLabel(): string
    {
        return match($this) {
            self::Processing    => '対応中',
            self::AwaitingReply => '返信待ち',
            self::OnHold        => '保留',
            self::Successful    => '成約',
            self::Failed        => '失注',
            self::Passed        => '見送り',
            self::Other         => 'その他',
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
