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
        Schema::create('lich_lam_viec_p_t_s', function (Blueprint $table) {
            $table->bigIncrements('availability_id'); // availability_id Bigint PK
            $table->unsignedBigInteger('trainer_id'); // trainer_id Bigint FK -> trainer_profiles.trainer_id
            $table->integer('branch_id'); // branch_id Int FK -> branches.branch_id
            $table->date('date')->nullable(); // date Date Nullable (if not recurring)
            $table->time('start_time'); // start_time Time
            $table->time('end_time'); // end_time Time
            $table->boolean('is_recurring')->default(false); // is_recurring Bit Default 0
            $table->tinyInteger('day_of_week')->nullable(); // day_of_week Tinyint Nullable (0–6 if recurring)
            $table->boolean('is_blocked')->default(false); // is_blocked bit Default 0
            $table->timestamps();

            $table->foreign('trainer_id')->references('trainer_id')->on('profile_p_t_s')->onDelete('cascade');
            $table->foreign('branch_id')->references('branch_id')->on('chi_nhanhs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lich_lam_viec_p_t_s');
    }
};
