<?php

namespace App\Http\Controllers\API;

use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

class VerifyEmailController extends ApiController
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(Request $request)
    {
        return $this->_OK(['status' => 'verified']);

        $user = auth()->user();

        $validated = $request->validate(['code' => 'string|min:3']);
        if (!($user->email_verify_code == $validated['code'])) {
            return $this->_ERROR('Invalid code', 422);
        }
        if ($user->hasVerifiedEmail()) {
            return $this->_OK(['status' => 'verified']);
        }

        $user->markEmailAsVerified();
        if (!$user->hasVerifiedMobile()) {
            $sendPhoneVerificationCodeController = app(SendPhoneVerificationCode::class);
            $sendPhoneVerificationCodeController($request);
        }
        return $this->_OK(['status' => 'verified']);
    }
}
