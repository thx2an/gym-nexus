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
        Schema::create('phan_tich_rui_ros', function (Blueprint $table) {
            $table->id('analysis_id');
            $table->unsignedBigInteger('member_id');
            $table->dateTime('analyzed_at');
            $table->string('risk_level', 20); // Check constraint logic handled in app
            $table->float('score')->nullable();
            $table->text('factors_json')->nullable();
            $table->text('recommendations')->nullable();
            $table->timestamps();

            $table->foreign('member_id')->references('member_id')->on('member_profiles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phan_tich_rui_ros');
    }
};
