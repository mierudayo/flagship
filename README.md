# sales-manager-plus

Sales Management System using Laravel and React.

## 前提条件

開発環境:

- MacBook Air: M1, 2020
- macOS: `Ventura 13.4` ~ `Sonoma 14.0`
- Docker: `24.0.2`
- Docker Compose: `v2.18.1`
- PHP: `8.2.x`
- MySQL: `5.7`
- nginx: `1.25.1`
- composer: `2.6.x`
- Laravel: `10.x`

オプショナル:

- M1 Macの場合: `platform: linux/x86_64`を追記
- テスト用DBを使う場合: `testdb`サービスコンテナを追記
- Viteを使う場合: port `5173`の設定を追記

## プロジェクト準備

git clone後、任意のプロジェクト名に変更してディレクトリへ移動しておく

```bash
git clone git@github.com:rk-techs/docker-laravel.git
```

```bash
mv docker-laravel/ <directory_name>

cd <directory_name>
```

## Laravelインストール

先にホスト側に`src`ディレクトリを用意しておく

```bash
mkdir src
```

### docker環境構築

```bash
docker compose up -d
```

`app` サービスのコンテナ内で bash シェルを起動する

```bash
docker compose exec app bash
```

作業ディレクトリ`project`（=Laravelのインストール先）に入ったことを確認（ここではユーザー名=`docker`に設定している）

```bash
<user_name>@<container_id>:/project$ 
```

### composerでインストール

カレントディレクトリ（`.`）に指定バージョンのLaravelをインストール（バージョン指定の記法はいくつかある）

```bash
composer create-project --prefer-dist laravel/laravel=10.* .
```

```bash
composer create-project --prefer-dist laravel/laravel . "10.*"
```

```bash
composer create-project --prefer-dist laravel/laravel:^10.0 .
```

## DB接続設定

### envファイル設定

`.env`の設定

```bash
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laraveldb
DB_USERNAME=dbuser
DB_PASSWORD=secret
```

テスト用の`.env.testing`を準備

```bash
cp .env.example .env.testing
```

```bash
php artisan key:generate --env=testing
```

```bash
DB_CONNECTION=mysql
DB_HOST=testdb
DB_PORT=3306
DB_DATABASE=testdb
DB_USERNAME=dbuser
DB_PASSWORD=secret
```

## DB接続確認

### Tinkerを起動

```bash
php artisan tinker
```

テスト用DB確認の場合は

```php
php artisan tinker --env=testing
```

### DB接続確認コマンド

```php
DB::select('select 1');
```

または

```php
DB::connection()->getPdo();
```

## storageの権限変更

`storage`ディレクトリに対して、全ユーザーにread, write, executeの全権限を与える

```bash
chmod 777 storage -R
```

## Tips

### よく使うdockerコマンド

Start:

```bash
docker compose up -d
```

Start with Build:

```bash
docker compose up -d --build
```

Execute bash in the app container:

```bash
docker compose exec app bash
```

Execute bash in the db container:

```bash
docker compose exec db bash
```

Stop and Remove All Services:

```bash
docker compose down
```

### Viteを使う場合

Docker環境内でViteを利用し、ホットリロード機能を有効にするため、`vite.config.js` に次の設定を追加する。

```js
server: {
    host: true,
    hmr: {
        host: 'localhost',
    },
},
```
