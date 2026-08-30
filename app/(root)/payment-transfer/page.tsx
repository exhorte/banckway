import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) return null;

  const accounts = await getAccounts({
    userId: loggedIn.$id
  })

  if (!accounts) return;

  const accountsData = accounts?.data;

  return (
    <div className="payment-transfer">
      <HeaderBox
        title="Send money"
        subtext="Move funds between your accounts or send to someone on Finway."
      />

      <PaymentTransferForm accounts={accountsData} />
    </div>
  )
}

export default Transfer
