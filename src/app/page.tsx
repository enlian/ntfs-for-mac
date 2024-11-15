import NewsList from './components/NewsList';
import Pagination from './components/Pagination';

type NewsArticle = {
  title: string;
  url: string;
  description: string;
};

export default async function Home() {
  const res = await fetch(`http://localhost:3000/api/news?category=general&page=1`, { cache: 'no-store' });
  const data = await res.json();
  const news: NewsArticle[] = data.articles;

  return (
    <main>
      <h1>Latest News</h1>
      <NewsList news={news} />
      {/* 把分页逻辑交给客户端组件处理 */}
      <Pagination initialPage={1} />
    </main>
  );
}
