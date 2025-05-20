<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MenuCategoryController;
use App\Http\Controllers\MenuController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Redirect root to dashboard
Route::get('/', function () {
    return view('auth.login');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::get('menu-categories', [MenuCategoryController::class, 'index'])->name('menu-categories.index');
Route::get('menu-categories/getData', [MenuCategoryController::class, 'getData'])->name('menu-categories.getData');
Route::get('menu-categories/generateSlug', [MenuCategoryController::class, 'generateSlug'])->name('menu-categories.generateSlug');
Route::post('menu-categories', [MenuCategoryController::class, 'store'])->name('menu-categories.store');
Route::put('menu-categories/{menuCategory}', [MenuCategoryController::class, 'update'])->name('menu-categories.update');
Route::delete('menu-categories/{menuCategory}', [MenuCategoryController::class, 'destroy'])->name('menu-categories.destroy');

Route::resource('menus', MenuController::class)->except(['show']);
Route::get('menus/generate-code', [MenuController::class, 'generateCode'])->name('menus.generateCode');

Auth::routes(['register' => false, 'verify' => false, 'reset' => false]);