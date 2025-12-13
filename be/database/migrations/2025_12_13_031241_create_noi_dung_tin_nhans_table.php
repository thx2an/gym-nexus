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
        Schema::create('noi_dung_tin_nhans', function (Blueprint $table) {
            $table->id('msg_id');
            $table->unsignedBigInteger('chat_id');
            $table->unsignedBigInteger('sender_id');
            $table->string('sender_role', 50);
            $table->text('content');
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('chat_id')->references('chat_id')->on('phien_tin_nhans')->onDelete('cascade');
            $table->foreign('sender_id')->references('user_id')->on('nguoi_dungs');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('noi_dung_tin_nhans');
    }
};
