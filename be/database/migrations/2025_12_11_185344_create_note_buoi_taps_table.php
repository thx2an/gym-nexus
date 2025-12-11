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
        Schema::create('note_buoi_taps', function (Blueprint $table) {
            $table->bigIncrements('note_id'); // note_id Bigint PK
            $table->unsignedBigInteger('session_id'); // session_id Bigint FK
            $table->unsignedBigInteger('trainer_id'); // trainer_id Bigint FK
            $table->unsignedBigInteger('member_id'); // member_id Bigint FK
            $table->text('notes')->nullable(); // notes Nvarchar(max)
            $table->text('metrics_json')->nullable(); // metrics_json Nvarchar(max) or JSON
            $table->timestamps();

            // FKs - No Cascade on Member/Trainer to avoid cycles
            $table->foreign('session_id')->references('session_id')->on('buoi_taps')->onDelete('cascade');
            $table->foreign('trainer_id')->references('trainer_id')->on('profile_p_t_s');
            $table->foreign('member_id')->references('user_id')->on('nguoi_dungs');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('note_buoi_taps');
    }
};
