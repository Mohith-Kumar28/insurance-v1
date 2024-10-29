import { fakeMembers, Member } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as MemberTable } from '@/components/ui/table/data-table';
import { columns } from './member-tables/columns';

type MemberListingPage = {};

export default async function MemberListingPage({}: MemberListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const data = await fakeMembers.getMembers(filters);
  const totalMembers = data.total_members;
  const members: Member[] = data.members;

  return (
    <MemberTable columns={columns} data={members} totalItems={totalMembers} />
  );
}
