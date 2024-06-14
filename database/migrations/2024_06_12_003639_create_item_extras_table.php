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
        Schema::create('item_extras', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('item_id');
            $table->unsignedBigInteger('extra_id');

            $table->foreign('item_id')->references('id')->on('items')->onDelete('cascade');
            $table->foreign('extra_id')->references('id')->on('extras')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_extras');
    }
};
