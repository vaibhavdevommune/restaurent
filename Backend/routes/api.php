<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StockController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\CustomerController;

Route::get('/stocks', [StockController::class, 'index']);
Route::post('/stocks', [StockController::class, 'store']);
Route::get('/stocks/{id}', [StockController::class, 'show']);
Route::put('/stocks/{id}', [StockController::class, 'update']);
Route::delete('/stocks/{id}', [StockController::class, 'destroy']);

Route::get('categories', [CategoryController::class, 'index']);       
Route::post('categories', [CategoryController::class, 'store']);       
Route::get('categories/{id}', [CategoryController::class, 'show']);    
Route::put('categories/{id}', [CategoryController::class, 'update']);  
Route::delete('categories/{id}', [CategoryController::class, 'destroy']);

Route::get('/tables', [TableController::class, 'index']);

Route::get('orders', [OrderController::class, 'index']);
Route::post('orders', [OrderController::class, 'store']);
Route::get('orders/{id}', [OrderController::class, 'show']);
Route::put('orders/{id}', [OrderController::class, 'update']);
Route::delete('orders/{id}', [OrderController::class, 'destroy']);

Route::get('menus', [MenuItemController::class, 'index']);
Route::post('menus', [MenuItemController::class, 'store']);
Route::get('menus/{id}', [MenuItemController::class, 'show']);
Route::put('menus/{id}', [MenuItemController::class, 'update']);
Route::delete('menus/{id}', [MenuItemController::class, 'destroy']);

Route::get('customers', [MenuItemController::class, 'index']);
Route::post('customers', [MenuItemController::class, 'store']);
Route::get('customers/{id}', [MenuItemController::class, 'show']);
Route::put('customers/{id}', [MenuItemController::class, 'update']);
Route::delete('customers/{id}', [MenuItemController::class, 'destroy']);
