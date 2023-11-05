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
        Schema::create('customer_contacts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id')->comment('取引先ID');
            $table->string('name')->comment('顧客担当者名');
            $table->string('name_kana')->nullable()->comment('読み仮名');
            $table->string('tel_number')->nullable()->comment('TEL');
            $table->string('mobile_number')->nullable()->comment('携帯');
            $table->string('email')->nullable()->comment('E-mail');
            $table->string('position')->nullable()->comment('役職');
            $table->string('role')->nullable()->comment('役割');
            $table->boolean('is_active')->default(true)->comment('使用状況');
            $table->text('note')->nullable()->comment('備考');
            $table->unsignedBigInteger('in_charge_user_id')->nullable()->comment('担当ユーザーID');
            $table->unsignedBigInteger('created_by_id')->comment('作成ユーザーID');
            $table->unsignedBigInteger('updated_by_id')->nullable()->comment('更新ユーザーID');
            $table->timestamps();

            // Foreign Key References
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('restrict');
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
        Schema::table('customer_contacts', function (Blueprint $table) {
            $table->dropForeign(['customer_id']);
            $table->dropForeign(['in_charge_user_id']);
            $table->dropForeign(['created_by_id']);
            $table->dropForeign(['updated_by_id']);
        });
        Schema::dropIfExists('customer_contacts');
    }
};
