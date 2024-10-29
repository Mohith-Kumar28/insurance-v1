'use client';

import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import {
  MEMBER_OPTIONS,
  useMemberTableFilters
} from './use-member-table-filters';

export default function MemberTableAction() {
  const {
    categoriesFilter,
    setCategoriesFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useMemberTableFilters();
  return (
    <div className="flex flex-wrap items-center gap-4">
      <DataTableSearch
        searchKey="name"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      <DataTableFilterBox
        filterKey="members"
        title="Members"
        options={MEMBER_OPTIONS}
        setFilterValue={setCategoriesFilter}
        filterValue={categoriesFilter}
      />
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
