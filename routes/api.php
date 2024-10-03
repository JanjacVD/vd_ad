<?php

use App\Http\Controllers\API\ApiPasswordResetLinkController;
use App\Http\Controllers\API\AuthTokenController;
use App\Http\Controllers\API\RegisterUserController;
use App\Http\Controllers\API\SendEmailVerificationCode;
use App\Http\Controllers\API\SendPhoneVerificationCode;
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
Route::post('reset-password', [ApiPasswordResetLinkController::class, 'store']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [AuthTokenController::class, 'logout']);

    Route::post('verify-email', VerifyEmailController::class);
    Route::post('verify-email/resend', SendEmailVerificationCode::class);

    Route::post('verify-phone', VerifyPhoneController::class);
    Route::post('verify-phone/resend', SendPhoneVerificationCode::class);

});
Route::post('logout-all', [AuthTokenController::class, 'logoutAll']);