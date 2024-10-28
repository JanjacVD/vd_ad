<?php

use App\Http\Controllers\API\ApiPasswordResetLinkController;
use App\Http\Controllers\API\AuthTokenController;
use App\Http\Controllers\API\RegisterUserController;
use App\Http\Controllers\API\SendEmailVerificationCode;
use App\Http\Controllers\API\SendPhoneVerificationCode;
use App\Http\Controllers\API\User\ResturantController;
use App\Http\Controllers\API\User\TagController;
use App\Http\Controllers\API\VerifyEmailController;
use App\Http\Controllers\API\VerifyPhoneController;
use App\Http\Resources\LoginResponseResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    $user = auth('sanctum')->user();
    $user->load('address');
    return response()->json(new UserResource($user), 200);
})->middleware('auth:sanctum')->description('Get current user');


Route::post('login', [AuthTokenController::class, 'login']);
Route::post('register', [RegisterUserController::class, 'store']);
Route::post('reset-password', [ApiPasswordResetLinkController::class, 'store'])->middleware('throttle:12,1');
Route::post('logout', [AuthTokenController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware(['auth:sanctum', 'throttle:12,1'])->group(function () {

    Route::post('verify-email', VerifyEmailController::class);
    Route::post('verify-email/resend', SendEmailVerificationCode::class);

    Route::post('verify-phone', VerifyPhoneController::class);
    Route::post('verify-phone/resend', SendPhoneVerificationCode::class);

});


Route::middleware(['auth:sanctum'])->group(function () {

    Route::resource('restaurant', ResturantController::class)->only(['index', 'show']);
    Route::resource('tag', TagController::class)->only(['index']);

});

Route::post('logout-all', [AuthTokenController::class, 'logoutAll']);