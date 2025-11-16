"use client"
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hook/useDebounce';
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from 'react';


interface SearchFilterProps {
  placeholder?: string;
  paramName?: string;
}

const SearchFilter = ({ placeholder = "Search...", paramName = "searchTerm" }: SearchFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get(paramName || "") ?? "");
  const [isPending, startTransition] = useTransition();
  const debounceValue = useDebounce(value, 500)


  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const initialValue = searchParams.get(paramName) || "";
    if (debounceValue === initialValue) {
      return;
    }
    if (debounceValue) {
      params.set(paramName, debounceValue)
    } else {
      params.delete(paramName)
    }

    params.set("page", "1")

    startTransition(() => {
      router.push(`?${params.toString()}`)
    })
  }, [
    paramName,
    router, searchParams,
    debounceValue
  ])

  return (
    <div>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input onChange={(e) => setValue(e.target.value)} value={value} placeholder={placeholder} className='pl-10' disabled={isPending} />

    </div>
  );
};

export default SearchFilter;