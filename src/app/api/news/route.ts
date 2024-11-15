import { NextResponse } from 'next/server';

type NewsAPIResponse = {
  articles: {
    title: string;
    url: string;
    description: string;
  }[];
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || 'general';
  const page = searchParams.get('page') || '1';

  const apiKey = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?&category=${category}&pageSize=10&page=${page}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data: NewsAPIResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news data' }, { status: 500 });
  }
}
