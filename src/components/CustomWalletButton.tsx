import { useState, useRef, useCallback, useEffect } from "react";
import { usePrivy,  useSolanaWallets } from '@privy-io/react-auth';
import { User, Wallet2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

const CustomWalletButton = () => {
  const router = useRouter();
  const { authenticated, login, logout } = usePrivy();
  const { wallets } = useSolanaWallets();
  const activeWallet = wallets?.[0];
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleConnect = () => {
    login();
  };

  const formatAddress = (address: string | undefined) => {
    if (!address) return "Sign In";
    const start = address.slice(0, 4);
    const end = address.slice(-4);
    return `${start}...${end}`;
  };

  if (!authenticated) {
    return (
      <button
        onClick={handleConnect}
        className="md:px-4 px-[10px] py-[10px] gap-2 rounded-md border-2 border-[#3246DC] text-[#3246DC] font-source-code-pro text-sm font-bold leading-[17.5px] text-center underline-offset-[from-font] no-underline-skip-ink"
      >
        <span className="hidden md:inline">Connect</span>
        <span className="md:hidden">
          <Wallet2Icon size={12} />
        </span>
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center rounded font-medium md:px-4 px-[10px] py-[10px] border-2 border-[#638BEF] bg-[#3246DC] text-[#111111] font-source-code-pro text-[14px] leading-[17.5px]"
      >
        <span className="hidden md:flex items-center gap-2">
          <Wallet2Icon className="h-4 w-4" />
          {formatAddress(activeWallet?.address)}
        </span>
        <span className="md:hidden">
          <User className="h-4 w-4 text-[#111111]" />
        </span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 rounded bg-[#111111] py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          <button
            onClick={() => {
              router.push(`/space/podcast/${activeWallet?.address}`);
              setShowDropdown(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm text-[#3246DC] hover:bg-gray-100 dark:text-[#3246DC] font-source-code-pro font-bold dark:hover:bg-[#3246dc28]"
          >
            My Podcasts
          </button>
          {/* <button
            onClick={() => {
              navigator.clipboard.writeText(activeWallet?.address || "");
              setShowDropdown(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm text-[#3246DC] hover:bg-gray-100 dark:text-[#3246DC] font-source-code-pro font-bold dark:hover:bg-[#3246dc28]"
          >
            Copy Address
          </button> */}
          <button
            onClick={() => {
              logout();
              setShowDropdown(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm text-[#3246DC] hover:bg-gray-100 dark:text-[#3246DC] font-source-code-pro font-bold dark:hover:bg-[#3246dc28]"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomWalletButton;
