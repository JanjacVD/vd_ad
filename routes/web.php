<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RestaurantController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::resource('my-restaurants', RestaurantController::class)->except(['update']);
    Route::resource('my-restaurants/{restaurant}/categories', CategoryController::class)->except(['update']);

    Route::post('my-restaurants/{restaurant}', [RestaurantController::class, 'update'])->name('my-restaurants.update');
    Route::post('my-restaurants/{restaurant}/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');

    Route::resource('{category}/items', ItemController::class)->except(['update']);
    // Route::post('{category}/items', [ItemsController::class . 'update'])->name('items.update');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require_once __DIR__ . '/auth.php';
