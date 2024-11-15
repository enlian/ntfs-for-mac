import NewsList from "../components/NewsList";
import Pagination from "../components/Pagination";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type NewsArticle = {
  title: string;
  url: string;
  description: string;
};

type PageProps = {
  params: {
    keyword: string;
  };
  searchParams: {
    page?: string; 
  };
};

export default async function SearchResultPage({
  params,
  searchParams,
}: PageProps) {
  const { keyword } = await params;
  const { page } = await searchParams;

  const currentPage = parseInt(page || "1", 10);
  const res = await fetch(
    `${apiBaseUrl}/api/news?q=${keyword}&page=${currentPage}`,
    { cache: "no-store" }
  );
  const data = await res.json();

  const news: NewsArticle[] = data.articles;

  return (
    <main>
      <h1>关于{keyword}的新闻</h1>
      <NewsList news={news} />
      <Pagination initialPage={currentPage} keyword={keyword} />
    </main>
  );
}
