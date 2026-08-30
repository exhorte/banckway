'use client'

import { useCallback, useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();

  const [token, setToken] = useState('');

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);

      setToken(data?.linkToken);
    }

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token) => {
    if (!public_token) return;

    await exchangePublicToken({
      publicToken: public_token,
      user,
    })

    router.push('/');
  }, [user, router])

  const config: PlaidLinkOptions = {
    token,
    onSuccess
  }

  const { open, ready } = usePlaidLink(config);

  if (variant === 'primary') {
    return (
      <Button onClick={() => open()} disabled={!ready} className="plaidlink-primary">
        Connect a bank account
      </Button>
    )
  }

  if (variant === 'ghost') {
    return (
      <button type="button" onClick={() => open()} className="plaidlink-ghost">
        <Plus className="size-[18px] shrink-0 opacity-55" />
        <span>Add account</span>
      </button>
    )
  }

  return (
    <button type="button" onClick={() => open()} className="plaidlink-default">
      <Plus className="size-[18px] shrink-0 opacity-55" />
      <span>Add account</span>
    </button>
  )
}

export default PlaidLink
