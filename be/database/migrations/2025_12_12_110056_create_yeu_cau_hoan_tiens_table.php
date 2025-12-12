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
        Schema::create('yeu_cau_hoan_tiens', function (Blueprint $table) {
            $table->id('refund_id');
            $table->unsignedBigInteger('payment_id');
            $table->unsignedBigInteger('member_id');
            $table->text('reason'); // Nvarchar(max)
            $table->string('status', 20)->default('pending'); // Check (pending/ approved/ rejected/ processed)
            $table->dateTime('requested_at')->useCurrent(); // Default getdate()
            $table->unsignedBigInteger('processed_by')->nullable(); // Admin who processed - Nullable for pending
            $table->dateTime('processed_at')->nullable(); // Nullable for pending
            $table->timestamps();

            // Foreign Keys
            $table->foreign('payment_id')->references('payment_id')->on('thanh_toans')->onDelete('cascade');
            $table->foreign('member_id')->references('member_id')->on('member_profiles'); // Removed onDelete cascade to avoid multiple cascade paths (Diamond problem)
            $table->foreign('processed_by')->references('user_id')->on('nguoi_dungs'); // Assuming Admin is a NguoiDung
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('yeu_cau_hoan_tiens');
    }
};
