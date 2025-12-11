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
        Schema::create('chi_nhanh_nguoi_dungs', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id'); // user_id Bigint FK
            $table->integer('branch_id'); // branch_id Int FK -> branches.branch_id
            $table->integer('primary_flag')->default(0)->nullable(); // primary_flag int Default 0
            $table->timestamps();

            // Composite Primary Key to ensure unique user-branch pair
            $table->primary(['user_id', 'branch_id']);

            $table->foreign('user_id')->references('user_id')->on('nguoi_dungs')->onDelete('cascade');
            $table->foreign('branch_id')->references('branch_id')->on('chi_nhanhs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chi_nhanh_nguoi_dungs');
    }
};
