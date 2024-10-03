<?php

namespace App;
use App\Notifications\SendVerifySMS;

trait MustVerifyMobile
{
    public function hasVerifiedMobile(): bool
    {
        return !is_null($this->phone_verified_at);
    }

    public function markMobileAsVerified(): bool
    {
        return $this->forceFill([
            'phone_verified_at' => $this->freshTimeStamp()
        ])->save();
    }

    public function sendMobileVerificationNotification(): void
    {
        $this->notify(new SendVerifySMS());
    }
}
