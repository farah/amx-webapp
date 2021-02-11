

export interface PoliGetResponse {
    Success: boolean;
    NavigateURL: string;
    ErrorCode: number;
    ErrorMessage: string | null;
    TransactionRefNo: string;
}

export interface PoliPostResponse {
    CountryName: string;
    FinancialInstitutionCountryCode: string;
    TransactionID: string;
    MerchantEstablishedDateTime: string;
    PayerAccountNumber: string;
    PayerAccountSortCode: string;
    MerchantAccountSortCode: string;
    MerchantAccountName: string;
    MerchantData: string;
    CurrencyName:string;
    TransactionStatus: string;
    IsExpired: boolean,
    MerchantEntityID: string;
    UserIPAddress: string;
    POLiVersionCode: string;
    MerchantName: string;
    TransactionRefNo: string;
    CurrencyCode: string;
    CountryCode: string;
    PaymentAmount: number,
    AmountPaid: number,
    EstablishedDateTime: string;
    StartDateTime: string;
    EndDateTime: string,
    BankReceipt: string;
    BankReceiptDateTime: string;
    TransactionStatusCode: string;
    ErrorCode: string,
    ErrorMessage: string;
    FinancialInstitutionCode: string;
    FinancialInstitutionName: string;
    MerchantReference: string;
    MerchantAccountSuffix: string,
    MerchantAccountNumber: string;
    PayerFirstName: string;
    PayerFamilyName: string;
    PayerAccountSuffix: string;
}
