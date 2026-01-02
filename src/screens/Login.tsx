import { useEffect, useRef, useState } from "react";
import CustomInput from "../components/CustomInput";
import countryCodes from "../utils/countryCode";
import ReactCountryFlag from "react-country-flag";
import { RegisterInitPayload } from "../types/login";
import { registerInit } from "../apis/login/login";
import { useNotification } from "../components/Toaster/Toaster";
import { useNavigate } from "react-router-dom";


interface FormData {
  phoneNumber:string;
}

interface FormErrors {
  phoneNumber?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { showErrorAlert,showSuccessAlert } = useNotification();

  const [formData, setFormData] = useState<FormData>({
    phoneNumber:"",
  });

    const [selectedCountry, setSelectedCountry] = useState(countryCodes[237]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [typedValue, setTypedValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countryCodes);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);


  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    localStorage.clear();
    setIsLoading(true);

    try {

      const payload: RegisterInitPayload = {
        phone: formData.phoneNumber.trim(),
        dial_code: `${selectedCountry.dialCode}`,
      };

      await registerInit(payload);
      showSuccessAlert("User Registered Successfully")
       navigate("/otp", {
          state: {
            phone: payload.phone,
            dialCode: payload.dial_code,
          },
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        showErrorAlert(error.message);
      } else {
        showErrorAlert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

    const dropdownRef = useRef<HTMLDivElement>(null);
     const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch(`https://ipinfo.io/json?token=c59c36fd7668e8`);
        const data = await res.json();

        if (data && data.country) {
          const detected = countryCodes.find(
            (c) => c.iso2 === data.country
          );
          if (detected) {
            setSelectedCountry(detected);
          }
        }
      } catch (err) {
        console.error("Geo detection failed:", err);
      }
    };

    detectCountry();
  }, [])

    useEffect(() => {
    if (dropdownOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  }, [dropdownOpen]);


  const handleSelect = (country: (typeof countryCodes)[0]) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
    setTypedValue("");
    setFilteredCountries(countryCodes);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!dropdownOpen) return;

    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCountries.length > 0) {
        handleSelect(filteredCountries[0]);
      }
      return;
    }

    if (["ArrowUp", "ArrowDown", "Tab"].includes(e.key)) return;

    setTypedValue((prev) => prev + e.key);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(() => setTypedValue(""), 10000);
  };

  useEffect(() => {
    if (typedValue === "") {
      console.log(countryCodes);

      setFilteredCountries(countryCodes);
    } else {
      const lowerTyped = typedValue.toLowerCase();
      setFilteredCountries(
        countryCodes.filter(
          (country) =>
            country.iso2.toLowerCase().startsWith(lowerTyped) ||
            country.dialCode.replace("+", "").startsWith(typedValue)
        )
      );
    }
  }, [typedValue]);

  return (
    <div className="auth-wrapper w-full flex flex-col-reverse md:flex-row md:h-screen md:overflow-hidden">
      <div className="md:w-1/2 flex items-center justify-center bg-[#F7FAFC] overflow-y-auto">
        <div className="p-[30px] w-full lg:w-[533px] m-auto">
          <div className="mb-[20px]">
            <h2 className="text-[28px] lg:text-[35px] text-[#171923] font-bold mb-[2px]">
             Enter Your Mobile Number
            </h2>
            <p className="lg:text-[18px] text-[16px] text-[#718096]">
              We will send you the 6 digit verification code
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-[16px]">
            <div className="flex gap-2">
                <div ref={dropdownRef} className="relative w-5/12 lg:w-4/12">
                  <div
                    tabIndex={0}
                    className="cursor-pointer text-[16px] text-[#4A5568] border border-[#CBD5E0] h-[55px] px-[10px] w-full rounded-[6px] flex items-center justify-between gap-1"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    onKeyDown={handleKeyDown}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget)) {
                        setTypedValue("");
                        setFilteredCountries(countryCodes);
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <ReactCountryFlag
                        countryCode={selectedCountry.iso2}
                        svg
                        style={{
                          width: "1.2em",
                          height: "1.2em",
                          borderRadius: "3px",
                        }}
                        title={selectedCountry.name}
                      />
                      <div className="relative w-3 h-3">
                        <img
                          src={"/assets/Icons/dropdown.svg"}
                          alt="dropdown"
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] md:text-[10px]">Country code</span>
                      <span className="font-bold">{selectedCountry.dialCode}</span>
                    </div>
                  </div>

                  {dropdownOpen && (
                    <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-md">
                      <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={typedValue}
                          onChange={(e) => setTypedValue(e.target.value)}
                          placeholder="Search"
                          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm outline-none"
                        />
                      </div>
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                          <div
                            key={country.iso2}
                            onMouseDown={() => handleSelect(country)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between gap-2 text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <ReactCountryFlag
                                countryCode={country.iso2}
                                svg
                                style={{ width: "1.2em", height: "1.2em", borderRadius: "2px" }}
                                title={country.name}
                              />
                              <span className="font-medium">{country.dialCode}</span>
                            </div>
                            <span className="font-medium">{country.iso2}</span>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-gray-500 text-sm">
                          No matching country
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="w-7/12 lg:w-8/12">
                  <CustomInput
                    type="text"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange('phoneNumber', e.target.value.replace(/\D/g, '').slice(0, 10))
                    }
                    className={errors.phoneNumber ? 'border-red-500' : ''}
                  />
                </div>
              </div>
            </div>
            


            {/* Submit */}
            <div>
              <button
                type="submit"
                className="button button-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Code"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="md:w-1/2 w-full h-full">
        <div className="h-full max-md:h-[300px] bg-[url('/assets/Images/image-2.jpg')] bg-cover bg-no-repeat flex justify-center items-center">
          <div className="max-md:w-[220px]">
            <img src="/assets/Images/logo.png" alt="Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}
