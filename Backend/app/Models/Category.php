<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'categories';

    // Define the fillable attributes
    protected $fillable = [
        'name',
    ];
}
