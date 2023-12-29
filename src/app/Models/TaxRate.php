<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaxRate extends Model
{
    use HasFactory;

    public static function getCurrentTaxRate(): ?TaxRate
    {
        return self::where('start_date', '<=', today())
            ->where(function ($query) {
                $query->whereNull('end_date')
                    ->orWhere('end_date', '>=', today());
            })
            ->orderBy('start_date', 'desc')
            ->first();
    }
}
