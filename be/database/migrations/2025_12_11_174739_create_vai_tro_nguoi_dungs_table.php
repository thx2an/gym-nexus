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
        Schema::create('vai_tro_nguoi_dungs', function (Blueprint $table) {
            $table->id(); // Optional, but useful for Eloquent models
            $table->unsignedBigInteger('user_id');
            $table->unsignedInteger('role_id');
            $table->timestamps();

            // Foreign keys
            $table->foreign('user_id')->references('user_id')->on('nguoi_dungs')->onDelete('cascade');
            $table->foreign('role_id')->references('role_id')->on('vai_tros')->onDelete('cascade');

            // Unique combination to prevent duplicate role assignments
            $table->unique(['user_id', 'role_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vai_tro_nguoi_dungs');
    }
};
