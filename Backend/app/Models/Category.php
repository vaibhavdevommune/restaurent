<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    // If you want to define relationship with MenuItem (later step)
    public function menuItems()
    {
        return $this->hasMany(MenuItem::class);
    }
}
