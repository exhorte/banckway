import BankCard from './BankCard'
import Category from './Category'
import PlaidLink from './PlaidLink'
import { countTransactionCategories } from '@/lib/utils'

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
  const categories: CategoryCount[] = countTransactionCategories(transactions);
  const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <aside className="right-sidebar">
      <div className="profile">
        <div className="profile-img">{initials || user.firstName?.[0]}</div>
        <div className="flex flex-col">
          <h2 className="profile-name">
            {user.firstName} {user.lastName}
          </h2>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      <div className="banks">
        <h2 className="header-2">Accounts</h2>

        {banks?.length > 0 && (
          <div className="flex flex-col items-center gap-6 pb-2 pt-1">
            <BankCard
              key={banks[0].$id}
              account={banks[0]}
              userName={`${user.firstName} ${user.lastName}`}
              showBalance={false}
            />
            {banks[1] && (
              <div className="w-[92%] opacity-90">
                <BankCard
                  key={banks[1].$id}
                  account={banks[1]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}

        <PlaidLink user={user} variant="ghost" />
      </div>

      {categories.length > 0 && (
        <div className="flex flex-col gap-4 border-t border-border p-6">
          <h2 className="header-2">Top categories</h2>
          <div className="flex flex-col gap-4">
            {categories.map((category) => (
              <Category key={category.name} category={category} />
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}

export default RightSidebar
