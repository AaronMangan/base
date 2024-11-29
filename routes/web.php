<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\UserController;
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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/**
 * User Routes
 */
Route::middleware('auth')->group(function () {
    Route::get('/users', [UserController::class, 'index'])->middleware(['role:super|admin|user'])->name('user.index');
    Route::post('/user/{user}/edit', [UserController::class, 'update'])->middleware(['role:super|admin'])->name('user.edit');
    Route::delete('/user/{user}/delete', [UserController::class, 'destroy'])->middleware(['role:super|admin'])->name('user.destroy');
});

/**
 * Config Routes
 */
Route::middleware(['role:super|admin', 'auth'])->group(function () {
    Route::get('/config', [ConfigController::class, 'index'])->middleware(['role:super|admin'])->name('config.index');
    Route::post('/config', [ConfigController::class, 'store'])->middleware(['role:super|admin'])->name('config.store');
});

require __DIR__.'/auth.php';
