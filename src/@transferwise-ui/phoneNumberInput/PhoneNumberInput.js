/*eslint-disable */
import { useState, useEffect } from "react";
import Types from "prop-types";
import { isArray } from "@transferwise/neptune-validation";
import { Size } from "../common";

import Select from "../select";
import {
  explodeNumberModel,
  filterOptionsForQuery,
  isValidPhoneNumber,
  cleanNumber,
  setDefaultPrefix,
  isStringNumeric,
  sortArrayByProperty,
  groupCountriesByPrefix
} from "./utils";

import { countries, countryOptions } from "./data/countries";

import "./PhoneNumberInput.css";

const ALLOWED_PHONE_CHARS = /^$|^[\d-\s]+$/;

const PhoneNumberInput = props => {
  const {
    onChange,
    searchPlaceholder,
    disabled,
    required,
    size,
    placeholder,
    onFocus,
    onBlur,
    locale,
    countryCode,
    selectedCountry,
    lockCountryCode
  } = props;

  const getInitialValue = () => {
    const { initialValue } = props;
    const cleanValue = initialValue ? cleanNumber(initialValue) : null;
    return cleanValue && isValidPhoneNumber(cleanValue) ? cleanValue : null;
  };

  const [internalValue, setInternalValue] = useState(getInitialValue());
  const [broadcastValue, setBroadcastValue] = useState(getInitialValue());
  const [searchQuery, setSearchQuery] = useState("");
  const [internalCountryCode, setCountryCode] = useState(selectedCountry);

  const listSortedByISO3 = groupCountriesByPrefix(sortArrayByProperty(countries, "iso3"));
  const listSortedByPhone = groupCountriesByPrefix(sortArrayByProperty(countries, "phone"));

  const getSuffixPrefix = value => {
    let prefix = setDefaultPrefix(locale, countryCode);
    let suffix = "";

    if (!value) {
      prefix = "";
      suffix = "";
      return { prefix, suffix };
    }
    if (value) {
      ({ prefix, suffix } = explodeNumberModel(value));
    }
    return { prefix, suffix };
  };

  const getSelectOptions = () => {
    const filteredOptions = filterOptionsForQuery(
      isStringNumeric(searchQuery) ? listSortedByPhone : listSortedByISO3,
      searchQuery
    );

    return filteredOptions.map(option => {
      const { phone, iso3, iso2 } = option;
      let note = "";

      if (iso3) {
        note = isArray(iso3) ? iso3.join(", ") : iso3;
      } else if (iso2) {
        note = isArray(iso2) ? iso2.join(", ") : iso2;
      }

      return { value: phone, label: phone, note };
    });
  };

  const options = getSelectOptions();

  const handleChangeSelect = event => {
    const { suffix } = getSuffixPrefix(internalValue);
    const prefix = event.value;

    setSearchQuery("");
    setInternalValue(prefix + suffix);
  };

  const handleInputChange = event => {
    const suffix = event.target.value;

    if (ALLOWED_PHONE_CHARS.test(suffix)) {
      const { prefix } = getSuffixPrefix(internalValue);
      setInternalValue(prefix + suffix);
    }
  };

  const handlePaste = e => {
    if (!e.nativeEvent.clipboardData) {
      return;
    }
    const pasteValue = (e.nativeEvent.clipboardData.getData("text/plain") || "").replace(/(\s|-)+/g, "");
    const selected = options.find(({ value }) => new RegExp(`^\\${value}`).test(pasteValue));
    if (selected && ALLOWED_PHONE_CHARS.test(pasteValue.replace(selected.value, ""))) {
      setInternalValue(pasteValue);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      let countryName;
      
      if (selectedCountry.value === 11) {
        
        countryName = "Australia";
      } else {
        
        countryName = countryOptions.find(o => o.value === selectedCountry.value).label;
      }

      const newPrefix = countries.find(o => o.name === countryName).phone;

      const { prefix } = getSuffixPrefix(internalValue);

      const newInternalValue = internalValue ? newPrefix.concat(internalValue.slice(prefix.length)) : newPrefix;

      const newbroadcastValue = isValidPhoneNumber(newInternalValue) ? cleanNumber(newInternalValue) : null;
      setCountryCode(countryCode);
      const { suffix } = getSuffixPrefix(internalValue);
      setSearchQuery("");
      setInternalValue(newPrefix + suffix);
    }
  }, [selectedCountry]);

  useEffect(() => {
    const newbroadcastValue = isValidPhoneNumber(internalValue) ? cleanNumber(internalValue) : null;
    if (newbroadcastValue !== broadcastValue) {
      onChange(newbroadcastValue);
      setBroadcastValue({ newbroadcastValue });
      setCountryCode(countryCode);
    }
  }, [internalValue, countryCode]);

  let { prefix, suffix } = getSuffixPrefix(internalValue);

  return (
    <div className="tw-telephone">
      <div className="tw-telephone__country-select">
        <Select
          search
          options={options}
          selected={{ value: prefix, label: prefix }}
          onChange={handleChangeSelect}
          placeholder="Select an option..."
          searchPlaceholder={searchPlaceholder}
          onSearchChange={newSearch => setSearchQuery(newSearch)}
          searchValue={searchQuery}
          required={required}
          disabled={disabled || lockCountryCode}
          size={size}
        />
      </div>

      <div className="tw-telephone__number-input">
        <div className={`input-group input-group-${size}`}>
          <input
            name="phoneNumber"
            value={suffix}
            type="text"
            className="form-control"
            disabled={disabled}
            onChange={handleInputChange}
            onPaste={handlePaste}
            onFocus={onFocus}
            onBlur={onBlur}
            required={required}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};
PhoneNumberInput.Size = Size;

PhoneNumberInput.propTypes = {
  required: Types.bool,
  disabled: Types.bool,
  initialValue: Types.string,
  onChange: Types.func.isRequired,
  onFocus: Types.func,
  onBlur: Types.func,
  countryCode: Types.string,
  locale: Types.string,
  searchPlaceholder: Types.string,
  size: Types.oneOf([PhoneNumberInput.Size.SMALL, PhoneNumberInput.Size.MEDIUM, PhoneNumberInput.Size.LARGE]),
  placeholder: Types.string,
  selectedCountry: Types.any,
  lockCountryCode: Types.any
};

PhoneNumberInput.defaultProps = {
  required: false,
  disabled: false,
  initialValue: null,
  onFocus() {},
  onBlur() {},
  countryCode: null,
  locale: "en-GB",
  searchPlaceholder: "Prefix",
  size: PhoneNumberInput.Size.MEDIUM,
  placeholder: "",
  lockCountryCode: null
};

export default PhoneNumberInput;
