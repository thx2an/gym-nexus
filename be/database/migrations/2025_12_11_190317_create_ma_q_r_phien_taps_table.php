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
        Schema::create('ma_q_r_phien_taps', function (Blueprint $table) {
            $table->bigIncrements('qr_id'); // qr_id Bigint PK
            $table->unsignedBigInteger('session_id'); // session_id Bigint FK
            $table->string('token', 255)->unique(); // token Nvarchar(255) Unique
            $table->dateTime('generated_at'); // generated_at Datetime
            $table->dateTime('expires_at'); // expires_at Datetime
            $table->boolean('is_used')->default(false); // is_used bit Default 0
            $table->timestamps();

            // FK to buoi_taps
            // No Cascade or Cascade? Spec doesn't say. 
            // Usually if session is deleted, QR should be deleted? Let's use Cascade for QR codes as they are ephemeral.
            $table->foreign('session_id')->references('session_id')->on('buoi_taps')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ma_q_r_phien_taps');
    }
};
