"use client";

import { usePrivy, useLogin } from '@privy-io/react-auth';
import { Wallet2Icon } from 'lucide-react';

export function LoginButton() {
  const { login } = useLogin();
  const { ready, authenticated } = usePrivy();

  if (!ready) {
    return (
      <button
      disabled
      className="md:px-4 px-[10px] py-[10px] gap-2 rounded-md border-2 border-[#3246DC] text-[#3246DC] font-source-code-pro text-sm font-bold leading-[17.5px] text-center underline-offset-[from-font] no-underline-skip-ink"
    >
      <span className="hidden md:inline"> Loading...</span>
      <span className="md:hidden">
        <Wallet2Icon size={12} />
      </span>
    </button>
    );
  }

  if (authenticated) {
    return null;
  }

  return (

    <button
    onClick={login}
    className="md:px-4 px-[10px] py-[10px] gap-2 rounded-md border-2 border-[#3246DC] text-[#3246DC] font-source-code-pro text-sm font-bold leading-[17.5px] text-center underline-offset-[from-font] no-underline-skip-ink"
  >
    <span className="hidden md:inline">Sign In</span>
    <span className="md:hidden">
      <Wallet2Icon size={12} />
    </span>
  </button>
  );
}
