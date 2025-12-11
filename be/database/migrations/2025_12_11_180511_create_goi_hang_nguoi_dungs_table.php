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
        Schema::create('goi_hang_nguoi_dungs', function (Blueprint $table) {
            $table->integer('package_id')->autoIncrement(); // package_id Int PK
            $table->string('code', 50)->unique(); // code Nvarchar(50) Unique
            $table->string('name', 100); // name Nvarchar(100)
            $table->text('description')->nullable(); // description Nvarchar(max)
            $table->integer('duration_days'); // duration_days Int
            $table->decimal('price', 10, 2); // price Decimal
            $table->text('benefits')->nullable(); // benefits Nvarchar(max)
            $table->boolean('is_active')->default(true); // is_active Bit Default 1
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('goi_hang_nguoi_dungs');
    }
};
