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
        Schema::create('lich_tap_a_i_s', function (Blueprint $table) {
            $table->id('plan_id');
            $table->unsignedBigInteger('member_id');
            $table->string('goal', 255)->nullable();
            $table->integer('duration_weeks')->nullable();
            $table->longText('plan_json')->nullable(); // Nvarchar(max)
            $table->string('source', 20)->default('ai'); // Check (ai/ pt)
            $table->unsignedBigInteger('created_by'); // Trainer or AI system (represented by a user or system ID)
            $table->dateTime('created_at')->useCurrent(); // Default getdate()
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
        Schema::dropIfExists('lich_tap_a_i_s');
    }
};
