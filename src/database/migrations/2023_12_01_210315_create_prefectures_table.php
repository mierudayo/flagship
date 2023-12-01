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
        Schema::create('prefectures', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('region_id');

            $table->foreign('region_id')
                ->references('id')
                ->on('regions')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prefectures', function (Blueprint $table) {
            $table->dropForeign(['region_id']);
        });
        Schema::dropIfExists('prefectures');
    }
};
