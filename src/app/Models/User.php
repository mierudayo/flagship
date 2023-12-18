<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'permission_id',
        'name',
        'name_kana',
        'email',
        'password',
        'employee_code',
        'mobile_number',
        'employment_date',
        'resignation_date',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * モデル配列、JSON形式に含めるプロパティを定義
     *
     * @var array
     */
    protected $visible = [
        'id',
        'permission_id',
        'name',
        'name_kana',
        'email',
        'mobile_number',
        'employee_code',
        'employment_date',
        'resignation_date',
        'permission',
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'created_at' => 'datetime:Y-m-d H:i',
        'updated_at' => 'datetime:Y-m-d H:i',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */
    public function permission(): BelongsTo
    {
        return $this->belongsTo(Permission::class);
    }

    public function customers(): HasMany
    {
        return $this->hasMany(Customer::class, 'in_charge_user_id');
    }

    public function inquiries() : HasMany
    {
        return $this->hasMany(Inquiry::class, 'in_charge_user_id');
    }

    public function salesOrders(): HasMany
    {
        return $this->hasMany(SalesOrder::class, 'sales_in_charge_id');
    }

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */
    /** 在職中ユーザー */
    public function scopeActive(Builder $query): Builder
    {
        return $query->whereNull('resignation_date');
    }

    public function scopeHasCustomers(Builder $query): Builder
    {
        return $query->whereHas('customers');
    }

    public function scopeHasInquiries(Builder $query): Builder
    {
        return $query->whereHas('inquiries');
    }

    public function scopeHasSalesOrders(Builder $query): Builder
    {
        return $query->whereHas('salesOrders');
    }

    public function scopeSearchByKeyword(Builder $query, ?string $keyword): Builder
    {
        if (!$keyword) {
            return $query;
        }

        return $query->where(function ($query) use ($keyword) {
            $query->where('name', 'like', "%$keyword%")
                ->orWhere('name_kana', 'like', "%$keyword%");
        });
    }

    public function scopeSearchById(Builder $query, ?string $id): Builder
    {
        if (!$id) {
            return $query;
        }

        return $query->where('id', $id);
    }

    public function scopeSearchByEmployeeCode(Builder $query, ?string $employeeCode): Builder
    {
        if (!$employeeCode) {
            return $query;
        }

        return $query->where('employee_code', $employeeCode);
    }

    public function scopeSearchByEmail(Builder $query, ?string $email): Builder
    {
        if (!$email) {
            return $query;
        }

        return $query->where('email', 'like', "%$email%");
    }

}
