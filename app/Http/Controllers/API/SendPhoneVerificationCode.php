<?php

namespace App\Http\Controllers\API;

use App\Notifications\SendVerifyPhoneCode;
use Illuminate\Http\Request;

class SendPhoneVerificationCode extends ApiController
{
    public function __invoke(Request $request)
    {
        $data['mobile_verify_code'] = random_int(11111, 99999);
        $user = auth()->user();
        if ($request->input('phone') && $user->phone !== $request->input('phone')) {
            $data['phone'] = $request->input('phone');
        }
        $user->forceFill($data)->save();

        $user->notify(new SendVerifyPhoneCode());

        return $this->_OK(['status' => 'sent', $data]);
    }
}

