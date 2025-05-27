"use client";

import { usePrivy } from '@privy-io/react-auth';
import { useWallets } from '@privy-io/react-auth';
// Removed unused Button import
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Wallet2Icon } from 'lucide-react';

export function UserMenu() {
  const { ready, authenticated, user, logout } = usePrivy();
  const { wallets } = useWallets();
  const activeWallet = wallets?.[0]; // Get first wallet

  if (!ready || !authenticated) {
    return null;
  }

  const email = user?.email?.address;
  const walletAddress = activeWallet?.address;
  
  // Format wallet address for display (e.g., "vino...abc")
  const formattedAddress = walletAddress 
    ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` 
    : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="md:px-4 px-[10px] py-[10px] gap-2 rounded-md border-2 border-[#3246DC] text-[#3246DC] font-source-code-pro text-sm font-bold leading-[17.5px] text-center underline-offset-[from-font] no-underline-skip-ink flex items-center"
        >
          {email && <span className="hidden md:inline mr-2">{email?.split('@')[0]}</span>}
          <User className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-72 bg-white dark:bg-neutral-900 border-2 border-[#3246DC] rounded-md shadow-lg py-2 px-1 font-source-code-pro"
      >
        {email && (
          <DropdownMenuItem className="flex items-center px-3 py-2 text-sm text-[#3246DC] hover:bg-[#3246dc10]">
            <User className="mr-2 h-4 w-4" />
            <span className="truncate">{email}</span>
          </DropdownMenuItem>
        )}
        {walletAddress && (
          <DropdownMenuItem className="flex items-center px-3 py-2 text-sm text-[#3246DC] hover:bg-[#3246dc10]">
            <Wallet2Icon className="mr-2 h-4 w-4" />
            <span className="truncate font-mono">{formattedAddress}</span>
            <span className="text-xs text-neutral-500 ml-2">(Solana)</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          className="flex items-center px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer mt-2 border-t border-neutral-200 dark:border-neutral-800"
          onClick={logout}
        >
          <span className="font-source-code-pro">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
