export interface Address {
    formattedAddress: string;
    postcode: string;
    suburb: string;
    state: string;
  }
  
  export interface User {
    userId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    mobile: string;
    birthdate: string;
    address: Address;
    verified: boolean;
    email: string;
    isExistingCustomer: boolean;
    userInfoComplete: boolean;
  }