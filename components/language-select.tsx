'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Languages } from 'lucide-react';

const languages = [
  { value: 'en', label: 'English' },
  { value: 'hn', label: 'Hindi' }
];

export function LanguageSelect() {
  return (
    <Select defaultValue="en">
      <SelectTrigger className="w-[120px]">
        <Languages className="size-4 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
