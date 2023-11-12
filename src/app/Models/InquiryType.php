<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InquiryType extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'custom_label'];

    public function inquiries(): HasMany
    {
        return $this->hasMany(Inquiry::class);
    }
}
