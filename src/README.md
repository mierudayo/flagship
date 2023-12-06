# sales-manager-plus

【WIP】以下、アプリ仕様メモです。

## 特徴

### 受発注同時入力機能

商社・卸売業などのように、在庫を持たず受注の都度対応する発注を行うビジネスフローの場合、伝票入力が二重に必要で工数がかかります。また、受注ごとに原価を差し引いた粗利がより重要になります。

- 粗利管理が簡単・正確（受注明細と発注明細を紐づけて管理できるため）
- 伝票の二重入力を削減（受注登録の内容を引き継いで同時に発注登録が可能）

## テーブル定義

[テーブル定義](./docs/tables-definition.md)

## ER

![ER図](./docs/ER.drawio.svg)

## ビジネスフロー

自社で在庫を持たないビジネスモデル。販売先からの受注に対応する発注を都度行い、商品は仕入先から販売先へ直送する。

![biz-flow](docs/bizflow.drawio.png)

## アプリ仕様

### 権限 permissions

Relationship:

- HasMany `users`

デフォルトの権限は次の3種類:

| ID | 権限名         | 表示名          |
|----|----------------|-----------------|
| 1  | `system-admin` | システム管理者  |
| 2  | `admin`        | 管理者          |
| 3  | `staff`        | 担当者          |

### ユーザー users

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

### 取引先 customers

Relationship:

- BelongsTo `users`
- HasMany `customer_contacts`

| メソッド名 | 概要          | 権限制御       |
|------------|---------------|----------------|
| `index`    | 一覧表示      | なし           |
| `create`   | 登録表示      | なし           |
| `store`    | 保存          | なし           |
| `show`     | 詳細表示      | なし           |
| `edit`     | 編集表示      | なし           |
| `update`   | 更新          | なし           |
| `destroy`  | 削除          | なし           |

### 取引先担当者 customer_contacts

Relationship:

- BelongsTo `users`
- BelongsTo `customers`
