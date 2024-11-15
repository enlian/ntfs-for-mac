# ニュースアグリゲーションアプリ

## 概要
ニュースアグリゲーションアプリは、複数のニュースソースから記事を集約し、キーワードで検索したり、ページネーションで記事を効率的に閲覧することができるウェブアプリケーションです。

このアプリでは、以下の機能を提供しています：
- ニュースの検索（キーワードを使用）
- ニュース記事のページネーション表示
- 各ニュース記事の概要とリンクを提供

---

## 技術スタック
このプロジェクトでは、以下の技術を使用しています：
- **Next.js** (App Router を利用)
- **TypeScript** (型安全なコードベース)
- **Tailwind CSS** (スタイリング)
- **API通信** (ニュースデータを取得するための REST API)
- **環境変数管理** (開発・本番環境での URL を分離)

---

## 主なディレクトリ構成
```
.
├── app/
│   ├── search/[keyword]/[page]/page.tsx  # 検索結果の動的ルートページ
│   ├── eth/page.tsx                     # 特定のカテゴリ用の固定ページ
├── components/
│   ├── NewsList.tsx                     # ニュースリスト表示用コンポーネント
│   ├── Pagination.tsx                   # ページネーションコンポーネント
├── pages/api/news.ts                    # ニュースデータ取得用のAPIルート
├── public/                              # 静的アセット
├── styles/                              # Tailwind CSS 設定
├── .env                                 # 環境変数（非公開）
```

---

## 機能詳細
### 1. ニュース検索
キーワードを入力すると、該当するニュース記事が表示されます。検索は、サーバーサイドで処理され、結果を効率的に取得します。

### 2. ページネーション
ニュース記事を1ページに指定された数で分割表示します。次のページや前のページに簡単に移動できます。

### 3. 動的ルーティング
検索キーワードやページ番号に基づき、動的にルートを処理します。
例:
- `http://localhost:3000/eth?page=2`
- `http://localhost:3000/search/technology/1`

---

## インストール手順

1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/your-repository/news-aggregator.git
   cd news-aggregator
   ```

2. **依存関係をインストール**
   ```bash
   npm install
   ```

3. **環境変数の設定**
   プロジェクトのルートに `.env` ファイルを作成し、以下を記述してください：
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   ```

4. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

5. **ブラウザで確認**
   ローカル開発サーバーは通常 `http://localhost:3000` で動作します。

---

## デプロイ手順
### Vercel にデプロイ
1. [Vercel](https://vercel.com/) アカウントを作成。
2. プロジェクトを Vercel に接続。
3. 環境変数を設定：
   - `NEXT_PUBLIC_API_BASE_URL` を本番環境用の URL に設定。
4. デプロイボタンをクリック。

### Docker を使用したデプロイ
1. **Dockerfile をプロジェクトに追加**
   ```dockerfile
   # ベースイメージ
   FROM node:18-alpine

   # 作業ディレクトリ
   WORKDIR /app

   # パッケージをコピー
   COPY package*.json ./

   # 依存関係をインストール
   RUN npm install

   # アプリケーションをコピー
   COPY . .

   # ビルド
   RUN npm run build

   # アプリケーションを起動
   CMD ["npm", "start"]
   ```

2. **Docker イメージをビルド**
   ```bash
   docker build -t news-aggregator .
   ```

3. **コンテナを起動**
   ```bash
   docker run -p 3000:3000 news-aggregator
   ```

4. **ブラウザで確認**
   `http://localhost:3000` でアプリケーションが利用可能。

---

## 使用方法
1. ホームページにアクセス。
2. 検索バーにキーワードを入力し、ニュースを検索。
3. ページネーションを使用して複数のニュースを閲覧。

---

## 注意点
- ニュースAPIの制限や仕様により、ニュースデータの取得に失敗する場合があります。
- `.env` ファイルを正しく設定しないと、APIのリクエストが動作しません。

---

## ライセンス
このプロジェクトは MIT ライセンスのもと提供されています。
