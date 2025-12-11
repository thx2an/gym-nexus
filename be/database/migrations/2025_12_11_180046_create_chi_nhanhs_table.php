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
        Schema::create('chi_nhanhs', function (Blueprint $table) {
            $table->integer('branch_id')->autoIncrement(); // branch_id Int PK
            $table->string('name', 150); // name Nvarchar(150)
            $table->string('address', 255); // address Nvarchar(255)
            $table->string('phone', 20)->nullable(); // phone Nvarchar(20) Nullable
            $table->boolean('is_active')->default(true); // is_active Bit Default 1
            $table->timestamps(); // created_at, updated_at (includes Default getdate() behavior in Eloquent)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chi_nhanhs');
    }
};
