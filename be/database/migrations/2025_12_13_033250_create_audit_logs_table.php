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
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id('log_id');
            $table->string('entity_type', 100)->nullable();
            $table->unsignedBigInteger('entity_id');
            $table->string('action', 100);
            $table->unsignedBigInteger('performed_by');
            $table->timestamp('performed_at')->useCurrent();
            $table->text('details')->nullable();

            $table->foreign('performed_by')->references('user_id')->on('nguoi_dungs');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
