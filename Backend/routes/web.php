<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuItemController;

Route::get('/', function () {
    return view('welcome');
});
Route::get('menus', [MenuItemController::class, 'index']);
Route::post('menus', [MenuItemController::class, 'store']);
Route::get('menus/{id}', [MenuItemController::class, 'show']);
Route::put('menus/{id}', [MenuItemController::class, 'update']);
Route::delete('menus/{id}', [MenuItemController::class, 'destroy']);
require __DIR__.'/api.php';
