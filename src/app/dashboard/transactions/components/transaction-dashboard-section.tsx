'use client';

import { useState } from 'react';
import { TransactionStats } from './transaction-stats';
import { TransactionFilters } from './transaction-filters';
import { TransactionTable } from './transaction-table';
import { TransactionPagination } from './transaction-pagination';
import { useTransactions } from '@/app/hooks/use-transactions';
// import TransactionTable from '../../home_dashboard/TransactionTable';

type SortConfig = {
  key: string | null;
  direction: 'asc' | 'desc';
};

export function TransactionDashboardSection() {
  const [filters, setFilters] = useState({
    dao: 'all',
    project: 'all',
    action: 'all',
    dateRange: null,
    status: 'all',
    search: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc',
  });

  const { transactions, stats, isLoading, isInitialLoading, error } =
    useTransactions(filters, currentPage, sortConfig);

  // const handleSortChange = (config: SortConfig) => {
  //   setSortConfig(config);
  // };

  return (
    <div className="min-h-screen  text-white">
      <div className=" mx-auto p-4 md:p-6 space-y-6 overflow-hidden">
        <TransactionStats stats={stats} loading={isInitialLoading} />
        <TransactionFilters filters={filters} onFiltersChange={setFilters} />

        <TransactionTable
          transactions={transactions}
          loading={isInitialLoading}
          isProcessing={isLoading && !isInitialLoading}
          error={error}
          // sortConfig={sortConfig}
          // onSort={handleSortChange}
        />
        <TransactionPagination
          currentPage={currentPage}
          totalPages={Math.ceil((stats?.total || 0) / 10)}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
