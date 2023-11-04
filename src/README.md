# sales-manager-plus

【WIP】以下、アプリ仕様メモです。

## 権限 permissions

Relationship:

- HasMany `users`

デフォルトの権限は次の3種類:

| ID | 権限名         | 表示名          |
|----|----------------|-----------------|
| 1  | `system-admin` | システム管理者  |
| 2  | `admin`        | 管理者          |
| 3  | `staff`        | 担当者          |

## ユーザー users

Relationship:

- BelongsTo `permissions`
- HasMany `customers`
- HasMany `customer_contacts`

| メソッド名 | 概要          | 権限制御       |
|------------|---------------|----------------|
| `index`    | 一覧表示      | なし           |
| `create`   | 登録画面表示  | `admin`以上    |
| `store`    | 保存          | `admin`以上    |
| `edit`     | 編集画面表示  | `admin`以上    |
| `update`   | 更新          | `admin`以上    |

## 取引先 customers

Relationship:

- BelongsTo `users`
- HasMany `customer_contacts`

| メソッド名 | 概要          | 権限制御       |
|------------|---------------|----------------|
| `index`    | 一覧表示      | なし           |
| `create`   | 登録画面表示  | `admin`以上    |
| `store`    | 保存          | `admin`以上    |
| `edit`     | 編集画面表示  | `admin`以上    |
| `update`   | 更新          | `admin`以上    |
| `destroy`  | 削除          | `admin`以上    |

## 取引先担当者 customer_contacts

Relationship:

- BelongsTo `users`
- BelongsTo `customers`
