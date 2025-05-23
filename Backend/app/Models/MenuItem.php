<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price', 'description' , 'category'];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
