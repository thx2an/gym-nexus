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
        Schema::create('member_profiles', function (Blueprint $table) {
            $table->bigIncrements('member_id'); // member_id Bigint PK
            $table->unsignedBigInteger('user_id')->unique(); // user_id Bigint FK (Unique)
            $table->float('current_height')->nullable(); // current_height Float
            $table->float('current_weight')->nullable(); // current_weight Float
            $table->string('fitness_goal', 255)->nullable(); // fitness_goal Nvarchar(255)
            $table->text('medical_history')->nullable(); // medical_history Nvarchar(max)
            $table->dateTime('created_at')->useCurrent(); // created_at Datetime Default getdate()

            // Foreign Keys
            $table->foreign('user_id')->references('user_id')->on('nguoi_dungs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('member_profiles');
    }
};
