type NewsListProps = {
    news: {
      title: string;
      url: string;
      description: string;
    }[];
  };
  
  export default function NewsList({ news }: NewsListProps) {
    if (!news || news.length === 0) return <p>No news available</p>;
  
    return (
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </a>
          </li>
        ))}
      </ul>
    );
  }
  