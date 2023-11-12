# テーブル定義

## permissions 権限

| カラム         | 名称         | 型          | 説明    |
|--------------|------------|-------------|--------|
| id           | ID         | bigIncrements | PK     |
| level        | 権限レベル    | integer      |        |
| name         | 権限名       | string       |        |
| display_name | 表示名       | string       |        |
| created_at   | 作成日時     | timestamp    |        |
| updated_at   | 更新日時     | timestamp    |        |

## users ユーザー

システムを利用するユーザー情報、認証情報、社員情報を管理する。

| カラム              | 名称         | 型               | 説明         |
|-------------------|----------------|-----------------|-------------|
| id                | ID             | bigIncrements   | PK          |
| permission_id     | 権限ID         | unsignedBigInteger | FK     |
| name              | ユーザー名     | string            |             |
| name_kana         | ヨミガナ       | string            |             |
| email             | E-mail         | string            | UK          |
| email_verified_at | E-mail認証日   | timestamp         |              |
| password          | パスワード     | string            |             |
| employee_code     | 社員番号       | string            | UK          |
| mobile_number     | 携帯番号       | string            |             |
| employment_date   | 入社日         | date              |             |
| resignation_date  | 退職日         | date              |             |
| created_at        | 作成日時       | timestamp         |             |
| updated_at        | 更新日時       | timestamp         |             |

## customers 取引先

売上の対象となる顧客（得意先）または仕入先の基本情報を管理する。

| カラム             | 名称         | 型                  | 説明     |
|------------------|------------|--------------------|--------|
| id               | ID         | bigIncrements      | PK     |
| name             | 取引先名     | string             |        |
| name_kana        | ヨミガナ     | string             |        |
| shortcut         | ショートカット名 | string             |        |
| postal_code      | 郵便番号     | string             |        |
| address          | 住所        | string             |        |
| tel              | TEL        | string             |        |
| fax              | FAX        | string             |        |
| note             | 備考        | text               |        |
| in_charge_user_id| 担当ユーザーID | unsignedBigInteger  | FK |
| created_by_id    | 作成ユーザーID | unsignedBigInteger  | FK |
| updated_by_id    | 更新ユーザーID | unsignedBigInteger  | FK |
| created_at       | 作成日時     | timestamp          |        |
| updated_at       | 更新日時     | timestamp          |        |

## customer_contacts 連絡先

取引先に所属する連絡先（担当者）を管理する。連絡先は必ず取引先に所属するため、個人顧客の場合は同一の内容で取引先を作成すること。

| カラム              | 名称         | 型                  | 説明     |
|-------------------|------------|--------------------|--------|
| id                | ID         | bigIncrements      | PK     |
| customer_id       | 取引先ID     | unsignedBigInteger | FK     |
| name              | 連絡先名     | string             |        |
| name_kana         | ヨミガナ     | string             |        |
| tel               | TEL        | string             |        |
| mobile_number     | 携帯        | string             |        |
| email             | E-mail     | string             |        |
| position          | 役職        | string             |        |
| role              | 役割        | string             |        |
| is_active         | 使用状況     | boolean            |       |
| note              | 備考        | text               |        |
| in_charge_user_id | 担当ユーザーID | unsignedBigInteger | FK     |
| created_by_id     | 作成ユーザーID | unsignedBigInteger | FK     |
| updated_by_id     | 更新ユーザーID | unsignedBigInteger | FK     |
| created_at        | 作成日時     | timestamp          |        |
| updated_at        | 更新日時     | timestamp          |        |

## logistics_addresses 出荷元/納品先住所

取引先の出荷元/納品先を管理する。

| カラム           | 名称       | 型                  | 説明       |
|-----------------|----------|--------------------|-----------|
| id              | ID       | bigIncrements      | PK        |
| customer_id     | 取引先ID   | unsignedBigInteger | FK        |
| address_type    | 住所区分 | tinyInteger        |  1:出荷元, 2:納品先, 3:兼用 |
| post_code       | 郵便番号   | string             |           |
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

## product_category_groups 商品カテゴリグループ

| カラム               | 名称         | 型                 | 説明         |
|--------------------|----------------|--------------------|--------------|
| id                 | ID             | unsignedBigInteger | PK           |
| name               | グループ名     | string          |              |
| display_order      | 表示順         | integer         |              |
| created_at         | 作成日時       | timestamp       |              |
| updated_at         | 更新日時       | timestamp       |              |

## product_categories 商品カテゴリ

| カラム               | 名称           | 型                 | 説明         |
|--------------------|------------------|--------------------|--------------|
| id                 | ID               | unsignedBigInteger | PK           |
| group_id           | グループID       | unsignedBigInteger | FK           |
| name               | 商品カテゴリ名   | string          |              |
| display_order      | 表示順           | integer         |              |
| created_at         | 作成日時         | timestamp       |              |
| updated_at         | 更新日時         | timestamp       |              |

## products 商品

| カラム          | 名称        | 型                 | 説明                                     |
|-----------------|-------------|--------------------|------------------------------------------|
| id              | ID          | unsignedBigInteger | PK                                       |
| category_id     | カテゴリID  | unsignedBigInteger | FK                                       |
| product_number  | 商品番号    | string             | （任意）一意の商品識別番号               |
| product_type    | 商品タイプ  | tinyint            | 1:有形商材(製品), 2:無形商材(サービス)   |
| name            | 商品名      | string             |                                          |
| description     | 説明        | string             |                                          |
| sales_price     | 販売価格    | decimal            | 商品の販売価格                           |
| purchase_price  | 仕入価格    | decimal            | 商品の仕入価格                           |
| display_order   | 表示順      | integer            |                                          |
| created_at      | 作成日時    | timestamp          |                                          |
| updated_at      | 更新日時    | timestamp          |                                          |
