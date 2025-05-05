<?php
// MenuItem.php (MenuItem Model)
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price'];

    // Optionally, if MenuItem has many OrderItems, define a relationship here
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
