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
        Schema::table('thanh_toans', function (Blueprint $table) {
            // Drop foreign keys first to modify columns
            $table->dropForeign(['session_id']);
            $table->dropForeign(['membership_id']);

            // Make columns nullable
            $table->unsignedBigInteger('session_id')->nullable()->change();
            $table->unsignedBigInteger('membership_id')->nullable()->change();

            // Re-add foreign keys
            $table->foreign('session_id')->references('session_id')->on('buoi_taps')->onDelete('cascade');
            $table->foreign('membership_id')->references('membership_id')->on('goi_hangs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('thanh_toans', function (Blueprint $table) {
            // This down migration might fail if there are null values, but strict reversal would be:
            // Make them nullable=false again.
        });
    }
};
