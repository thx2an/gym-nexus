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
        Schema::create('ho_so_tien_dos', function (Blueprint $table) {
            $table->id('record_id');
            $table->unsignedBigInteger('member_id');
            $table->date('record_date');
            $table->string('metric_type', 50); // e.g., weight, reps, calories
            $table->float('value');
            $table->string('unit', 20)->nullable();
            $table->string('source', 50); // PT / AI / manual
            $table->unsignedBigInteger('created_by'); // PT or manager
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
        Schema::dropIfExists('ho_so_tien_dos');
    }
};
