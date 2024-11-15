'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type PaginationProps = {
  initialPage: number;
  keyword:string
};

export default function Pagination({ initialPage,keyword }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const router = useRouter();

  useEffect(() => {
    // 读取 URL 查询参数，更新当前页码
    const searchParams = new URLSearchParams(window.location.search);
    const page = parseInt(searchParams.get('page') || '1', 10);
    setCurrentPage(page);
  }, []);

  const handlePageChange = (page: number) => {
    // 更新 URL 并刷新页面
    router.push(`/${keyword}?page=${page}`);
    setCurrentPage(page);
  };

  return (
    <div>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
        上一页
      </button>
      <button onClick={() => handlePageChange(currentPage + 1)}>下一页</button>
    </div>
  );
}
