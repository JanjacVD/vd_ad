<?php

namespace App;


enum DeliveryStatus: string
{
    case PENDING = 'pending';
    case PROCESSING = 'processing';
    case DELIVERING = 'delivering';
    case COMPLETED = 'completed';
    case CANCELLED = 'cancelled';
}
