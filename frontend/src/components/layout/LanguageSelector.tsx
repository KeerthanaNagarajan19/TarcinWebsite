import React, { useState } from "react";
import { useTranslations } from "../../hooks/use-translations";
import { localeToShortDisplay, localeToLanguageName, Locale } from "../../lib/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { ChevronDown, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface LanguageSelectorProps {
  isMobile?: boolean;
}

// Language options with nice labels and flags
const languageOptions: { value: Locale; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
  { value: 'ar', label: 'العربية', flag: '🇸🇦' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isMobile = false }) => {
  const { locale, setLocale } = useTranslations();
  const [open, setOpen] = useState(false);
  
  // Get currently selected language option
  const selectedLanguage = languageOptions.find(option => option.value === locale);

  if (isMobile) {
    return (
      <div className="flex flex-col">
        <div className="grid grid-cols-3 gap-2">
          {languageOptions.map((option) => (
            <Button
              key={option.value}
              variant={locale === option.value ? "default" : "outline"}
              className={`px-3 py-3 flex flex-col items-center justify-center ${
                locale === option.value 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700'
              }`}
              onClick={() => setLocale(option.value)}
            >
              <span className="text-xl mb-1">{option.flag}</span>
              <span className="text-xs font-medium">{option.value.toUpperCase()}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent border border-gray-300 dark:border-gray-700 rounded-md h-8 px-3 text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Globe className="mr-1 h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
          <span className="hidden sm:inline mr-1">{selectedLanguage?.label || 'Language'}</span>
          <span className="sm:hidden">{selectedLanguage?.value.toUpperCase()}</span>
          <ChevronDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4 opacity-70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0" align="end">
        <motion.div 
          className="flex flex-col overflow-hidden rounded-md"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {languageOptions.map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              className={`flex items-center justify-start py-2.5 px-3 text-sm ${
                locale === option.value ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''
              }`}
              onClick={() => {
                setLocale(option.value);
                setOpen(false);
              }}
            >
              <span className="mr-2 text-lg">{option.flag}</span>
              <span>{option.label}</span>
              {locale === option.value && (
                <span className="ml-auto text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 py-0.5 px-2">
                  Active
                </span>
              )}
            </Button>
          ))}
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;
