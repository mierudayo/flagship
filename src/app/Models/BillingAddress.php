<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillingAddress extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'name_kana',
        'shortcut',
        'billing_contact_name',
        'postal_code',
        'address',
        'email',
        'tel',
        'fax',
        'invoice_delivery_method',
        'note',
    ];

    public function scopeSearchByKeyword(Builder $query, ?string $keyword): Builder
    {
        if (!$keyword) {
            return $query;
        }

        return $query->where(function ($query) use ($keyword) {
            $query->where('name', 'like', "%$keyword%")
                ->orWhere('name_kana', 'like', "%$keyword%")
                ->orWhere('shortcut', 'like', "%$keyword%");
        });
    }
}
