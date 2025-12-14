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
        Schema::create('phien_tin_nhans', function (Blueprint $table) {
            $table->id('chat_id');
            $table->unsignedBigInteger('member_id');
            $table->unsignedBigInteger('support_staff_id');
            $table->string('status', 20); // Check constraint: open, closed, member_left
            $table->dateTime('started_at');
            $table->dateTime('ended_at')->nullable(); // Made nullable for active sessions
            $table->timestamps();

            $table->foreign('member_id')->references('member_id')->on('member_profiles')->onDelete('cascade');
            $table->foreign('support_staff_id')->references('user_id')->on('nguoi_dungs');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phien_tin_nhans');
    }
};
