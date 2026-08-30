import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) return null;

  const accounts = await getAccounts({
    userId: loggedIn.$id
  })

  return (
    <div className="my-banks">
      <HeaderBox
        title="Accounts"
        subtext="Every bank account connected to Finway."
      />

      <div className="flex flex-col gap-4">
        <h2 className="header-2">Your cards</h2>
        <div className="flex flex-wrap gap-6">
          {accounts && accounts.data.map((a: Account) => (
            <BankCard
              key={a.id}
              account={a}
              userName={loggedIn?.firstName}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyBanks
