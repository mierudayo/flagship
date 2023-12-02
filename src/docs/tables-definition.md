# テーブル定義

- [テーブル定義](#テーブル定義)
  - [permissions 権限](#permissions-権限)
  - [users ユーザー](#users-ユーザー)
  - [customers 取引先](#customers-取引先)
  - [customer\_contacts 連絡先](#customer_contacts-連絡先)
  - [delivery\_addresses 出荷元/納品先住所](#delivery_addresses-出荷元納品先住所)
  - [sales\_terms 取引条件(販売)](#sales_terms-取引条件販売)
  - [purchase\_terms 取引条件(仕入)](#purchase_terms-取引条件仕入)
  - [billing\_addresses 請求先](#billing_addresses-請求先)
  - [billing\_address\_customer 中間テーブル](#billing_address_customer-中間テーブル)
  - [regions 地域](#regions-地域)
  - [prefectures 都道府県](#prefectures-都道府県)
  - [product\_category\_groups 商品カテゴリグループ](#product_category_groups-商品カテゴリグループ)
  - [product\_categories 商品カテゴリ](#product_categories-商品カテゴリ)
  - [products 商品](#products-商品)
  - [inquiry\_types 問い合わせ区分](#inquiry_types-問い合わせ区分)
  - [inquiries 問い合わせ](#inquiries-問い合わせ)
  - [sales\_activities 営業履歴](#sales_activities-営業履歴)
  - [sales\_orders 受注](#sales_orders-受注)
  - [sales\_order\_details 受注明細](#sales_order_details-受注明細)
  - [purchase\_orders 発注](#purchase_orders-発注)
  - [purchase\_order\_details 発注明細](#purchase_order_details-発注明細)

## permissions 権限

| カラム       | 名称         | 型            | 説明   |
|--------------|--------------|---------------|--------|
| id           | ID           | bigIncrements | PK     |
| level        | 権限レベル   | integer       |        |
| name         | 権限名       | string        |        |
| display_name | 表示名       | string        |        |
| created_at   | 作成日時     | timestamp     |        |
| updated_at   | 更新日時     | timestamp     |        |

## users ユーザー

システムを利用するユーザー情報、認証情報、社員情報を管理する。

| カラム            | 名称           | 型                 | 説明        |
|-------------------|----------------|--------------------|-------------|
| id                | ID             | bigIncrements      | PK          |
| permission_id     | 権限ID         | unsignedBigInteger | FK          |
| name              | ユーザー名     | string             |             |
| name_kana         | ヨミガナ       | string             |             |
| email             | E-mail         | string             | UK          |
| email_verified_at | E-mail認証日   | timestamp          |             |
| password          | パスワード     | string             |             |
| employee_code     | 社員番号       | string             | UK          |
| mobile_number     | 携帯番号       | string             |             |
| employment_date   | 入社日         | date               |             |
| resignation_date  | 退職日         | date               |             |
| created_at        | 作成日時       | timestamp          |             |
| updated_at        | 更新日時       | timestamp          |             |

## customers 取引先

売上の対象となる顧客（得意先）または仕入先の基本情報を管理する。

| カラム           | 名称             | 型                 | 説明   |
|------------------|------------------|--------------------|--------|
| id               | ID               | bigIncrements      | PK     |
| name             | 取引先名         | string             |        |
| name_kana        | ヨミガナ         | string             |        |
| shortcut         | ショートカット名 | string             |        |
| postal_code      | 郵便番号         | string             |        |
| prefecture_id    | 都道府県ID       | unsignedBigInteger | FK nullable |
| address          | 住所             | string             |        |
| tel              | TEL              | string             |        |
| fax              | FAX              | string             |        |
| note             | 備考             | text               |        |
| in_charge_user_id| 担当ユーザーID   | unsignedBigInteger | FK     |
| created_by_id    | 作成ユーザーID   | unsignedBigInteger | FK     |
| updated_by_id    | 更新ユーザーID   | unsignedBigInteger | FK     |
| created_at       | 作成日時         | timestamp          |        |
| updated_at       | 更新日時         | timestamp          |        |

## customer_contacts 連絡先

取引先に所属する連絡先（担当者）を管理する。連絡先は必ず取引先に所属するため、個人顧客の場合は同一の内容で取引先を作成すること。

| カラム              | 名称         | 型                 | 説明   |
|-------------------|----------------|--------------------|--------|
| id                | ID             | bigIncrements      | PK     |
| customer_id       | 取引先ID       | unsignedBigInteger | FK     |
| name              | 連絡先名       | string             |        |
| name_kana         | ヨミガナ       | string             |        |
| tel               | TEL            | string             |        |
| mobile_number     | 携帯           | string             |        |
| email             | E-mail         | string             |        |
| position          | 役職           | string             |        |
| role              | 役割           | string             |        |
| is_active         | 使用状況       | boolean            |        |
| note              | 備考           | text               |        |
| in_charge_user_id | 担当ユーザーID | unsignedBigInteger | FK     |
| created_by_id     | 作成ユーザーID | unsignedBigInteger | FK     |
| updated_by_id     | 更新ユーザーID | unsignedBigInteger | FK     |
| created_at        | 作成日時       | timestamp          |        |
| updated_at        | 更新日時       | timestamp          |        |

## delivery_addresses 出荷元/納品先住所

取引先の出荷元/納品先を管理する。

| カラム          | 名称    | 型                  | 説明      |
|-----------------|----------|--------------------|-----------|
| id              | ID       | bigIncrements      | PK        |
| customer_id     | 取引先ID | unsignedBigInteger | FK        |
| address_type    | 住所区分 | tinyInteger        | 1:出荷元, 2:納品先, 3:兼用 |
| postal_code       | 郵便番号 | string             |           |
| prefecture_id   | 都道府県ID | unsignedBigInteger | FK nullable |
| address         | 住所     | string             |           |
| company_name    | 会社名   | string             |           |
| contact_name    | 担当者名 | string             |           |
| tel             | TEL      | string             |           |
| note            | 備考     | text               |           |
| created_at      | 作成日時 | timestamps         |           |
| updated_at      | 更新日時 | timestamps         |           |

## sales_terms 取引条件(販売)

取引先に対する販売時のデフォルト取引条件を管理する。ただし、伝票単位で条件を管理するために、受注実績で個別の取引条件を管理する。

| カラム                | 名称           | 型                 | 説明         |
|-----------------------|----------------|--------------------|--------------|
| id                    | ID             | unsignedBigInteger | PK           |
| customer_id           | 取引先ID       | unsignedBigInteger | FK           |
| billing_type          | 請求タイプ     | tinyInteger        | 1:締め請求 2:都度請求 |
| cutoff_day            | 締め日         | integer            | 締め請求時 1~28日, 月末(29, 30, 31)は99 |
| payment_month_offset  | 支払月         | integer            | 締め請求時 当月:0, 翌月:1, 翌々月:2... |
| payment_day           | 支払日         | integer            | 締め請求時 1~28日, 月末(29, 30, 31)は99 |
| payment_day_offset    | 支払期限日数   | integer            | 都度請求時 0:前払い, 3:3営業日, 7:7営業日...等 |
| created_at            | 作成日時       | timestamp          |              |
| updated_at            | 更新日時       | timestamp          |              |

## purchase_terms 取引条件(仕入)

取引先に対する発注時のデフォルト取引条件を管理する。ただし、伝票単位で条件を管理するために、受注実績で個別の取引条件を管理する。

| カラム                | 名称           | 型                 | 説明         |
|-----------------------|----------------|--------------------|--------------|
| id                    | ID             | unsignedBigInteger | PK           |
| customer_id           | 取引先ID       | unsignedBigInteger | FK           |
| billing_type          | 請求タイプ     | tinyInteger        | 1:締め請求 2:都度請求 |
| cutoff_day            | 締め日         | integer            | 締め請求時 1~28日, 月末(29, 30, 31)は99 |
| payment_month_offset  | 支払月         | integer            | 締め請求時 当月:0, 翌月:1, 翌々月:2... |
| payment_day           | 支払日         | integer            | 締め請求時 1~28日, 月末(29, 30, 31)は99 |
| payment_day_offset    | 支払期限日数   | integer            | 都度請求時 0:前払い, 3:3営業日, 7:7営業日...等 |
| created_at            | 作成日時       | timestamp          |              |
| updated_at            | 更新日時       | timestamp          |              |

## billing_addresses 請求先

| カラム                  | 名称             | 型                  | 説明   |
|------------------------|------------------|---------------------|--------|
| id                     | ID               | bigIncrements       | PK     |
| name                   | 請求先名         | string              |        |
| name_kana              | ヨミガナ         | string              |        |
| shortcut               | ショートカット名 | string              |        |
| billing_contact_name   | 請求先担当者     | string              |        |
| postal_code            | 郵便番号         | string              |        |
| address                | 住所             | string              |        |
| email                  | E-mail           | string              |        |
| tel                    | TEL              | string              |        |
| fax                    | FAX              | string              |        |
| invoice_delivery_method| 請求先送付方法   | string              |        |
| note                   | 備考             | text                |        |
| created_at             | 作成日時         | timestamp           |        |
| updated_at             | 更新日時         | timestamp           |        |

## billing_address_customer 中間テーブル

| カラム              | 名称             | 型                 | 説明            |
|---------------------|-----------------|---------------------|----------------|
| billing_address_id  | 請求先ID         | unsignedBigInteger |  FK   |
| customer_id         | 顧客ID           | unsignedBigInteger |  FK   |

## regions 地域

| カラム     | 名称    | 型                 | 説明 |
|------------|---------|--------------------|------|
| id         | ID      | unsignedBigInteger | PK   |
| name       | 地域名  | string             |      |

## prefectures 都道府県

| カラム     | 名称        | 型                 | 説明         |
|------------|-------------|--------------------|--------------|
| id         | ID          | unsignedBigInteger | PK           |
| name       | 都道府県名  | string             |              |
| region_id  | 地域ID      | unsignedBigInteger | FK (regions) |

## product_category_groups 商品カテゴリグループ

| カラム               | 名称         | 型                 | 説明         |
|--------------------|----------------|--------------------|--------------|
| id                 | ID             | unsignedBigInteger | PK           |
| name               | グループ名     | string             |              |
| display_order      | 表示順         | integer            |              |
| created_at         | 作成日時       | timestamp          |              |
| updated_at         | 更新日時       | timestamp          |              |

## product_categories 商品カテゴリ

| カラム               | 名称           | 型                 | 説明         |
|--------------------|------------------|--------------------|--------------|
| id                 | ID               | unsignedBigInteger | PK           |
| group_id           | グループID       | unsignedBigInteger | FK           |
| name               | 商品カテゴリ名   | string             |              |
| display_order      | 表示順           | integer            |              |
| created_at         | 作成日時         | timestamp          |              |
| updated_at         | 更新日時         | timestamp          |              |

## products 商品

| カラム          | 名称        | 型                 | 説明                                     |
|-----------------|-------------|--------------------|------------------------------------------|
| id              | ID          | unsignedBigInteger | PK                                       |
| category_id     | カテゴリID  | unsignedBigInteger | FK                                       |
| product_number  | 商品番号    | string             | （任意）一意の商品識別番号               |
| product_type    | 商品タイプ  | tinyInteger        | 1:有形商材(製品), 2:無形商材(サービス)   |
| name            | 商品名      | string             |                                          |
| description     | 説明        | string             |                                          |
| sales_price     | 販売価格    | decimal            | 商品の販売価格                           |
| purchase_price  | 仕入価格    | decimal            | 商品の仕入価格                           |
| display_order   | 表示順      | integer            |                                          |
| created_at      | 作成日時    | timestamp          |                                          |
| updated_at      | 更新日時    | timestamp          |                                          |

## inquiry_types 問い合わせ区分

| カラム          | 名称             | 型               | 説明         |
|-----------------|------------------|------------------|--------------|
| id              | ID               | unsignedBigInteger | PK         |
| name            | 区分名           | string           |              |
| custom_label    | カスタムラベル   | string           | CSSクラス用  |
| display_order   | 表示順           | integer          |              |
| created_at      | 作成日時         | timestamp        |              |
| updated_at      | 更新日時         | timestamp        |              |

## inquiries 問い合わせ

| カラム              | 名称               | 型                 | 説明                                              |
|---------------------|--------------------|--------------------|---------------------------------------------------|
| id                  | ID                 | unsignedBigInteger | PK                                                |
| inquiry_date        | 問い合わせ日       | date               |                                                   |
| customer_contact_id | 顧客ID             | unsignedBigInteger | FK                                                |
| product_id          | 商品ID             | unsignedBigInteger | FK nullable                                       |
| product_detail      | 商品詳細           | string             |                                                   |
| inquiry_type_id     | 問い合わせ区分ID   | unsignedBigInteger | FK                                                |
| lead_source         | リード獲得元       | tinyInteger        | 問い合わせ由来 1:HP, 2:TEL, 3:メール, 4:展示会, etc. |
| project_scale       | 案件規模           | integer            |                                                   |
| status              | 対応状況           | tinyInteger        | 1:対応中, 2:返信待ち, 3:保留, 4:成約, 5:失注, 6:見送り, 7:その他 |
| subject             | 件名               | string             |                                                   |
| message             | 問い合わせ内容     | text               |                                                   |
| answer              | 回答内容           | text               |                                                   |
| feedback            | フィードバック     | text               |                                                   |
| note                | 備考               | text               |                                                   |
| in_charge_user_id   | 担当ユーザーID     | unsignedBigInteger | FK                                                |
| created_by_id       | 作成者ID           | unsignedBigInteger | FK                                                |
| updated_by_id       | 更新者ID           | unsignedBigInteger | FK                                                |
| created_at          | 作成日時           | timestamp          |                                                   |
| updated_at          | 更新日時           | timestamp          |                                                   |

## sales_activities 営業履歴

| カラム              | 名称               | 型                 | 説明                                              |
|---------------------|--------------------|--------------------|---------------------------------------------------|
| id                  | ID                 | unsignedBigInteger | PK                                                |
| contact_date        | 連絡日             | date               |                                                   |
| customer_contact_id | 顧客ID             | unsignedBigInteger | FK                                                |
| proposal            | 提案内容           | text               |                                                   |
| feedback            | フィードバック     | text               |                                                   |
| note                | 備考               | text               |                                                   |
| in_charge_user_id   | 担当ユーザーID     | unsignedBigInteger | FK                                                |
| created_by_id       | 作成者ID           | unsignedBigInteger | FK                                                |
| updated_by_id       | 更新者ID           | unsignedBigInteger | FK                                                |
| created_at          | 作成日時           | timestamp          |                                                   |
| updated_at          | 更新日時           | timestamp          |                                                   |

## sales_orders 受注

| カラム                | 名称          | 型                  | 説明          |
|-----------------------|---------------|---------------------|--------------|
| id                    | ID            | unsignedBigInteger  | PK           |
| customer_id           | 取引先ID      | unsignedBigInteger  | FK           |
| customer_contact_id   | 連絡先ID      | unsignedBigInteger  | FK           |
| billing_address_id    | 請求先ID      | unsignedBigInteger  | FK           |
| delivery_address_id   | 納品先ID      | unsignedBigInteger  | FK           |
| product_category_id   | 集計品目ID    | unsignedBigInteger  | FK           |
| billing_type          | 請求タイプ    | tinyInteger         | 1:締め請求 2:都度請求 |
| cutoff_day            | 締め日        | integer             | 締め請求時 1~28日, 月末(29, 30, 31)は99 |
| payment_month_offset  | 支払月        | integer             | 締め請求時 当月:0, 翌月:1, 翌々月:2... |
| payment_day           | 支払日        | integer             | 締め請求時 1~28日, 月末(29, 30, 31)は99 |
| payment_day_offset    | 支払期限日数  | integer             | 都度請求時 0:前払い, 3:3営業日, 7:7営業日...等 |
| payment_date          | 入金日        | date                |              |
| payment_status        | 入金状況      | string              |              |
| customer_name         | 販売先名      | string              |              |
| delivery_address      | 納品先住所    | string              |              |
| order_date            | 受注日        | date                |              |
| shipping_date         | 出荷日        | date                |              |
| shipping_status       | 出荷状況      | string              |              |
| delivery_date         | 納品日        | date                |              |
| delivery_status       | 納品状況      | string              |              |
| delivery_memo         | 配送メモ      | string              |              |
| total_amount          | 総合計金額    | integer             |              |
| note                  | 備考          | text                |              |
| sales_in_charge_id    | 受注担当者ID  | unsignedBigInteger  | FK           |
| created_by_id         | 作成者ID      | unsignedBigInteger  | FK           |
| updated_by_id         | 更新者ID      | unsignedBigInteger  | FK           |
| created_at            | 作成日時      | timestamp           |              |
| updated_at            | 更新日時      | timestamp           |              |

## sales_order_details 受注明細

| カラム                | 名称             | 型                    | 説明                     |
|-----------------------|------------------|-----------------------|--------------------------|
| id                    | ID               | unsignedBigInteger    | PK                       |
| sales_order_id        | 受注ID           | unsignedBigInteger    | FK                       |
| product_id            | 商品ID           | unsignedBigInteger    | FK                       |
| product_detail        | 商品詳細         | string                |                          |
| quantity              | 数量             | integer               |                          |
| unit_price            | 単価（税抜き）   | decimal               |                          |
| tax_rate              | 税率             | decimal               | 例: 0.1 は10%            |
| is_tax_inclusive      | 税の種類         | boolean               | 外税：false, 内税：true  |
| subtotal              | 小計（税抜き）   | decimal               |                          |
| total                 | 総計（税込）     | decimal               |                          |
| note                  | 備考             | text                  |                          |
| created_at            | 作成日時         | timestamp             |                          |
| updated_at            | 更新日時         | timestamp             |                          |

## purchase_orders 発注

## purchase_order_details 発注明細
