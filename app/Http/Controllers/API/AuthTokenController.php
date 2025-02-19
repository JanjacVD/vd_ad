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
        $adds = $user->address;
        foreach ($orders as $order) {
            $customs = $order->customOrder;
            if ($customs) {
                $customs->delete();

            }
            $order->delete();
        }
        foreach ($adds as $address) {
            $address->delete();
        }
        foreach ($adds as $address) {
            $address->delete();
        }
        $user->employments()->detach(); // Remove all relations
        $user->delete();
        $deliveries = $user->delivering;
        foreach ($deliveries as $del) {
            $del->update(['delivery_user_id' => null]);
        }
        return $this->_OK_204();

    }
}
