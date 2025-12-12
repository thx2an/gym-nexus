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
        Schema::create('thanh_toans', function (Blueprint $table) {
            $table->id('payment_id');
            $table->unsignedBigInteger('member_id')->nullable();
            $table->decimal('amount', 10, 2);
            $table->string('currency', 10);
            $table->string('status', 20); // Check constraint logic handles in app or raw sql if needed, simple string here for migration
            $table->string('method', 50)->nullable();
            $table->string('gateway', 50)->nullable();
            $table->string('gateway_transaction_id', 255);
            $table->unsignedBigInteger('membership_id');
            $table->unsignedBigInteger('session_id');
            $table->dateTime('created_at')->useCurrent(); // Default getdate()
            $table->dateTime('updated_at')->nullable(); // Standard Laravel timestamps usually include this, but schema asked for created_at default getdate. Laravel timestamps() does both. Schema says created_at specific. I will add updated_at to be safe for Model but focus on schema compliance.

            // Foreign Keys
            $table->foreign('member_id')->references('member_id')->on('member_profiles'); // Removed onDelete set null to avoid multiple cascade paths error (Diamond problem)
            // Note: Schema says member_id FK -> member_profiles.member_id.

            // Revisiting schema: membership_id FK, session_id FK.
            // Need to know target tables. 
            // Based on checking files: 
            // membership_id -> goi_hangs.membership_id (GoiHang model)
            // session_id -> buoi_taps.session_id (BuoiTap model)

            $table->foreign('membership_id')->references('membership_id')->on('goi_hangs')->onDelete('cascade');
            $table->foreign('session_id')->references('session_id')->on('buoi_taps')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('thanh_toans');
    }
};
