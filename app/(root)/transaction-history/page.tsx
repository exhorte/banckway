import HeaderBox from '@/components/HeaderBox'
import { Pagination } from '@/components/Pagination';
import TransactionsTable from '@/components/TransactionsTable';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';

const TransactionHistory = async ({ searchParams }: SearchParamProps) => {
  const { id, page } = await searchParams;
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) return null;

  const accounts = await getAccounts({
    userId: loggedIn.$id
  })

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId })

  const rowsPerPage = 10;
  const totalPages = Math.ceil((account?.transactions.length ?? 0) / rowsPerPage);

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = account?.transactions.slice(
    indexOfFirstTransaction, indexOfLastTransaction
  )

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transactions"
          subtext="Every payment, transfer and fee across this account."
        />
      </div>

      <div className="flex flex-col gap-5">
        <div className="transactions-account">
          <div className="flex flex-col gap-1">
            <h2 className="text-[15px] font-semibold text-foreground">
              {account?.data.name}
            </h2>
            <p className="text-[13px] text-muted-foreground">
              {account?.data.officialName}
            </p>
            <p className="tnum text-[13px] font-medium tracking-[1.5px] text-muted-foreground">
              ●●●● {account?.data.mask}
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-[12px] font-medium text-muted-foreground">
              Current balance
            </p>
            <p className="tnum text-[20px] font-semibold text-foreground">
              {formatAmount(account?.data.currentBalance)}
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-4">
          <div className="surface overflow-hidden">
            <TransactionsTable transactions={currentTransactions ?? []} />
          </div>
          {totalPages > 1 && (
            <Pagination totalPages={totalPages} page={currentPage} />
          )}
        </section>
      </div>
    </div>
  )
}

export default TransactionHistory
