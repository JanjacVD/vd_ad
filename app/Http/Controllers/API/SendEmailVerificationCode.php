<?php

namespace App\Http\Controllers\API;

use App\Notifications\SendVerifyEmailCode;
use Illuminate\Http\Request;

class SendEmailVerificationCode extends ApiController
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(Request $request)
    {
        $data['email_verify_code'] = random_int(11111, 99999);
        $user = auth()->user();
        if ($request->input('email')) {
            $data['email'] = $request->input('email');
        }
        $user->forceFill($data)->save();

        $user->notify(new SendVerifyEmailCode());

        return $this->_OK(['status' => 'sent']);
    }
}
