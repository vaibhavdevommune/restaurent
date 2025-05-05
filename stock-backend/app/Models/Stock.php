<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    // Define the table if it's not the plural of the model name (optional)
    protected $table = 'stocks'; 

    // Define the fillable attributes (columns you can insert data into)
    protected $fillable = [
        'product_name',
        'quantity',
        'price',
    ];

    // Optionally, you can define any dates you need to be treated as Carbon instances (e.g. timestamps)
    protected $dates = [
        'created_at',
        'updated_at',
    ];
}
