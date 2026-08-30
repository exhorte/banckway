import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { transactionCategoryStyles } from "@/constants"
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils"

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    transactionCategoryStyles[
      category as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles.default

  return (
    <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
      <span className={cn("size-1.5 rounded-full", backgroundColor)} />
      <span className={cn("font-medium", textColor)}>{category}</span>
    </div>
  )
}

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="pl-4">Transaction</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="max-md:hidden">Channel</TableHead>
          <TableHead className="pr-4 max-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t: Transaction) => {
          const status = getTransactionStatus(new Date(t.date))
          const amount = formatAmount(t.amount)
          const isDebit = t.type === "debit"
          const negative = isDebit || amount[0] === "-"
          const name = removeSpecialCharacters(t.name)

          return (
            <TableRow key={t.id}>
              <TableCell className="max-w-[280px] pl-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold uppercase text-muted-foreground">
                    {name?.[0] ?? "?"}
                  </span>
                  <span className="truncate font-medium text-foreground">
                    {name}
                  </span>
                </div>
              </TableCell>

              <TableCell
                className={cn(
                  "tnum text-right font-semibold",
                  negative ? "text-destructive" : "text-brand-600"
                )}
              >
                {negative ? `-${amount.replace("-", "")}` : amount}
              </TableCell>

              <TableCell>
                <CategoryBadge category={status} />
              </TableCell>

              <TableCell className="whitespace-nowrap text-muted-foreground">
                {formatDateTime(new Date(t.date)).dateTime}
              </TableCell>

              <TableCell className="capitalize text-muted-foreground max-md:hidden">
                {t.paymentChannel}
              </TableCell>

              <TableCell className="pr-4 max-md:hidden">
                <CategoryBadge category={t.category} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default TransactionsTable
