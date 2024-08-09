<?php

namespace App\Notifications;

use App\Models\Restaurant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InviteToRestaurant extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    private $data;
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $restaurant = Restaurant::findOrFail($this->data->restaurant_id);
        return (new MailMessage)
            ->line('You have been invited to join ' . $restaurant->name)
            ->action('Join now', url(route('employees.acceptInvite', ['hash' => $this->data->hash])))
            ->line('If you do not wish to accept. Please ignore this message!')
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
