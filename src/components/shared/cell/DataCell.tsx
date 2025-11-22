"use client";

import { formatDateTime } from '@/lib/formattes';
interface DateCellProps {
  date?: string | Date;
}

export function DateCell({ date }: DateCellProps) {
  return <span className="text-sm">{formatDateTime(date!)}</span>;
}