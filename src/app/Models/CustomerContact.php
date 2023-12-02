<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CustomerContact extends Model
{
    use HasFactory;

    protected $appends = [
        'is_active_label'
    ];

    protected $fillable = [
        'customer_id',
        'name',
        'name_kana',
        'tel',
        'mobile_number',
        'email',
        'position',
        'role',
        'is_active',
        'note',
        'in_charge_user_id',
        'created_by_id',
        'updated_by_id',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime:Y-m-d H:i',
        'updated_at' => 'datetime:Y-m-d H:i',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function inChargeUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'in_charge_user_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by_id');
    }

    public function inquiries(): HasMany
    {
        return $this->hasMany(Inquiry::class);
    }

    public function salesActivities(): HasMany
    {
        return $this->hasMany(SalesActivity::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */
    protected function getIsActiveLabelAttribute(): string
    {
        return $this->is_active ? '使用中' : '使用不可';
    }

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */
    public function scopeSearchByKeyword(Builder $query, ?string $keyword): Builder
    {
        if (!$keyword) {
            return $query;
        }

        return $query->where(function ($q) use ($keyword) {
            $q->where('name', 'like', "%$keyword%")
                ->orWhere('name_kana', 'like', "%$keyword%")
                ->orWhereHas('customer', function (Builder $subQuery) use ($keyword) {
                    $subQuery->where('name', 'like', "%$keyword%")
                        ->orWhere('name_kana', 'like', "%$keyword%");
                });
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Custom Methods
    |--------------------------------------------------------------------------
    */
    public function canDelete(): bool
    {
        if ($this->inquiries()->exists()) {
            return false;
        }

        if ($this->salesActivities()->exists()) {
            return false;
        }

        return true;
    }
}
