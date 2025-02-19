<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\LoginResponseResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
        try {
            $user = request()->user();

            if (!$user) {
                Log::error('User not found during deletion process.');
                return response()->json(['error' => 'User not found'], 404);
            }

            // Delete orders and custom orders
            foreach ($user->orders as $order) {
                if ($order->customOrder) {
                    $order->customOrder->delete();
                }
                $order->delete();
            }

            // Delete addresses
            foreach ($user->address as $address) {
                $address->delete();
            }

            // Remove employment relations
            $user->employments()->detach();

            // Update delivery assignments
            foreach ($user->delivering as $del) {
                $del->update(['delivery_user_id' => null]);
            }
            dd(123);

            // Delete user
            $user->delete();

            Log::info("User {$user->id} deleted successfully.");

            return $this->_OK_204();
        } catch (\Exception $e) {
            Log::error('Error deleting user: ' . $e->getMessage(), [
                'user_id' => $user->id ?? 'N/A',
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['error' => 'An error occurred while deleting the user'], 500);
        }
    }
}
