<?php

namespace App;

interface IMustVerifyMobile
{
    public function hasVerifiedMobile(): bool;
    public function markMobileAsVerified(): bool;
    public function sendMobileVerificationNotification(): void;

}
