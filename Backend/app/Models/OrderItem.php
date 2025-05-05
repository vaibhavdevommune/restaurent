<?php
// OrderItem.php (OrderItem Model)
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = ['order_id', 'menu_item_id', 'quantity', 'price'];

    // Relationship to MenuItem
    public function menuItem()
    {
        return $this->belongsTo(MenuItem::class);
    }
}
