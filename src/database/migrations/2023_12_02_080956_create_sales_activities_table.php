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
        Schema::create('sales_activities', function (Blueprint $table) {
            $table->id();
            $table->date('contact_date');
            $table->tinyInteger('status')->default(1);
            $table->unsignedBigInteger('customer_contact_id');
            $table->text('proposal');
            $table->text('feedback')->nullable();
            $table->text('note')->nullable();
            $table->unsignedBigInteger('in_charge_user_id');
            $table->unsignedBigInteger('created_by_id');
            $table->unsignedBigInteger('updated_by_id')->nullable();
            $table->timestamps();

            // Foreign Key References
            $table->foreign('customer_contact_id')->references('id')->on('customer_contacts')->onDelete('restrict');
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
        Schema::table('sales_activities', function (Blueprint $table) {
            $table->dropForeign(['customer_contact_id']);
            $table->dropForeign(['in_charge_user_id']);
            $table->dropForeign(['created_by_id']);
            $table->dropForeign(['updated_by_id']);
        });
        Schema::dropIfExists('sales_activities');
    }
};
