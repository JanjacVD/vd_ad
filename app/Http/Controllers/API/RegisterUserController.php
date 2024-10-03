<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\RegisterRequest;
use App\Http\Resources\LoginResponseResource;
use App\Models\User;
use App\Notifications\SendVerifyEmailCode;
use Illuminate\Support\Facades\Hash;

class RegisterUserController extends ApiController
{
    public function store(RegisterRequest $request)
    {

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'email_verify_code' => random_int(11111, 99999)
        ]);

        $user->notify(new SendVerifyEmailCode());

        return $this->_OK_201(new LoginResponseResource($user));
    }

}
