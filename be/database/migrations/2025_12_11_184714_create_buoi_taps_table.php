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
        Schema::create('buoi_taps', function (Blueprint $table) {
            $table->bigIncrements('session_id'); // session_id Bigint PK
            $table->unsignedBigInteger('member_id'); // member_id Bigint FK -> users.user_id
            $table->unsignedBigInteger('trainer_id'); // trainer_id Bigint FK -> trainer_profiles.trainer_id
            $table->integer('branch_id'); // branch_id Int FK -> branches.branch_id
            $table->dateTime('start_time'); // start_time Datetime
            $table->dateTime('end_time'); // end_time Datetime
            $table->string('status', 20)->default('pending'); // status Nvarchar(20) Check (pending/ confirmed/ canceled/ completed)
            $table->text('notes')->nullable(); // notes Nvarchar(max) True
            $table->timestamps(); // created_at, updated_at

            $table->foreign('member_id')->references('user_id')->on('nguoi_dungs');
            $table->foreign('trainer_id')->references('trainer_id')->on('profile_p_t_s');
            $table->foreign('branch_id')->references('branch_id')->on('chi_nhanhs');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buoi_taps');
    }
};
