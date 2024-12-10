<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('status');
            $table->foreignId('delivery_user_id')->nullable()->references('id')->on('users');
            $table->foreignId('user_id')->references('id')->on('users');
            $table->foreignId('address_id')->references('id')->on('addresses');
            $table->string('rejection_message')->nullable();
            $table->double('delivery_fee')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
