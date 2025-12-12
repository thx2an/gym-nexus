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
        Schema::create('phien_phan_tich_tu_thes', function (Blueprint $table) {
            $table->id('pose_id');
            $table->unsignedBigInteger('member_id');
            $table->string('exercise_name', 255)->nullable();
            $table->dateTime('started_at');
            $table->dateTime('ended_at');
            $table->longText('result_summary')->nullable(); // Nvarchar(max)
            $table->string('raw_data_ref', 255)->nullable();
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at')->nullable();

            // Foreign Keys
            $table->foreign('member_id')->references('member_id')->on('member_profiles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phien_phan_tich_tu_thes');
    }
};
