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
        Schema::create('tin_nhan_tickets', function (Blueprint $table) {
            $table->id('msg_id');
            $table->unsignedBigInteger('ticket_id');
            $table->unsignedBigInteger('sender_id');
            $table->string('sender_role', 50)->nullable();
            $table->text('content');
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('ticket_id')->references('ticket_id')->on('ticket_nhan_viens')->onDelete('cascade');
            $table->foreign('sender_id')->references('user_id')->on('nguoi_dungs');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tin_nhan_tickets');
    }
};
