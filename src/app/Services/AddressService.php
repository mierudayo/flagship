<?php

namespace App\Services;

use App\Models\Prefecture;

class AddressService
{
    /**
     * 住所から都道府県名を抽出する
     * @param string|null $address
     * @return string|null 抽出された都道府県名、または null
     */
    public function extractPrefectureFromAddress(?string $address): ?string
    {
        if ($address === null) {
            return null;
        }

        $pattern = '/(東京都|北海道|大阪府|京都府|.{2,3}県)/u';

        if (preg_match($pattern, $address, $matches)) {
            return $matches[1];
        }

        return null;
    }

    /**
     * 住所から都道府県IDを取得する。
     *
     * @param string|null $address 住所
     * @return int|null 抽出された都道府県ID、または null
     */
    public function getPrefectureIdFromAddress(?string $address): ?int
    {
        if ($address === null) {
            return null;
        }
        
        $prefectureName = $this->extractPrefectureFromAddress($address);

        if ($prefectureName) {
            $prefecture = Prefecture::where('name', $prefectureName)->first();
            return $prefecture ? $prefecture->id : null;
        }

        return null;
    }
}
