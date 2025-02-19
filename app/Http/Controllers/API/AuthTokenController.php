<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\LoginResponseResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthTokenController extends ApiController
{
    /**
     * @resource \App\Http\Resources\LoginResponseResource
     */
    public function login(LoginRequest $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $user->load('address');
            $response = new LoginResponseResource($user);

            return $this->_OK($response);
        } else {
            return $this->_ERROR('Invalid data.', 400);
        }
    }


    public function logout(Request $request)
    {

        auth()->user()->currentAccessToken()->delete();
        return $this->_OK_204();
    }

    public function logoutAll(Request $request)
    {
        $request->user()->tokens()->delete();
        return $this->_OK_204();

    }

    public function delete(Request $request)
    {
        $user = request()->user();
        $orders = $user->orders;
        foreach ($orders as $order) {
            $order->delete();
        }
        return $this->_OK_204();

    }
}
