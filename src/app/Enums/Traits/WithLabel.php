<?php

namespace App\Enums\Traits;

trait WithLabel
{
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

    abstract public function getLabel(): string;
}
