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
        Schema::create('plan_dinh_duong_a_i_s', function (Blueprint $table) {
            $table->id('nutrition_id');
            $table->unsignedBigInteger('member_id');
            $table->integer('daily_calories')->nullable();
            $table->longText('macro_json')->nullable(); // Nvarchar(max)
            $table->longText('plan_json')->nullable(); // Nvarchar(max)
            $table->unsignedBigInteger('created_by'); // Trainer or AI
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at')->nullable();

            // Foreign Keys
            $table->foreign('member_id')->references('member_id')->on('member_profiles')->onDelete('cascade');
            $table->foreign('created_by')->references('user_id')->on('nguoi_dungs');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plan_dinh_duong_a_i_s');
    }
};
