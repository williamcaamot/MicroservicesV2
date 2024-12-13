// Source: Generated by Claude.AI
// I'm typically using Claude instead of a component library to get more control over the components I use

import * as React from "react";

interface buttonProps{
    onClick?: () => {},
    disabled?: boolean,
    loading?: boolean,
    children?: React.ReactNode,
    variant?: 'filled' | 'outlined' | 'ghost',
    size?: | 'sm' | 'md' | 'lg',
    fullWidth?: boolean
}




const Button = ({
                    onClick,
                    disabled,
                    loading,
                    children,
                    variant = 'filled', // 'filled', 'outlined', 'ghost'
                    size = 'md', // 'sm', 'md', 'lg'
                    fullWidth = false
                }:buttonProps) => {
    const baseClasses = "font-bold rounded transition-all duration-300 focus:outline-none flex items-center justify-center";

    // Size classes
    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg"
    };

    // Variant-specific classes when button is enabled
    const variantClasses = {
        filled: "bg-[#1f729c] hover:bg-[#16506e] active:bg-[#0a4869] text-white",
        outlined: "border-2 border-[#16506e] text-[#0a4869] hover:[#0a4869] active:bg-[#778d99]",
        ghost: "text-blue-500 hover:bg-blue-50 active:bg-blue-100"
    };

    // Disabled state classes for each variant
    const disabledClasses = {
        filled: "bg-gray-300 text-gray-500",
        outlined: "border-2 border-gray-300 text-gray-500",
        ghost: "text-gray-500"
    };

    // Determine active classes based on disabled state and variant
    const activeClasses = disabled
        ? `${disabledClasses[variant]} cursor-not-allowed`
        : `${variantClasses[variant]} transform hover:scale-105 active:scale-95`;


    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseClasses} ${sizeClasses[size]} ${activeClasses} `}
        >
            {loading && (
                <span className="mr-2">
                    <svg className="animate-spin h-5 w-5 inline-block" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                </span>
            )}
            {children}
        </button>
    );
};

// Example usage demonstration component
const ButtonDemo = () => {
    const [loading, setLoading] = React.useState(false);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="space-y-4">
            <div className="space-x-4">
                <Button variant="filled" onClick={handleClick} loading={loading}>
                    Filled Button
                </Button>
                <Button variant="outlined" onClick={handleClick}>
                    Outlined Button
                </Button>
                <Button variant="ghost" onClick={handleClick}>
                    Ghost Button
                </Button>
            </div>
            <div className="space-x-4">
                <Button variant="filled" size="sm">
                    Small Button
                </Button>
                <Button variant="filled" size="md">
                    Medium Button
                </Button>
                <Button variant="filled" size="lg">
                    Large Button
                </Button>
            </div>
            <div className="space-x-4">
                <Button variant="filled" disabled>
                    Disabled Filled
                </Button>
                <Button variant="outlined" disabled>
                    Disabled Outlined
                </Button>
                <Button variant="ghost" disabled>
                    Disabled Ghost
                </Button>
            </div>
            <div className="w-full">
                <Button variant="filled" fullWidth>
                    Full Width Button
                </Button>
            </div>
        </div>
    );
};

export default Button;