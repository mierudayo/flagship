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
        Schema::table('users', function (Blueprint $table) {
            $table->string('employee_code')->unique()->after('remember_token')->comment('社員コード');
            $table->string('mobile_number')->nullable()->after('employee_code')->comment('携帯番号');
            $table->date('employment_date')->nullable()->after('mobile_number')->comment('入社日');
            $table->date('resignation_date')->nullable()->after('employment_date')->comment('退職日');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('employee_code');
            $table->dropColumn('mobile_number');
            $table->dropColumn('resignation_date');
        });
    }
};
