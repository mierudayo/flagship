<?php

namespace App\Models;

use App\Enums\ProductType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $appends = ['product_type_label'];

    protected $fillable = [
        'category_id',
        'product_number',
        'product_type',
        'name',
        'description',
        'sales_price',
        'purchase_price',
        'display_order',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }

    public function inquiries() : HasMany
    {
        return $this->hasMany(Inquiry::class);
    }

    public function scopeHasInquiries(Builder $query): Builder
    {
        return $query->whereHas('inquiries');
    }

    protected function getProductTypeLabelAttribute(): string
    {
        return ProductType::getLabelFromValue($this->product_type);
    }

    public function scopeSearchByKeyword(Builder $query, ?string $keyword): Builder
    {
        if (!$keyword) {
            return $query;
        }

        return $query->where(function ($query) use ($keyword) {
            $query->where('name', 'like', "%$keyword%");
        });
    }

    public function scopeSearchByProductNumber(Builder $query, ?string $productNumber): Builder
    {
        if (!$productNumber) {
            return $query;
        }

        return $query->where('product_number', 'like', "%$productNumber%");
    }

    public function scopeSearchByCategory(Builder $query, ?string $categoryId): Builder
    {
        if (!$categoryId) {
            return $query;
        }

        return $query->where('category_id', $categoryId);
    }
}
