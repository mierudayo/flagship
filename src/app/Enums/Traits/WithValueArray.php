<?php

namespace App\Enums\Traits;

trait WithValueArray
{
    public static function toArray(): array
    {
        return collect(self::cases())
            ->map(fn($case) => ['value' => $case->value, 'label' => $case->getLabel()])
            ->all();
    }
}
