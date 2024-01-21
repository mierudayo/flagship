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
        Schema::create('purchase_orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('customer_contact_id')->nullable();
            $table->unsignedBigInteger('delivery_address_id')->nullable();
            $table->unsignedBigInteger('product_category_id');
            // 請求条件
            $table->tinyInteger('billing_type')->nullable()->default(2);
            $table->integer('cutoff_day')->nullable();
            $table->integer('payment_month_offset')->nullable();
            $table->integer('payment_day')->nullable();
            $table->integer('payment_day_offset')->nullable()->default(0);
            // 支払状況
            $table->date('payment_date')->nullable();
            $table->string('payment_status')->nullable();

            // 出荷元情報
            $table->string('ship_from_address')->nullable();
            $table->string('ship_from_company')->nullable();
            $table->string('ship_from_contact')->nullable();

            $table->date('purchase_date');
            $table->date('shipping_date')->nullable();
            $table->text('note')->nullable();
            $table->unsignedBigInteger('purchase_in_charge_id');
            $table->unsignedBigInteger('created_by_id');
            $table->unsignedBigInteger('updated_by_id')->nullable();
            $table->timestamps();

            // 外部キー制約
            $table->foreign('customer_id')
                ->references('id')
                ->on('customers')
                ->onDelete('restrict');

            $table->foreign('customer_contact_id')
                ->references('id')
                ->on('customer_contacts')
                ->onDelete('restrict');

            $table->foreign('delivery_address_id')
                ->references('id')
                ->on('delivery_addresses')
                ->onDelete('restrict');

            $table->foreign('product_category_id')
                ->references('id')
                ->on('product_categories')
                ->onDelete('restrict');

            $table->foreign('purchase_in_charge_id')
                ->references('id')
                ->on('users')
                ->onDelete('restrict');

            $table->foreign('created_by_id')
                ->references('id')
                ->on('users')
                ->onDelete('restrict');

            $table->foreign('updated_by_id')
                ->references('id')
                ->on('users')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('purchase_orders', function (Blueprint $table) {
            $table->dropForeign(['customer_id']);
            $table->dropForeign(['customer_contact_id']);
            $table->dropForeign(['delivery_address_id']);
            $table->dropForeign(['product_category_id']);
            $table->dropForeign(['purchase_in_charge_id']);
            $table->dropForeign(['created_by_id']);
            $table->dropForeign(['updated_by_id']);
        });
        Schema::dropIfExists('purchase_orders');
    }
};
