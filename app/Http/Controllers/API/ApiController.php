<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

class ApiController extends Controller
{
    public function _OK($result = null, $code = 200)
    {
        return response()->json($result, status: $code);
    }

    public function _OK_201($result)
    {
        return $this->_OK($result, 201);
    }

    public function _OK_204($result = null)
    {
        return $this->_OK($result, code: 204);
    }

    public function _ERROR($errorMessage, $code = 404)
    {

        $response = [
            'success' => false,
            'message' => $errorMessage,
        ];

        return response()->json($response, $code);

    }
}
