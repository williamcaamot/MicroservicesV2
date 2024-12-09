'use client'

import { useEffect, useState, KeyboardEvent } from "react";
import Input from "./Input";

export interface CompanySearchResult {
    navn: string;
    organisasjonsnummer: string;
    forretningsadresse: forretningsadresse;
}

interface forretningsadresse {
    adresse: string[];
}

interface CompanySearchProps {
    handleSelectCompany: Function,
    searchTerm?: string | undefined,
    setSearchTerm: Function,
}

export default function CompanySearchV2({ handleSelectCompany, searchTerm = "", setSearchTerm }: CompanySearchProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [searchResults, setSearchResults] = useState<CompanySearchResult[]>([])
    const [tempSearch, setTempSearch] = useState<string>("")
    const [selectedIndex, setSelectedIndex] = useState<number>(-1)

    async function handleSearch() {
        if (searchTerm === tempSearch) {
            return
        }
        if (searchTerm.length < 1) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }
        setIsSearching(true);
        //setIsLoading(true)
        try {
            const result = await fetch(`/api/v1/company/search?navn=${searchTerm}`);
            if (result.ok) {
                const data = await result.json();
                setSearchResults(data._embedded.enheter);
            } else {
            }
            //setIsLoading(false)
        } catch (e) {
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch();
        }, 150);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    function handleSelect(companySearchResult: CompanySearchResult) {
        setTempSearch(companySearchResult.navn)
        handleSelectCompany(companySearchResult);
        setIsSearching(false);
        setSearchResults([])
        setSelectedIndex(-1)
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isSearching) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : prev));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
                        handleSelect(searchResults[selectedIndex]);
                    }
                    break;
                case 'Escape':
                    setIsSearching(false);
                    setSearchResults([]);
                    setSelectedIndex(-1);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown as any);

        return () => {
            window.removeEventListener('keydown', handleKeyDown as any);
        };
    }, [isSearching, selectedIndex, searchResults]);

    return (
        <>
            <Input
                displayLabel={false}
                isLoading={isLoading}
                placeholder={"Søk etter selskap"}
                type={"text"}
                value={searchTerm}
                onChange={setSearchTerm}
            />
            <div>
                {isSearching && searchResults.length > 0 && (
                    <ul className="z-50 w-full max-w-5xl bg-white border border-gray-300 rounded-md shadow-sm fixed max-h-56 overflow-y-auto">
                        {searchResults.map((result, index) => {
                            return (
                                <li
                                    key={result.organisasjonsnummer}
                                    className={`p-2 cursor-pointer ${index === selectedIndex ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                                    onClick={() => handleSelect(result)}
                                >
                                    {result.navn}
                                    <span className={"text-gray-600 text-sm hidden md:inline"}>
                                        , {result.forretningsadresse && result.forretningsadresse.adresse[0]} (Org. nr. {result.organisasjonsnummer})
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </>
    )
}