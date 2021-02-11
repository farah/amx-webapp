export const parseAddress = async (term: string) => {
  const url = `https://api.addressify.com.au/address/parse?api_key=${process.env.REACT_APP_ADDRESSIFY_KEY}&term=${term}`;
  let data;
  console.log('process.env.ADDRESSIFY_KEY',process.env.ADDRESSIFY_KEY)

  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (err) {
    throw err
  }
  return data;
}


export const addressAutocomplete = async (term: string) => {
  const url = `https://api.addressify.com.au/addresspro/autocomplete?api_key=${process.env.REACT_APP_ADDRESSIFY_KEY}&term=${term}`;

  console.log('process.env.ADDRESSIFY_KEY',process.env.ADDRESSIFY_KEY)
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
    
  } catch (err) {
    throw err
  }
  return data;
};
