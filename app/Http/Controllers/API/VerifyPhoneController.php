<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;

class VerifyPhoneController extends ApiController
{
    public function __invoke(Request $request)
    {
        $user = auth()->user();
        $validated = $request->validate(['code' => 'string|min:3']);
        if (!($user->mobile_verify_code == $validated['code'])) {
            return $this->_ERROR('Invalid code', 422);
        }
        if ($user->hasVerifiedMobile()) {
            return $this->_OK(['status' => 'verified']);
        }

        $user->markMobileAsVerified();

        return $this->_OK(['status' => 'verified']);
    }
}
