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
        Schema::create('nguoi_dungs', function (Blueprint $table) {
            $table->id('user_id'); // user_id Bigint PK
            $table->string('full_name', 150);
            $table->string('email', 150)->unique();
            $table->string('phone', 20)->unique();
            $table->string('password_hash', 255);
            $table->string('gender', 20)->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('status', 20); // Check(active/ inactive/ locked) - logic handled in app or strict check constraint if needed
            $table->timestamps(); // created_at, updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nguoi_dungs');
    }
};
