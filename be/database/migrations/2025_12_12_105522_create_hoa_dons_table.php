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
        Schema::create('hoa_dons', function (Blueprint $table) {
            $table->id('invoice_id');
            $table->unsignedBigInteger('payment_id');
            $table->string('invoice_number', 100)->unique();
            $table->dateTime('issued_at');
            $table->decimal('total_amount', 10, 2);
            $table->string('file_path', 255)->nullable();
            $table->timestamps();

            // Foreign Keys
            $table->foreign('payment_id')->references('payment_id')->on('thanh_toans')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hoa_dons');
    }
};
