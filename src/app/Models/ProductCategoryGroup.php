<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductCategoryGroup extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'display_order'];

    public function categories(): HasMany
    {
        return $this->hasMany(ProductCategory::class, 'group_id');
    }

    public function scopeOrderByDisplayOrder(Builder $query): Builder
    {
        return $query->orderByRaw('ISNULL(`display_order`), `display_order` ASC');
    }
}
