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

| カラム               | 名称          | 型             | 説明          |
|--------------------|--------------|----------------|--------------|
| id                 | ID           | unsignedBigInteger | PK           |
| customer_id        | 取引先ID       | unsignedBigInteger | FK           |
| cutoff_day         | 締め日         | integer         | 1~28日, 月末(29, 30, 31)は99、前払いは0とする。 |
| payment_month_offset | 支払月       | integer         | 当月=0, 翌月=1, 翌々月=2 ...             |
| payment_day        | 支払日         | integer         | 1~28日, 月末(29, 30, 31)は99、前払いは0とする。 |
| created_at         | 作成日時       | timestamp       |              |
| updated_at         | 更新日時       | timestamp       |              |

## purchase_terms 取引条件(仕入)

取引先に対する発注時のデフォルト取引条件を管理する。ただし、伝票単位で条件を管理するために、受注実績で個別の取引条件を管理する。

| カラム               | 名称          | 型             | 説明          |
|--------------------|--------------|----------------|--------------|
| id                 | ID           | unsignedBigInteger | PK           |
| customer_id        | 取引先ID       | unsignedBigInteger | FK           |
| cutoff_day         | 締め日         | integer         | 1~28日, 月末(29, 30, 31)は99、前払いは0とする。 |
| payment_month_offset | 支払月       | integer         | 当月=0, 翌月=1, 翌々月=2 ...             |
| payment_day        | 支払日         | integer         | 1~28日, 月末(29, 30, 31)は99、前払いは0とする。 |
| created_at         | 作成日時       | timestamp       |              |
| updated_at         | 更新日時       | timestamp       |              |
