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
        Schema::table('delivery_addresses', function (Blueprint $table) {
            $table->unsignedBigInteger('prefecture_id')->nullable()->after('postal_code');

            $table->foreign('prefecture_id')
                ->references('id')
                ->on('prefectures')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('delivery_addresses', function (Blueprint $table) {
            $table->dropForeign(['prefecture_id']);
            $table->dropColumn('prefecture_id');
        });
    }
};
