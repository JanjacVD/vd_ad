<?php

namespace App\Http\Controllers\API\User;

use App\DeliveryStatus;
use App\Http\Controllers\API\ApiController;
use App\Http\Requests\CreateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Address;
use App\Models\Item;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use ExpoSDK\Expo;
use ExpoSDK\ExpoMessage;
use Request;

class OrderController extends ApiController
{
    public function store(CreateOrderRequest $request)
    {
        $validated = $request->validated();
        $itemsInput = $validated['items'] ?? [];
        $itemIds = collect($itemsInput)->pluck('itemId');
        $items = Item::whereIn('id', $itemIds)->get();
        $restaurants = $items->map(function ($item) {
            return $item->category->restaurant;
        })->unique(); // Extract unique restaurants

        foreach ($restaurants as $restaurant) {
            $isActive = $restaurant->canOrder();
            if (!$isActive) {
                return $this->_ERROR(['reason' => "OUT_OF_WORKTIME", 'id' => $restaurant->id], 406);
            }
        }
        foreach ($items as $item) {
            if (!$item->category->isActive || !$item->isActive) {
                return $this->_ERROR(['reason' => "UNAVAILABLE_ITEM", 'id' => $item->id], 406);
            }
        }

        $totalDeliveryFee = 0;

        $restaurants->each(function ($restaurant) use (&$totalDeliveryFee) {
            if (!$restaurant->delivery_fee) {
                // If delivery fee is true and the current fee is 0, increment it by 5
                if ($totalDeliveryFee == 0) {
                    $totalDeliveryFee += 5;
                }
                // If delivery fee is true and the current fee is greater than 0, increment it by 2.5
                else {
                    $totalDeliveryFee += 2.5;
                }
            }
        });

        $address = Address::where('place_id', $validated['address']['place_id'])->first();
        if (!$address) {
            $address = Address::create([...$validated['address'], 'user_id' => auth()->user()->id]);
        }
        $userId = auth()->user()->id;
        if (count($itemsInput) === 0 && !isset($validated['customOrder'])) {
            $this->_ERROR('', 400);
        }
        $order = Order::create([
            'status' => DeliveryStatus::PENDING->value,
            'delivery_user_id' => null,
            'user_id' => $userId,
            'address_id' => $address->id,
            'rejection_message' => null,
            'delivery_fee' => $totalDeliveryFee,

        ]);
        if (isset($validated['customOrder'])) {
            $order->customOrder()->create($validated['customOrder']);
        } else {

            foreach ($itemsInput as $item) {
                OrderItem::create([
                    'count' => $item['count'],
                    'item_id' => $item['itemId'],
                    'note' => $item['note'],
                    'order_id' => $order->id
                ]);
            }
        }
        $this->alertDelivery($order);
        return $this->_OK_201(new OrderResource($order));
    }

    private function alertDelivery($order)
    {
        $deliveryTokens = User::where('isDelivery', true)
            ->with('expoTokens') // Eager load expoTokens relationship
            ->get()
            ->flatMap(function ($user) {
                return $user->expoTokens->pluck('token'); // Collect the tokens from each user
            })
            ->toArray();
        $message = (new ExpoMessage([
            'title' => 'Nova narudžba',
        ]))->setData(['id' => $order->id])
            ->setChannelId('default')
            ->setBadge(1)
            ->playSound();
        (new Expo)->send($message)->to($deliveryTokens)->push();

    }

    public function getActiveOrders(Request $request)
    {
        $user = auth()->user();
        $userOrders = $user->orders()->whereNotIn('status', [
            DeliveryStatus::CANCELLED->value,
            DeliveryStatus::COMPLETED->value,
        ])->get();
        return $this->_OK(OrderResource::collection($userOrders));
    }
}
