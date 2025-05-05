<?php
// Order.php (Order Model)
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['customer_name', 'table_number', 'total_amount', 'status'];

    // Relationship to OrderItem
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}

