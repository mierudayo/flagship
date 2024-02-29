# 環境構築

開発環境(2024.02時点):

- Docker: `24.0.2`
- Docker Compose: `2.18.1`
- PHP: `8.2.11`
- MySQL: `5.7.43`
- nginx: `1.23.4`
- Composer: `2.6.5`
- Laravel: `10.28.0`

## インストール手順

GitHubからプロジェクトをクローン

```bash
git clone git@github.com:rk-techs/flagship.git
```

プロジェクトへ移動

```bash
# 必要に応じてプロジェクト名をリネーム
mv flagship/ projectName

# プロジェクトへ移動
cd projectName
```

### Docker環境準備

docker環境をスタート

```bash
docker compose up -d
```

`app`サービスのコンテナ内で bashシェルを起動する

```bash
docker compose exec app bash
```

作業ディレクトリ`project`（=Laravelのインストール先）に入ったことを確認（ここではユーザー名=`docker`に設定している）

```bash
<user_name>@<container_id>:/project$ 
```

### Laravel準備

必要なパッケージをインストール

```bash
composer install 
```

`.env`ファイルを用意

```bash
cp .env.example .env
```

viエディタで開いて（`vi .env`）、以下DB設定を記述

```bash
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laraveldb
DB_USERNAME=dbuser
DB_PASSWORD=secret
```

DBに正しく接続できているか確認

```bash
$ php artisan tinker

> DB::select('select 1');
= [
    {#6462
      +"1": 1,
    },
  ]
```

テーブルとダミーデータを用意

```bash
php artisan migrate --seed
```

APP KEYを準備

```bash
php artisan key:generate
```

npmでパッケージをインストール

```bash
npm install
```

npmコマンドでViteを起動

```bash
npm run dev
```

ブラウザでアクセス、ログイン画面が表示されれば成功。

[http://localhost:8000](http://localhost:8000)

ログイン情報：

- メールアドレス: `system-admin@example.com`
- パスワード: `testpass`
