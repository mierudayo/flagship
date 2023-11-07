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

## customers

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

## customer_contacts

取引先に所属する連絡先（担当者）を管理する。

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

## logistics_addresses

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
