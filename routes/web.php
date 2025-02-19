<?php

use App\Http\Controllers\Admin\AdminRestaurantController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\RestaurantEmployeeController;
use App\Http\Controllers\TagController;
use App\Models\Restaurant;
use App\Services\GeocodingService;
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

Route::get('support', function () {
    return Inertia::render('Support');
});


Route::get('/privacy-policy', function () {
    return Inertia::render('Privacy');
});

Route::get('/email-verified', function () {
    return Inertia::render('EmailVerified');
})->name('email.verified');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('invite', [RestaurantEmployeeController::class, 'acceptInvite'])->name('employees.acceptInvite');


    Route::resource('my-restaurants/{restaurant}/employees', RestaurantEmployeeController::class)->only(['index', 'destroy', 'update']);

    Route::resource('my-restaurants', RestaurantController::class)->except(['update']);
    Route::resource('my-restaurants/{restaurant}/categories', CategoryController::class)->except(['update']);

    Route::post('my-restaurants/{restaurant}', [RestaurantController::class, 'update'])->name('my-restaurants.update');
    Route::post('my-restaurants/update/{restaurant}', [RestaurantController::class, 'quickUpdate'])->name('my-restaurants.quickUpdate');

    Route::post('my-restaurants/{restaurant}/employees', [RestaurantEmployeeController::class, 'sendInvite'])->name('employees.sendInvite');

    Route::post('my-restaurants/{restaurant}/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');

    Route::resource('{category}/items', ItemController::class)->except(['update', 'destroy']);
    Route::post('items/{item}', [ItemController::class, 'update'])->name('items.update');
    Route::delete('items/{item}/delete', [ItemController::class, 'destroy'])->name('items.destroy');

});

Route::middleware(['auth', 'superadmin'])->group(function () {
    Route::post('tags/{tag}', [TagController::class, 'update'])->name('tags.update');
    Route::resource('tags', TagController::class)->except(['update']);
    Route::resource('restaurants', AdminRestaurantController::class);
    Route::resource('users', UserController::class);

});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__ . '/auth.php';
