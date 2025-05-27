"use client";
import React, { useState, useRef, useEffect } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { usePrivy, useWallets } from '@privy-io/react-auth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  Mic,
  Loader2,
  ChevronDown,
  Wallet as WalletIcon,
  X,
  Plus,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";

const CONFIG_URL = "https://api.gasguard.xyz/mediaai/api/config";

interface AddCustomValueProps {
  onAdd: (value: string) => void;
  placeholder: string;
}

const AddCustomValue = ({
  onAdd,
  placeholder,
}: AddCustomValueProps) => {
  // No Privy functionality needed in AddCustomValue component
  const [isAdding, setIsAdding] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdding) {
      inputRef.current?.focus();
    }
  }, [isAdding]);

  const handleAdd = () => {
    if (value.trim()) {
      onAdd(value.trim());
      setValue("");
      setIsAdding(false);
    }
  };

  return isAdding ? (
    <div className="flex items-center gap-2">
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded !border !border-[#3246DC] px-3 py-2  text-[#638BEF] bg-[#111111] font-source-code-pro text-xs md:text-base 2xl:text-sm font-medium !leading-[15px] text-left placeholder:text-[#3246DC]"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd();
          if (e.key === "Escape") setIsAdding(false);
        }}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setIsAdding(false)}
        className="dark:text-gray-300 dark:hover:bg-gray-700"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <Badge
      variant="outline"
      className="px-[11px] py-[10.5px] rounded font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px]  cursor-pointer text-[#3246DC] dark:text-[#3246DC] border border-[#3246DC] dark:border-[#3246DC]"
      onClick={() => setIsAdding(true)}
    >
      <Plus className="mr-1 h-3 w-3" /> Add Custom
    </Badge>
  );
};

