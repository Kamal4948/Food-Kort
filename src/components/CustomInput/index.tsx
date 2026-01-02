import React, { forwardRef } from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({
    type = 'text',
    placeholder,
    value,
    onChange,
    className = '',
    error = false,
    errorMessage,
    label,
    required = false,
    disabled = false,
    ...rest
  }, ref) => {
    const baseClasses = "block text-[16px] text-[#000] truncate border h-[55px] p-[10px] w-[100%] rounded-[6px] focus:border-[#C5994F] outline-none transition-colors duration-200";

    const borderClasses = error
      ? "border-red-500 focus:border-red-500"
      : "border-[#CBD5E0] focus:border-[#C5994F]";

    const disabledClasses = disabled
      ? "bg-gray-100 cursor-not-allowed opacity-60"
      : "bg-white";

    const combinedClasses = `${baseClasses} ${borderClasses} ${disabledClasses} ${className}`.trim();

    return (
      <div className="w-full">
        {label && (
          <label className="block text-[16px] font-medium text-black mb-[0.5rem]">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={combinedClasses}
          required={required}
          disabled={disabled}
          aria-invalid={error}
          aria-describedby={error && errorMessage ? `${rest.id || 'input'}-error` : undefined}
          {...rest}
        />
        {error && errorMessage && (
          <p
            id={`${rest.id || 'input'}-error`}
            className="text-red-500 text-sm mt-1"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;