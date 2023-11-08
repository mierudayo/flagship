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
        Schema::create('logistics_addresses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id')->comment('取引先ID');
            $table->tinyInteger('address_type')->comment('住所区分');
            $table->string('post_code')->nullable()->comment('郵便番号');
            $table->string('address')->comment('住所');
            $table->string('company_name')->nullable()->comment('会社名');
            $table->string('contact_name')->nullable()->comment('担当者名');
            $table->string('tel')->nullable()->comment('TEL');
            $table->text('note')->nullable()->comment('備考');
            $table->timestamps();

            // Foreign Key References
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('logistics_addresses', function (Blueprint $table) {
            $table->dropForeign(['customer_id']);
        });
        Schema::dropIfExists('logistics_addresses');
    }
};
