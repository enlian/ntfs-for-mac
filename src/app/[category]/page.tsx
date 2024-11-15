import NewsList from '../components/NewsList';

type NewsArticle = {
  title: string;
  url: string;
  description: string;
};

type CategoryPageProps = {
  params: {
    category: string;
  };
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const res = await fetch(`http://localhost:3000/api/news?category=${category}`, { cache: 'no-store' });
  const data = await res.json();

  const news: NewsArticle[] = data.articles;

  return (
    <main>
      <h1>News in {category}</h1>
      <NewsList news={news} />
    </main>
  );
}
