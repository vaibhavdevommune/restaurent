<?php 
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StockController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TableController;

Route::get('/stocks', [StockController::class, 'index']);
Route::post('/stocks', [StockController::class, 'store']);
Route::get('/stocks/{id}', [StockController::class, 'show']);
Route::put('/stocks/{id}', [StockController::class, 'update']);
Route::delete('/stocks/{id}', [StockController::class, 'destroy']);

Route::get('/menu-items', [MenuItemController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/tables', [TableController::class, 'index']);

Route::get('orders', [OrderController::class, 'index']);
Route::post('orders', [OrderController::class, 'store']);
Route::get('orders/{id}', [OrderController::class, 'show']);
Route::put('orders/{id}', [OrderController::class, 'update']);
Route::delete('orders/{id}', [OrderController::class, 'destroy']);

