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
        Schema::create('profile_p_t_s', function (Blueprint $table) {
            $table->bigIncrements('trainer_id'); // trainer_id Bigint PK
            $table->unsignedBigInteger('user_id')->unique(); // user_id Bigint FK, unique
            $table->string('specialization', 200)->nullable(); // specialization Nvarchar(200) Nullable
            $table->text('bio')->nullable(); // bio Nvarchar(max) Nullable
            $table->integer('experience_years')->nullable(); // experience_years Int Nullable
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('nguoi_dungs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profile_p_t_s');
    }
};
