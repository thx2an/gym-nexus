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
        Schema::create('phan_hoi_tu_thes', function (Blueprint $table) {
            $table->id('feedback_id');
            $table->unsignedBigInteger('pose_id');
            $table->float('timestamp')->nullable();
            $table->string('feedback_type', 50)->nullable();
            $table->text('message')->nullable();
            $table->timestamps();

            $table->foreign('pose_id')->references('pose_id')->on('phien_phan_tich_tu_thes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phan_hoi_tu_thes');
    }
};
