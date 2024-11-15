import NewsList from "./components/NewsList";
import Pagination from "./components/Pagination";

type NewsArticle = {
  title: string;
  url: string;
  description: string;
};

type HomeProps = {
  searchParams: {
    page?: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams;

  const currentPage = parseInt(page || "1", 10);
  const res = await fetch(
    `http://localhost:3000/api/news?category=general&page=${currentPage}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  const news: NewsArticle[] = data.articles;

  return (
    <main>
      <h1>Latest News</h1>
      <NewsList news={news} />
      {/* 把分页逻辑交给客户端组件处理 */}
      <Pagination initialPage={currentPage} />
    </main>
  );
}
