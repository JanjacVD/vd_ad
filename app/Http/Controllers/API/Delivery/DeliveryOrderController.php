<?php

namespace App\Http\Controllers\API\Delivery;

use App\DeliveryStatus;
use App\Http\Controllers\API\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\OrderItem;
use ExpoSDK\Expo;
use ExpoSDK\ExpoMessage;
use Illuminate\Http\Request;

class DeliveryOrderController extends ApiController
{

    private function getGroupedOrders($orders)
    {
        return $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'status' => $order->status,
                'delivery_fee' => $order->delivery_fee,
                'user' => [
                    'name' => $order->user->name,
                    'phone' => $order->user->phone,
                    'loyalty' => $order->user->isLoyalty
                ],
                'address' => [
                    "place_id" => $order->address->place_id,
                    "formatted_address" => $order->address->formatted_address,
                    "lat" => $order->address->lat,
                    "lng" => $order->address->lng,
                ],
                'customOrder' => $order->customOrder,
                'items' => $order->orderItems->map(function ($orderItem) {
                    return [
                        'id' => $orderItem->id,
                        'count' => $orderItem->count,
                        'price' => $orderItem->item->price / 100,
                        'note' => $orderItem->note,
                        'name' => json_decode($orderItem->item->name),
                        'restaurant' => [
                            'id' => $orderItem->item->category->restaurant->id ?? null,
                            'name' => $orderItem->item->category->restaurant->name ?? null,
                            'contact' => $orderItem->item->category->restaurant->contact ?? null,
                        ],
                    ];
                }),
            ];
        });
    }
    public function getPendingOrders()
    {
        $orders = Order::with(['orderItems.item.category.restaurant', 'deliveryUser', 'user', 'address'])->where('status', DeliveryStatus::PENDING->value)->get();
        return $this->_OK(['orders' => $this->getGroupedOrders($orders)]);
    }

    public function getDeliveryUserOrder(Request $request)
    {
        $user = auth()->user();
        $orders = $user->delivering()->whereNotIn('status', [
            DeliveryStatus::CANCELLED->value,
            DeliveryStatus::PENDING->value,
            DeliveryStatus::COMPLETED->value,
        ])->get();
        return $this->_OK(['orders' => $this->getGroupedOrders($orders)]);
    }

    private function getOrderMessageBody($status)
    {
        switch ($status) {
            case DeliveryStatus::PROCESSING->value:
                return "Your order has been accepted";
            case DeliveryStatus::DELIVERING->value:
                return "Your order has been picked up and our courier is delivering it.";
            case DeliveryStatus::COMPLETED->value:
                return 'Your order has been delivered.';
            case DeliveryStatus::CANCELLED->value:
                return "Your order has been cancelled";
            default:
                return null;
        }
    }
    private function handleOrderStatusUpdate($order)
    {
        $status = $order->status;
        $body = $this->getOrderMessageBody($status);
        if ($body) {
            $message = (new ExpoMessage([
                'title' => 'Order update',
                'body' => $body,
            ]))->setData(['id' => $order->id])
                ->setChannelId('default')
                ->setBadge(1)
                ->playSound();
            $tokens = $order->user->expoTokens()->pluck('token')->toArray();
            (new Expo)->send($message)->to($tokens)->push();
        }
    }

    public function updateOrderStatus(Request $request)
    {
        $id = $request->input('id');
        $status = $request->input('status');
        $data = ['status' => $status];

        // If status is 'PROCESSING', include the delivery user ID
        if ($status === DeliveryStatus::PROCESSING->value) {
            $data['delivery_user_id'] = auth()->user()->id;
        }

        // Find the order and update it
        $order = Order::findOrFail($id);
        $order->update($data);

        // Handle additional status update logic
        $this->handleOrderStatusUpdate($order);

        // Return a successful response
        return $this->_OK();
    }

}
