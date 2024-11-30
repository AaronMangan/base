<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// Public routes
Route::post('/auth/token', [AuthController::class, 'generateToken']);

Route::middleware(['auth:sanctum'])->group(function () {
    // Protected User API routes
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);

    Route::get('statuses', function (Request $request) {
        $query = \App\Models\Status::query();
        $query->where('organisation_id', function ($sub) {
            return $sub->where('organisation_id', null)
                ->orWhere('organisation_id', auth()->user()->organisation_id);
        });
        // return response()->json($query->whereIn('organisation_id', [auth()->user()->organisation_id, null])->get()->toArray());
        return response()->json([
            'status' => 'success',
            'data' => \App\Models\Status::all()
        ], 200);
    });
});
