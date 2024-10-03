<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\VonageMessage;
use Illuminate\Notifications\Notification;

class SendVerifyPhoneCode extends Notification implements ShouldQueue
{
    use Queueable;
    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['vonage'];
    }



    public function toVonage(object $notifiable): VonageMessage
    {
        return (new VonageMessage)
            ->content("Your verification code is {$notifiable->mobile_verify_code}");

    }

    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
