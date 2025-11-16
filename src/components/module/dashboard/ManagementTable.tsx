

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';
import React from "react";

export interface IColumn<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface IManagementTableProps<T> {
  data: T[];
  columns: IColumn<T>[];
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  getRowKey: (row: T) => string;
  emptyMessage?: string;
  isRefreshing?: boolean;
}

function ManagementTable<T>({
  data = [],
  columns = [],
  onView,
  onEdit,
  onDelete,
  getRowKey,
  emptyMessage = "No records found.",
  isRefreshing = false,
}: IManagementTableProps<T>) {


  const hasActions = onView || onEdit || onDelete;
  return (
    <div className="w-full overflow-x-auto border rounded-md">
      {isRefreshing && (
        <div>
          <h2>Loading</h2>
        </div>
      )}

      <Table>

        <TableHeader>
          <TableRow>
            {columns.map((column, colIdx) => (
              <TableHead key={colIdx}>
                {column.header}
              </TableHead>
            ))}
            {hasActions && <TableHead>
              Actions
            </TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            data.length === 0 ? (
              <TableCell colSpan={columns.length + (hasActions ? 1 : 0)}>
                {emptyMessage}

              </TableCell>
            ) : (

              data?.map((item) => (
                <TableRow key={getRowKey(item)}>
                  {columns.map((col, idx) => (
                    <TableCell key={idx} className={col.className}>
                      {typeof col.accessor === "function"
                        ? col.accessor(item)
                        : String(item[col.accessor])}
                    </TableCell>
                  ))}
                  {hasActions && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {onView && (
                            <DropdownMenuItem onClick={() => onView(item)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                          )}
                          {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(item)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          {onDelete && (
                            <DropdownMenuItem
                              onClick={() => onDelete(item)}
                              className="text-destructive"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>

              )))

          }
        </TableBody>
      </Table>
    </div>
  );
}

export default ManagementTable;
