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
        Schema::create('goi_hangs', function (Blueprint $table) {
            $table->bigIncrements('membership_id'); // membership_id Bigint PK
            $table->unsignedBigInteger('member_id'); // member_id Bigint FK -> member_profiles
            $table->integer('package_id'); // package_id Int FK -> membership_packages.package_id
            $table->date('start_date'); // start_date Date
            $table->date('end_date'); // end_date Date
            $table->string('status', 20)->default('pending'); // status Nvarchar(20) Check (pending, active, expired, canceled)
            $table->timestamps(); // created_at, updated_at Default getdate()

            // Foreign Keys
            // Note: Ensuring these tables exist is required for this migration to run successfully.
            $table->foreign('member_id')->references('member_id')->on('member_profiles')->onDelete('cascade');
            $table->foreign('package_id')->references('package_id')->on('membership_packages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('goi_hangs');
    }
};
