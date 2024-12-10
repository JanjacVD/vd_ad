<?php

namespace App\Http\Controllers;

use App\Services\GeocodingService;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function lookup(Request $request)
    {
        $validated = $request->validate([
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'address' => 'nullable|string|max:255',
        ]);

        $service = new GeocodingService();

        if (isset($validated['address'])) {
            return $service->geocode($validated['address']);
        } else {
            return $service->reverseGeocode($validated['latitude'], $validated['longitude']);
        }
    }
}
