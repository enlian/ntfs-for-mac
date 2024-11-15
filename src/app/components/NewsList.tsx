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
      <div>
        {news.map((article, index) => (
          <div key={index}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    );
  }
  