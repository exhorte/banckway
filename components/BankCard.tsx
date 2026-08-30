import Image from 'next/image'
import Link from 'next/link'

import { formatAmount } from '@/lib/utils'
import Copy from './Copy'

const BankCard = ({ account, userName, showBalance = true }: CreditCardProps) => {
  return (
    <div className="flex w-full max-w-[320px] flex-col gap-3">
      <Link
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        className="bank-card"
      >
        <Image
          src="/icons/lines.png"
          width={316}
          height={190}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10 mix-blend-overlay"
        />

        <div className="bank-card_content">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] font-medium text-white/80">
                {account.name}
              </p>
              <p className="tnum mt-1 text-[22px] font-semibold text-white">
                {formatAmount(account.currentBalance)}
              </p>
            </div>
            <Image src="/icons/Paypass.svg" width={20} height={24} alt="" aria-hidden className="brightness-0 invert" />
          </div>
        </div>

        <div className="bank-card_icon">
          <div className="flex flex-col gap-1">
            <p className="tnum text-[13px] font-medium tracking-[2px] text-white/90">
              ●●●● {account?.mask}
            </p>
            <p className="text-[11px] font-medium uppercase tracking-wide text-white/70">
              {userName}
            </p>
          </div>
          <Image src="/icons/mastercard.svg" width={40} height={28} alt="card network" />
        </div>
      </Link>

      {showBalance && account?.shareableId && <Copy title={account.shareableId} />}
    </div>
  )
}

export default BankCard
