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
        Schema::create('ticket_nhan_viens', function (Blueprint $table) {
            $table->id('ticket_id');
            $table->unsignedBigInteger('member_id');
            $table->string('subject', 255)->nullable();
            $table->string('category', 100)->nullable();
            $table->string('status', 20); // Check constraint: open, in_progress, waiting, resolved, closed
            $table->string('priority', 20)->nullable(); // Check constraint: low, medium, high
            $table->unsignedBigInteger('assigned_to');
            $table->timestamps();

            $table->foreign('member_id')->references('member_id')->on('member_profiles')->onDelete('cascade');
            $table->foreign('assigned_to')->references('user_id')->on('nguoi_dungs');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_nhan_viens');
    }
};
