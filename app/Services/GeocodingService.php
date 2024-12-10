<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;


class GeocodingService
{
    /**
     * Create a new class instance.
     */
    protected array $supportedCities;

    public function __construct(array $supportedCities = ['Vodice', 'Srima', 'Tribunj'])
    {
        $this->supportedCities = $supportedCities;
    }

    public function geocode($addressLookupString)
    {
        try {
            $googleMapsApiKey = env('MAPS_API_KEY');
            $response = Http::get('https://maps.googleapis.com/maps/api/geocode/json', [
                'key' => $googleMapsApiKey,
                'region' => 'HR',
                'address' => $addressLookupString,
                'components' => 'postal_code:22211',
            ]);

            if ($response->failed()) {
                throw new \Exception("Failed to fetch address data.");
            }

            $results = $response->json('results', []);

            // Filter results with supported cities and street numbers
            $filteredResults = collect($results)->filter(function ($result) {
                $hasStreetNumber = collect($result['address_components'] ?? [])->contains(function ($component) {
                    return in_array('street_number', $component['types'] ?? []);
                });

                $isInSupportedCities = collect($result['address_components'] ?? [])->contains(function ($component) {
                    return in_array('locality', $component['types'] ?? []) &&
                        in_array($component['long_name'] ?? $component['short_name'], $this->supportedCities);
                });

                return $hasStreetNumber && $isInSupportedCities;
            });

            // Map results to desired format
            $listToSet = $filteredResults->map(function ($result) {
                $houseNum = collect($result['address_components'] ?? [])->first(function ($component) {
                    return in_array('street_number', $component['types'] ?? []);
                });

                $addressResult = collect($result['address_components'] ?? [])->first(function ($component) {
                    return in_array('route', $component['types'] ?? []);
                });

                return [
                    'formatted_address' => trim(($addressResult['long_name'] ?? '') . ' ' . ($houseNum['long_name'] ?? '')),
                    'lat' => $result['geometry']['location']['lat'] ?? null,
                    'lng' => $result['geometry']['location']['lng'] ?? null,
                    'place_id' => $result['place_id'] ?? null,
                ];
            });

            return $listToSet->all();
        } catch (\Exception $e) {
            Log::error('Error while fetching address details: ' . $e->getMessage());
            return [
                'message' => 'Error while getting the address',
            ];
        }
    }

    public function reverseGeocode($lat, $lng)
    {
        try {
            $googleMapsApiKey = env('MAPS_API_KEY');

            // Make the reverse geocode request
            $response = Http::get('https://maps.googleapis.com/maps/api/geocode/json', [
                'key' => $googleMapsApiKey,
                'latlng' => "$lat,$lng",
            ]);

            if ($response->failed() || empty($response->json('results'))) {
                return ['error' => 'No results found for the given coordinates.'];
            }

            $result = $response->json('results')[0];
            $addressComponents = $result['address_components'] ?? [];

            // Check if the location is in a supported city
            $cityComponent = collect($addressComponents)->first(function ($component) {
                return in_array('locality', $component['types'] ?? []);
            });

            $cityName = $cityComponent['long_name'] ?? $cityComponent['short_name'] ?? null;

            if (!in_array($cityName, $this->supportedCities)) {
                return ['error' => 'This is outside of the allowed area.'];
            }

            // Get the street number and route
            $houseNum = collect($addressComponents)->first(function ($component) {
                return in_array('street_number', $component['types'] ?? []);
            });

            $address = collect($addressComponents)->first(function ($component) {
                return in_array('route', $component['types'] ?? []);
            });

            // Format and return the address
            return [
                [
                    'formatted_address' => trim(($address['long_name'] ?? '') . ' ' . ($houseNum['long_name'] ?? '')),
                    'lat' => $lat,
                    'lng' => $lng,
                    'place_id' => $result['place_id'] ?? null,
                ]
            ];
        } catch (\Exception $e) {
            Log::error('Error during reverse geocoding: ' . $e->getMessage());
            return ['error' => 'An error occurred while fetching the address.'];
        }
    }
}