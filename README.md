## Express+Reactの開発環境のテンプレート
環境構築したよ

## スクリプト
### `yarn server`
Expressサーバーを起動するよ<br>
`nodemon`を使ってサーバーサイドの変更を検知して自動で再起動するようになってるよ

### `yarn watch`
フロントのHMRを開始するよ

### `yarn build_client`
`webpack`でフロントをビルドするよ

### `yarn build_server`
`tsc`でバックエンドをビルドするよ

### `yarn build`
バック、フロント両方ビルドするよ

### `yarn production`
ビルド後のサーバーを開始するよ

### `yarn create_entity [Entityの名前]`
引数で指定した名前のTypeORMのEntityを作成するよ

### `yarn generate_migration [マイグレーションファイルの名前]`
マイグレーションを作成するよ

### `yarn migrate_dev`
開発環境でマイグレーションするよ

###  `yarn migrate`
本番環境でマイグレーションするよ<br>
サーバーサイドのビルドをお忘れなく

## .envについて
DB情報を記述する`.env`ファイルがプロジェクト直下に必要だよ。別で用意してね

こんな感じ。値は適宜変えようね
```env
ENVIRONMENT="development"
SERVER_PORT=8080
PG_USERNAME="db_username"
PG_PASSWORD="db_password"
DB_NAME="db_name"
```
