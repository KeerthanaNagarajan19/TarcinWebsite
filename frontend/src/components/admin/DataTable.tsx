import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type DataColumnType = 'text' | 'date' | 'boolean' | 'tags' | 'longText';

export interface DataColumn {
  key: string;
  title: string;
  type?: DataColumnType;
  width?: string;
  formatFn?: (value: any) => string | React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: DataColumn[];
  onView?: (item: any) => void;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  isLoading?: boolean;
}

export function DataTable({
  data,
  columns,
  onView,
  onEdit,
  onDelete,
  isLoading = false,
}: DataTableProps) {
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; item: any | null }>({
    open: false,
    item: null,
  });

  const formatCellValue = (item: any, column: DataColumn) => {
    const value = item[column.key];
    
    if (column.formatFn) {
      return column.formatFn(value);
    }
    
    if (value === undefined || value === null) {
      return "-";
    }
    
    switch (column.type) {
      case "date":
        try {
          return format(new Date(value), "MMM d, yyyy");
        } catch (e) {
          return value;
        }
      case "boolean":
        return value ? (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Yes
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            No
          </Badge>
        );
      case "tags":
        if (Array.isArray(value)) {
          return (
            <div className="flex flex-wrap gap-1">
              {value.map((tag, i) => (
                <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {tag}
                </Badge>
              ))}
            </div>
          );
        }
        return value;
      case "longText":
        return (
          <div className="max-w-xs truncate" title={value}>
            {value}
          </div>
        );
      default:
        return value;
    }
  };

  const handleDelete = (item: any) => {
    setDeleteDialog({ open: true, item });
  };

  const confirmDelete = () => {
    if (deleteDialog.item) {
      onDelete(deleteDialog.item);
      setDeleteDialog({ open: false, item: null });
    }
  };

  

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-spin size-8 border-4 border-blue border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading data...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="py-8 text-center border rounded-md bg-muted/10">
        <p className="text-muted-foreground">No records found</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} style={{ width: column.width }}>
                  {column.title}
                </TableHead>
              ))}
              <TableHead style={{ width: "120px" }}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id || index}>
                {columns.map((column) => (
                  <TableCell key={`${item.id || index}-${column.key}`}>
                    {formatCellValue(item, column)}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex space-x-2">
                    <TooltipProvider>
                      {onView && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onView(item)}
                              className="size-8"
                            >
                              <Eye className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View</TooltipContent>
                        </Tooltip>
                      )}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(item)}
                            className="size-8"
                          >
                            <Pencil className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(item)}
                            className="size-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
              <p>Are you sure you want to delete this item? This action cannot be undone.</p>
          </DialogHeader>
          {/* <p>Are you sure you want to delete this item? This action cannot be undone.</p> */}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false, item: null })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}