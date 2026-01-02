
import { allCountries, CountryData } from 'country-telephone-data';

interface CountryCode {
    name: string;
    iso2: string;
    dialCode: string;
}

const countryCodes: CountryCode[] = allCountries.map((country: CountryData) => ({
    name: country.name,
    iso2: country.iso2.toUpperCase(),
    dialCode: `+${country.dialCode}`,
}));

export default countryCodes;
