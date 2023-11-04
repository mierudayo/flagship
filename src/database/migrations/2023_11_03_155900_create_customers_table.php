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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('取引先名');
            $table->string('name_kana')->nullable()->comment('ヨミガナ');
            $table->string('shortcut')->nullable()->comment('ショートカット名');
            $table->string('postal_code')->nullable()->comment('郵便番号');
            $table->string('address')->nullable()->comment('住所');
            $table->string('tel_number')->nullable()->comment('TEL');
            $table->string('fax_number')->nullable()->comment('FAX');
            $table->text('note')->nullable()->comment('備考');
            $table->unsignedBigInteger('in_charge_user_id')->nullable()->comment('担当ユーザーID');
            $table->unsignedBigInteger('created_by_id')->comment('作成ユーザーID');
            $table->unsignedBigInteger('updated_by_id')->nullable()->comment('更新ユーザーID');
            $table->timestamps();

            // Foreign Key References
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
        Schema::table('customers', function (Blueprint $table) {
            $table->dropForeign(['in_charge_user_id']);
            $table->dropForeign(['created_by_id']);
            $table->dropForeign(['updated_by_id']);
        });
        Schema::dropIfExists('customers');
    }
};
