import * as React from "react"
import { cn } from "cn"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-x-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-xs border-collapse select-text", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead 
    ref={ref} 
    className={cn(
      "border-b border-zinc-200/90 dark:border-zinc-800/80 bg-zinc-50/75 dark:bg-[#121316] text-[11px] font-medium text-zinc-500 dark:text-zinc-400 select-none", 
      className
    )} 
    {...props} 
  />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("divide-y divide-zinc-200/60 dark:divide-zinc-800/60 bg-white dark:bg-[#0c0d10]", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-zinc-200/90 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#121316] font-medium text-zinc-600 dark:text-zinc-400",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "transition-colors hover:bg-zinc-50/70 dark:hover:bg-zinc-900/50 data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800/60 h-11",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-3.5 text-left align-middle font-medium text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] whitespace-nowrap",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "px-3.5 py-2.5 align-middle text-zinc-800 dark:text-zinc-200 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-xs text-zinc-500 dark:text-zinc-400", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

/* Pill Badge Helper sesuai Screenshot referensi (misal 'Cover page', 'In Process', 'Done') */
interface TablePillProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'process' | 'warning' | 'muted';
}

const TablePill: React.FC<TablePillProps> = ({ 
  children, 
  variant = 'default', 
  className, 
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-[#16171d] dark:text-[#f4f4f5] dark:border-[#27272a]';
      case 'process':
        return 'bg-blue-50 text-blue-700 border-blue-200/80 dark:bg-[#16171d] dark:text-[#f4f4f5] dark:border-[#27272a]';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-[#16171d] dark:text-[#f4f4f5] dark:border-[#27272a]';
      case 'muted':
        return 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-[#16171d] dark:text-[#d4d4d8] dark:border-[#27272a]';
      default:
        return 'bg-zinc-50 text-zinc-700 border-zinc-200/80 dark:bg-[#16171d] dark:text-[#f4f4f5] dark:border-[#27272a]';
    }
  };

  return (
    <span
      className={cn(
        "glace-table-pill inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border",
        getVariantStyles(),
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TablePill,
}
