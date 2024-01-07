<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ImportData extends Command
{
    protected $signature    = 'import:data {source}';
    protected $description  = 'Import data from a specified source.';

    public function handle()
    {
        // 件数が多い場合は一時的にメモリを上げる（デフォルト128M）
        ini_set('memory_limit', '512M');

        $source     = $this->argument('source');
        $filePath   = storage_path("app/import_data/{$source}.php");

        if (!file_exists($filePath)) {
            $this->error("引数が間違っています。 {$source} というファイル名は存在しません。");
            return 1;
        }

        $data = require $filePath;

        $counter = 1;

        try {
            DB::beginTransaction();

            foreach (array_chunk($data, 500) as $chunk) {
                DB::table($source)->insert($chunk);
                $this->info("insert : {$counter}");
                $counter++;
            }

            DB::commit();
            $this->info("{$source} テーブルの生成が成功しました。");
        } catch (\Exception $e) {
            DB::rollBack();
            $this->error("Error occurred: " . $e->getMessage());
            return 1;
        }

        return 0;
    }
}
