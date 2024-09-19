import { useEffect, useRef } from "react";

interface InputProps {
    placeholder: string;
    value?: any; // Optional prop
    onChange?: Function; // Optional prop
    type?: "text" | "email" | "password" | "date" | "radio" | "number";
    id?: string;
    name?: string;
    required?: boolean;
    displayLabel?: boolean;
    isLoading?: boolean; // Optional loading state,
    error?: string,
    autofocus?: boolean,
}

export default function Input({
                                  placeholder,
                                  value = "",
                                  onChange = () => {},
                                  type = "text",
                                  id = "name",
                                  name = "name",
                                  required = false,
                                  displayLabel = true,
                                  isLoading = false,
                                  error = undefined,
                                  autofocus = false,
                              }: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current && !isLoading) {
            inputRef.current.focus();
        }
    }, [isLoading]);

    return (
        <div className="flex flex-col space-y-0.5 relative">
            {displayLabel && (
                <label className="text-sm font-medium text-zinc-700" htmlFor={id}>
                    {placeholder} {required && <span className="text-[0.8em] text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                <input
                    ref={inputRef}

                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    className="border w-full rounded-lg border-gray-200 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder={placeholder}
                    type={type}
                    id={id}
                    name={name}
                    disabled={isLoading}
                    autoFocus={autofocus}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    data-lpignore="true" // LastPass specific attribute
                />
                {isLoading && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    </div>
                )}
            </div>
            {error && <span className={"text-sm text-red-600"}>{error}</span>}
        </div>
    );
}
