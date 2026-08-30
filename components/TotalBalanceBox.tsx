import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';

const TotalBalanceBox = ({
  accounts = [], totalBanks, totalCurrentBalance
}: TotalBalanceBoxProps) => {
  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="total-balance-label">Total balance</p>
          <div className="total-balance-amount">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>

        <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
          <span className="inline-flex size-1.5 rounded-full bg-primary" />
          {totalBanks} linked {totalBanks === 1 ? "account" : "accounts"}
        </div>
      </div>
    </section>
  )
}

export default TotalBalanceBox
