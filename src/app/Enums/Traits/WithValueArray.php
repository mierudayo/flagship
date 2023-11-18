<?php

namespace App\Enums\Traits;

trait WithValueArray
{
    public static function toArray(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn($case) => [$case->value => $case->getLabel()])
            ->all();
    }
}
