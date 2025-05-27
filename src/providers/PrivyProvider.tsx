"use client";

import { PrivyProvider as BasePrivyProvider } from '@privy-io/react-auth';
import { ReactNode } from 'react';

// TODO: Replace with your actual Privy app ID from the Privy dashboard
const PRIVY_APP_ID = "cmb550gcu00fikz0nvgrq16fi";

export function PrivyProvider({ children }: { children: ReactNode }) {
  return (
    <BasePrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        appearance: {
          accentColor: '#3246DC',
          showWalletLoginFirst: false,
          theme: 'dark'
        },
        loginMethods: ['email', 'google', 'wallet'],
        // Configure embedded wallets - Solana only
        embeddedWallets: {
          solana: {
            createOnLogin: 'users-without-wallets'
          }
        },
      }}
    >
      {children}
    </BasePrivyProvider>
  );
}
