import countries from '../../data/countries';
import { longestMatchingPrefix } from '../longestMatchingPrefix';

export const findCountryByCode = (code) => {
  let matchingCodes;
  if (code && code.length === 2) {
    matchingCodes = countries.filter((country) => {

      return code === country.iso2
    });
  }
  //console.log('matchingCodes', matchingCodes)
  return matchingCodes && matchingCodes.length ? longestMatchingPrefix(matchingCodes) : null;
};
