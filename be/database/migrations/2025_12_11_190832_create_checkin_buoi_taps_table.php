<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('checkin_buoi_taps', function (Blueprint $table) {
            $table->bigIncrements('checkin_id'); // checkin_id Bigint PK
            $table->unsignedBigInteger('session_id'); // session_id Bigint FK
            $table->unsignedBigInteger('member_id'); // member_id Bigint FK
            $table->dateTime('scanned_at'); // scanned_at Datetime
            $table->boolean('is_valid')->nullable(); // is_valid bit True
            $table->timestamps();

            // FKs
            // Prevent multiple cascade paths
            $table->foreign('session_id')->references('session_id')->on('buoi_taps')->onDelete('cascade');
            $table->foreign('member_id')->references('user_id')->on('nguoi_dungs'); // No cascade here to avoid cycle
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('checkin_buoi_taps');
    }
};
