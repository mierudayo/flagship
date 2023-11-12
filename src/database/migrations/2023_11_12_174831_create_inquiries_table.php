<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_contact_id');
            $table->unsignedBigInteger('product_id')->nullable();
            $table->unsignedBigInteger('inquiry_type_id');
            $table->tinyInteger('lead_source');
            $table->tinyInteger('status');
            $table->string('subject')->nullable();
            $table->string('message');
            $table->string('answer')->nullable();
            $table->tinyInteger('result')->nullable();
            $table->string('result_reason')->nullable();
            $table->unsignedBigInteger('in_charge_user_id');
            $table->unsignedBigInteger('created_by_id');
            $table->unsignedBigInteger('updated_by_id');
            $table->timestamps();

            // Foreign Key References
            $table->foreign('customer_contact_id')->references('id')->on('customer_contacts')->onDelete('restrict');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('restrict');
            $table->foreign('inquiry_type_id')->references('id')->on('inquiry_types')->onDelete('restrict');
            $table->foreign('in_charge_user_id')->references('id')->on('users')->onDelete('restrict');
            $table->foreign('created_by_id')->references('id')->on('users')->onDelete('restrict');
            $table->foreign('updated_by_id')->references('id')->on('users')->onDelete('restrict');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->dropForeign(['customer_contact_id']);
            $table->dropForeign(['product_id']);
            $table->dropForeign(['inquiry_type_id']);
            $table->dropForeign(['in_charge_user_id']);
            $table->dropForeign(['created_by_id']);
            $table->dropForeign(['updated_by_id']);
        });
        Schema::dropIfExists('inquiries');
    }
};
