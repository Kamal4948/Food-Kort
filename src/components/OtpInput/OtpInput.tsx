import { useEffect, useRef } from 'react';

interface OtpInputProps {
    length?: number;
    onChange: (value: string) => void;
    onComplete?: (value: string) => void;
    error?: string;
    disabled?:boolean;
}

export default function OtpInput({ length = 6, onChange, error, onComplete,disabled }: OtpInputProps) {
    const otpRefs = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        otpRefs.current[0]?.focus();
    }, []);

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").trim();
        if (!/^\d+$/.test(pasteData)) return;
    
        const otpArray = pasteData.split("").slice(0, length);
    
        otpArray.forEach((digit, i) => {
            if (otpRefs.current[i]) {
                otpRefs.current[i].value = digit;
            }
        });
    
        const otp = otpRefs.current.map((ref) => ref?.value || "").join("");
        onChange(otp);
    
        if (otpArray.length === length && onComplete) {
            onComplete(otp);
        }
    };
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/^\d$/.test(value)) {
            otpRefs.current[index].value = value;
            if (index < length - 1) {
                otpRefs.current[index + 1]?.focus();
            }
        } else {
            e.target.value = '';
        }

        const otp = otpRefs.current.map((ref) => ref?.value || '').join('');
        onChange(otp);

        const isComplete = otpRefs.current.every(ref => ref && ref.value !== '');
        if (isComplete && onComplete) {
            onComplete(otp);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            if (otpRefs.current[index].value === '') {
                if (index > 0) {
                    otpRefs.current[index - 1]?.focus();
                }
            } else {
                otpRefs.current[index].value = '';
            }

            const otp = otpRefs.current.map((ref) => ref?.value).join('');
            onChange(otp);
        }
    };

    return (
        <>
            <div className="flex gap-2 items-center justify-between my-[30px] lg:my-[40px] w-full lg:w-[80%] max-w-[380px] mx-auto">
                {Array.from({ length }).map((_, i) => (
                    <input
                        key={i}
                        ref={(el) => {
                            otpRefs.current[i] = el!;
                        }}
                        disabled={disabled}
                        type="text"
                        maxLength={1}
                        inputMode="numeric"
                        className="otp-input text-center border border-gray-300 rounded-md text-lg"
                        onChange={(e) => handleChange(e, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        onPaste={handlePaste}
                    />
                ))}
            </div>
            {error && (
                <div className="text-red-600 text-sm mb-2 text-center">
                    {error}
                </div>
            )}
        </>
    );
}
