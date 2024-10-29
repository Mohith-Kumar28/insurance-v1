'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import Image from 'next/image';
import { Member } from '@/constants/mock-api';

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: 'photo_url',
    header: 'IMAGE',
    cell: ({ row }) => {
      return (
        <div className="relative aspect-square">
          <Image
            src={row.getValue('photo_url')}
            alt={row.getValue('name')}
            fill
            className="rounded-lg"
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'mobile_number',
    header: 'MOBILE NUMBER'
  },
  {
    accessorKey: 'agent_code',
    header: 'AGENT CODE'
  },
  {
    accessorKey: 'zone',
    header: 'ZONE'
  },
  {
    accessorKey: 'division',
    header: 'DIVISION'
  },
  {
    accessorKey: 'branch',
    header: 'BRANCH'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