const CustomPodcast = () => {
  const { login } = usePrivy();
  const { authenticated, ready } = usePrivy();
  const { wallets } = useWallets();
  const activeWallet = wallets?.[0]; // Get first wallet
  const connected = authenticated && ready && !!activeWallet;
  const [accordionState, setAccordionState] = useState<any>({
    podcastSettings: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [podcastData, setPodcastData] = useState<any>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [transactionPending, setTransactionPending] = useState(false);

  const router = useRouter();

  // Badge selection states
  const [conversationStyles, setConversationStyles] = useState([
    "Engaging",
    "Very-slow-paced",
    "Enthusiastic",
    "Educational",
    "Casual",
    "Professional",
    "Friendly",
  ]);

  const [dialogueStructureOptions] = useState([
    {
      id: "structure1",
      items: ["Introduction", "Main Content", "Conclusion"],
    },
    {
      id: "structure2",
      items: [
        "Topic Introduction",
        "Summary",
        "Discussions",
        "Q&A",
        "Farewell",
      ],
    },
  ]);
  const [selectedStructureId, setSelectedStructureId] = useState("structure2");

  const [languages] = useState([
    "English",
    "Japanese",
    "Chinese",
    "German",
    "Korean",
    "Arabic",
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const initialStyleSelections = [
    "Engaging",
    "Very-slow-paced",
    "Enthusiastic",
  ];
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    initialStyleSelections
  );


  const [config, setConfig] = useState({
    mini_sol_payment: 0.01,
    receiver_address: "HXDc4k1L9F9TFUEzqc9W8PgCo9cgN7L2QNYqPdjJ36gd", // default value
  });
  const [configLoading, setConfigLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);

  // Fetch config on component mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setConfigLoading(true);
        const response = await fetch(CONFIG_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch configuration");
        }
        const data = await response.json();
        setConfig({
          mini_sol_payment: data.mini_sol_payment,
          receiver_address: data.receiver_address,
        });
      } catch (err: any) {
        setConfigError(err.message);
        console.error("Error fetching config:", err);
      } finally {
        setConfigLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!authenticated) {
      try {
        await login();
      } catch (error) {
        console.error('Login failed:', error);
      }
    } else {
      // Find the closest form and submit it
      const form = (e.target as HTMLElement).closest('form');
      if (form) form.requestSubmit();
    }
  };

  const initialFormState = {
    text_input: "",
    urls_input: "",
    word_count: 1500,
    roles_person1: "tech expert and main speaker",
    roles_person2: "curious interviewer and clarifier",
    podcast_name: "The Synthetic Minds, AI Podcast",
    podcast_tagline: "Exploring the Future of Technology",
    creativity_level: 0.9,
    user_instructions: "",
    output_language: "English",
  };

  const [formData, setFormData] = useState(initialFormState);

  const MAX_STYLE_SELECTIONS = 3;

  const toggleStyleSelection = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((i) => i !== style));
    } else if (selectedStyles.length < MAX_STYLE_SELECTIONS) {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const validateForm = () => {
    const errors: {
      podcast_name?: string;
      podcast_tagline?: string;
      content?: string;
    } = {};
    let isValid = true;

    // Validate Podcast Name
    if (!formData.podcast_name.trim()) {
      errors.podcast_name = "Podcast Name is required";
      isValid = false;
    }

    // Validate Podcast Tagline
    if (!formData.podcast_tagline.trim()) {
      errors.podcast_tagline = "Podcast Tagline is required";
      isValid = false;
    }

    // Validate Content (either Text Input or URLs)
    if (!formData.text_input.trim() && !formData.urls_input.trim()) {
      errors.content = "Either Text Input or URLs is required";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev: any) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Clear content error when either text or URLs is entered
    if (
      (name === "text_input" || name === "urls_input") &&
      fieldErrors.content
    ) {
      setFieldErrors((prev: any) => ({
        ...prev,
        content: undefined,
      }));
    }
  };

  const _sendSolPayment = async () => {
    if (!connected || !activeWallet) return;

    try {
      setTransactionPending(true);
      // Use Privy's embedded wallet to send SOL
      const result = await fetch('/api/solana/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: activeWallet.address,
          amount: config.mini_sol_payment * LAMPORTS_PER_SOL,
          recipient: config.receiver_address
        })
      });
      const data = await result.json();
      return data.signature;
    } catch (error) {
      console.error("Error sending payment:", error);
      throw error;
    } finally {
      setTransactionPending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!connected) {
      setError("Please wait for your wallet to be ready.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setPodcastData(null);

    try {
      // const transactionHash = await sendSolPayment()

      // Use the proxy endpoint instead of directly calling the API
      const response = await fetch("/api/proxy/generate-podcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          conversation_style: selectedStyles.join(","),
          dialogue_structure: dialogueStructureOptions
            .find((structure) => structure.id === selectedStructureId)
            ?.items.join(","),
          transaction_hash: activeWallet?.address,
          output_language: selectedLanguage,
        }),
      });

      if (response.status !== 200 && response.status !== 202) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      setPodcastData(data);
      setIsStatusModalOpen(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Render field error message
  const FieldError = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <div className="mt-1 flex items-center gap-1 text-sm text-red-500">
        <AlertCircle className="h-4 w-4" />
        <span>{message}</span>
      </div>
    );
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setSelectedStyles(initialStyleSelections);
    setSelectedLanguage("English");
    setSelectedStructureId("structure2");
    setFieldErrors({});
    setError(null);
  };

  const toggleAccordion = (section: any) => {
    setAccordionState((prev: any) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (configLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] relative mx-auto md:pt-[133px] pt-[130px] md:px-8 px-4 xl:px-[100px] space-y-10">
      <div className="relative">
        <motion.button
          onClick={() => router.back()}
          className="flex items-center gap-3 group relative z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/icons/BackIcon.svg"
            alt="Back"
            width={7}
            height={12}
            className="transform group-hover:translate-x-[-2px] transition-transform"
          />
          <span className="font-source-code-pro text-sm font-medium leading-[17.5px] text-[#638BEF]">
            Back
          </span>
        </motion.button>
      </div>

      <div className=" space-y-6">
        <div className="mb-7 flex items-center justify-between">
          <h1 className="font-druk text-[36px] md:text-[60px] font-medium leading-[45px] md:leading-[60px] text-left  decoration-skip-ink-none uppercase text-[#3246DC] mix-blend-color-dodge">
            Custom Podcast Generator
          </h1>
        </div>

        {fieldErrors.content && (
          <Alert
            variant="destructive"
            className="flex items-center dark:bg-red-900/50 dark:text-red-200"
          >
            <div>
              <AlertCircle className="mr-2 h-4 w-4" />
            </div>
            <AlertDescription className="font-bold">
              {fieldErrors.content}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-none rounded bg-[#111111]  dark:bg-[#111111]">
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                <h3 className="font-source-code-pro text-base md:text-xl font-bold text-[#3246DC] leading-6 text-left decoration-skip-ink-none">
                  Podcast Identity
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label className="font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px] text-left text-[#638BEF]">
                      Podcast Name *
                    </Label>
                    <Input
                      type="text"
                      name="podcast_name"
                      value={formData.podcast_name}
                      onChange={handleInputChange}
                      className={`w-full rounded !border !border-[#3246DC] px-3 py-2  text-[#638BEF] bg-[#111111] font-source-code-pro text-xs md:text-base 2xl:text-sm font-medium !leading-[15px] text-left placeholder:text-[#3246DC] ${
                        fieldErrors.podcast_name
                          ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                          : ""
                      }`}
                    />
                    <FieldError message={fieldErrors.podcast_name} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px] text-left text-[#638BEF]">
                      Podcast Tagline *
                    </Label>
                    <Input
                      type="text"
                      name="podcast_tagline"
                      value={formData.podcast_tagline}
                      onChange={handleInputChange}
                      className={`w-full rounded !border !border-[#3246DC] px-3 py-2  text-[#638BEF] bg-[#111111] font-source-code-pro text-xs md:text-base 2xl:text-sm font-medium !leading-[15px] text-left placeholder:text-[#3246DC] ${
                        fieldErrors.podcast_tagline
                          ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                          : ""
                      }`}
                    />
                    <FieldError message={fieldErrors.podcast_tagline} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label className="font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px] text-left text-[#638BEF]">
                    Text Input *
                  </Label>
                  <textarea
                    name="text_input"
                    value={formData.text_input}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full rounded h-[140px] !border !border-[#3246DC] px-3 py-2  text-[#638BEF] bg-[#111111] font-source-code-pro text-xs md:text-base 2xl:text-sm font-medium !leading-[15px] text-left placeholder:text-[#3246DC] ${
                    // className={`w-full rounded h-[140px] !border !border-[#3246DC] px-3 py-2  text-[#638BEF] bg-[#111111] font-source-code-pro text-xs md:text-base 2xl:text-sm font-medium !leading-[15px] text-left placeholder:text-[#3246DC] ${
                      fieldErrors.content && !formData.urls_input
                        ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                        : ""
                    }`}
                    placeholder="Enter or paste text here..."
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px] text-left text-[#638BEF]">
                    URLs *
                  </Label>
                  <textarea
                    name="urls_input"
                    value={formData.urls_input}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full rounded !border h-[140px] !border-[#3246DC] px-3 py-2  text-[#638BEF] bg-[#111111] font-source-code-pro text-xs md:text-base 2xl:text-sm font-medium !leading-[15px] text-left placeholder:text-[#3246DC] ${
                      fieldErrors.content && !formData.text_input
                        ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                        : ""
                    }`}
                    placeholder="Enter URLs (one per line) - supports websites and YouTube videos"
                  />
                  <p className="font-source-code-pro text-xs md:text-base 2xl:text-sm font-medium leading-[15px] text-left text-[#3246DC]">
                    * Either Text Input or URLs is required
                  </p>
                </div>

                <div className="w-full space-y-2">
                  <Label className="font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px] text-left text-[#638BEF]">
                    Language *
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <Badge
                        key={lang}
                        variant={
                          selectedLanguage === lang ? "default" : "outline"
                        }
                        className={`px-[11px] py-[10.5px] rounded font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px]  cursor-pointer ${
                          selectedLanguage === lang
                            ? "text-[#111111] dark:bg-[#3246DC] bg-[#3246DC]"
                            : "text-[#3246DC] dark:text-[#3246DC] border border-[#3246DC] dark:border-[#3246DC]"
                        }`}
                        onClick={() => setSelectedLanguage(lang)}
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div
              onClick={() => toggleAccordion("podcastSettings")}
              className="border flex justify-between px-4 py-3 border-neutral-200 text-neutral-950 shadow dark:border-gray-700 dark:text-neutral-50 border-none rounded bg-[#111111] dark:bg-[#111111]"
            >
              <h2 className="font-source-code-pro text-base font-bold text-[#3246DC] leading-6 text-left decoration-skip-ink-none">
                Podcast Settings
              </h2>
              <ChevronDown
                className={`h-5 w-5 transition-transform dark:text-gray-400 ${
                  accordionState.podcastSettings ? "rotate-180 transform" : ""
                }`}
              />
            </div>

            {accordionState.podcastSettings && (
              <Card className="border-none rounded bg-[#111111]  dark:bg-[#111111]">
                <CardContent className="space-y-6 p-6">
                  <div className="space-y-3">
                    <h3 className="font-source-code-pro text-base font-bold text-[#3246DC] leading-6 text-left decoration-skip-ink-none">
                      Basic Settings
                    </h3>
                    <div className="flex flex-col gap-2">
                      <Label className="font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px] text-left text-[#638BEF]">
                        Word Count: {formData.word_count}
                      </Label>
                      <Input
                        type="range"
                        name="word_count"
                        min="500"
                        max="10000"
                        step="100"
                        value={formData.word_count}
                        onChange={handleInputChange}
                        className="w-full px-0 dark:bg-[#3246DC] bg-[#3246DC]"
                      />
                    </div>

                    <div className="w-full space-y-2">
                      <Label className="font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px] text-left text-[#638BEF]">
                        Conversation Style (Select up to {MAX_STYLE_SELECTIONS})
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {conversationStyles.map((style) => (
                          <Badge
                            key={style}
                            variant={
                              selectedStyles.includes(style)
                                ? "default"
                                : "outline"
                            }
                            className={`px-[11px] py-[10.5px] rounded font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px]  cursor-pointer ${
                              selectedStyles.includes(style)
                                ? "text-[#111111] dark:bg-[#3246DC] bg-[#3246DC]"
                                : "text-[#3246DC] dark:text-[#3246DC] border border-[#3246DC] dark:border-[#3246DC]"
                            } ${
                              !selectedStyles.includes(style) &&
                              selectedStyles.length >= MAX_STYLE_SELECTIONS
                                ? "opacity-50"
                                : ""
                            }`}
                            onClick={() => toggleStyleSelection(style)}
                          >
                            {style}
                          </Badge>
                        ))}
                        <AddCustomValue
                          onAdd={(value) => {
                            if (selectedStyles.length < MAX_STYLE_SELECTIONS) {
                              setConversationStyles((prev) => [...prev, value]);
                              setSelectedStyles((prev) => [...prev, value]);
                            }
                          }}
                          placeholder="Enter custom style"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Roles and Structure */}
                  <div className="space-y-4">
                    <h3 className="font-source-code-pro text-base font-bold text-[#3246DC] leading-6 text-left decoration-skip-ink-none">
                      Roles and Structure
                    </h3>
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px] text-left text-[#638BEF]">
                            Role of First Speaker
                          </Label>
                          <Input
                            type="text"
                            name="roles_person1"
                            value={formData.roles_person1}
                            onChange={handleInputChange}
                            className={`w-full rounded !border !border-[#3246DC] px-3 py-2  text-[#638BEF] bg-[#111111] font-source-code-pro text-xs md:text-base 2xl:text-sm font-medium !leading-[15px] text-left placeholder:text-[#3246DC]`}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label className="font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px] text-left text-[#638BEF]">
                            Role of Second Speaker
                          </Label>
                          <Input
                            type="text"
                            name="roles_person2"
                            value={formData.roles_person2}
                            onChange={handleInputChange}
                            className={`w-full rounded !border !border-[#3246DC] !px-3 !py-2  text-[#638BEF] bg-[#111111] font-source-code-pro text-xs md:text-base 2xl:text-sm font-medium !leading-[15px] text-left placeholder:text-[#3246DC]`}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-source-code-pro text-base font-bold text-[#3246DC] leading-6 text-left decoration-skip-ink-none">
                          Dialogue Structure
                        </h3>
                        <div className="space-y-4">
                          {dialogueStructureOptions.map((structure) => (
                            <div key={structure.id} className="space-y-2">
                              <div className="flex flex-wrap gap-2">
                                <Badge
                                  variant={
                                    selectedStructureId === structure.id
                                      ? "default"
                                      : "outline"
                                  }
                                  className={`px-[11px] py-[10.5px] rounded font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px]  cursor-pointer ${
                                    selectedStructureId === structure.id
                                      ? "text-[#111111] dark:bg-[#3246DC] bg-[#3246DC]"
                                      : "text-[#3246DC] dark:text-[#3246DC] border border-[#3246DC] dark:border-[#3246DC]"
                                  }`}
                                  onClick={() =>
                                    setSelectedStructureId(structure.id)
                                  }
                                >
                                  {structure.items.join(" → ")}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-source-code-pro text-base font-bold text-[#3246DC] leading-6 text-left decoration-skip-ink-none">
                      Advanced Settings
                    </h3>
                    <div className="flex flex-col gap-2">
                      <Label className="font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px] text-left text-[#638BEF]">
                        Creativity Level: {formData.creativity_level}
                      </Label>
                      <Input
                        type="range"
                        name="creativity_level"
                        min="0"
                        max="1"
                        step="0.1"
                        value={formData.creativity_level}
                        onChange={handleInputChange}
                        className="w-full px-0 dark:bg-[#3246DC] bg-[#3246DC]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px] text-left text-[#638BEF]">
                        Custom Instructions
                      </Label>
                      <textarea
                        name="user_instructions"
                        value={formData.user_instructions}
                        onChange={handleInputChange}
                        rows={2}
                        className={`w-full rounded h-[140px] !border !border-[#3246DC] px-3 py-2  text-[#638BEF] bg-[#111111] font-source-code-pro text-xs md:text-base 2xl:text-sm font-medium !leading-[15px] text-left placeholder:text-[#3246DC]`}
                        placeholder="Add any specific instructions to guide the conversation..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="flex justify-start">
            {configError ? (
              <Alert
                variant="destructive"
                className="flex items-center dark:bg-red-900/50 dark:text-red-200"
              >
                <AlertCircle className="mr-2 h-4 w-4" />
                <AlertDescription>
                  Failed to load configuration. Please try again later.
                </AlertDescription>
              </Alert>
            ) : (
              <button
                type="submit"
                onClick={handleClick}
                disabled={loading}
                className={`flex items-center gap-2 rounded-md px-4 py-2  transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50  rounded-tl-sm  shadow-sm font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px] text-left  ${
                  connected
                    ? "text-[#111111] bg-[#3246DC]"
                    : "text-[#111111] bg-[#3246DC]"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {transactionPending
                      ? "Confirming Payment..."
                      : "Generating Podcast..."}
                  </>
                ) : !authenticated ? (
                  <>
                    <WalletIcon className="h-5 w-5" />
                    Sign in to Generate
                  </>
                ) : !activeWallet ? (
                  <>
                    <WalletIcon className="h-5 w-5" />
                    Creating Wallet...
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5" />
                    Generate Podcast
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        {error && (
          <Alert
            variant="destructive"
            className="mt-6 flex items-center justify-between dark:bg-red-900/50 dark:text-red-200"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <span className="font-bold">{error}</span>
              </AlertDescription>
            </div>
          </Alert>
        )}

        <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
          <DialogContent className="border-none rounded bg-[#111111]  dark:bg-[#111111] sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span className="font-source-code-pro text-base font-bold text-[#3246DC] leading-6 text-left decoration-skip-ink-none">
                  Podcast Generation Status
                </span>
              </DialogTitle>
            </DialogHeader>
            <div>
              {podcastData && (
                <div className="font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px] text-left text-[#638BEF]">
                  {podcastData?.message}
                </div>
              )}
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => {
                    setPodcastData(null);
                    setIsStatusModalOpen(false);
                    resetForm();
                  }}
                  className="flex items-center gap-2 rounded-md px-4 py-2 text-[#111111] bg-[#3246DC] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50  rounded-tl-sm  shadow-sm font-source-code-pro text-xs md:text-base 2xl:text-sm font-bold leading-[15px] text-left"
                >
                  Close
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomPodcast;
