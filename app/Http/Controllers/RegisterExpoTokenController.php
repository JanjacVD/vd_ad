<?php

namespace App\Http\Controllers;

use App\Http\Controllers\API\ApiController;
use Illuminate\Http\Request;

class RegisterExpoTokenController extends ApiController
{
    public function store(Request $request)
    {
        $request->validate([
            'expoToken' => 'required|string',
        ]);

        $user = auth()->user();

        $expoToken = $request->input('expoToken');

        // Use firstOrCreate to find or create the token
        $user->expoTokens()->firstOrCreate(
            ['token' => $expoToken], // Attributes to search by
            ['token' => $expoToken] // Attributes to set if not found
        );

        return $this->_OK();
    }
}