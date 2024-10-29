import { fakeMembers, Member } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import MemberForm from './member-form';

type TMemberViewPageProps = {
  memberId: string;
};

export default async function MemberViewPage({
  memberId
}: TMemberViewPageProps) {
  let member = null;
  let pageTitle = 'Create New Member';

  if (memberId !== 'new') {
    const data = await fakeMembers.getMemberById(Number(memberId));
    member = data.member as Member;
    if (!member) {
      notFound();
    }
    pageTitle = `Edit Member`;
  }

  return <MemberForm initialData={member} pageTitle={pageTitle} />;
}
