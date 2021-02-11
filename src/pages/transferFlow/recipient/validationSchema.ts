import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "First name is too short")
    .max(15, "First name is too short")
    .required("First name is required"),
  middleName: Yup.string()
    .min(3, "Middle name is too short")
    .max(15, "Middle name is too short"),
  lastName: Yup.string()
    .min(3, "Last name is too short")
    .max(15, "Last name is too short")
    .required("Last name is required"),
  city: Yup.string()
    .min(3, "City is too short")
    .max(15, "City is too long")
    .required("City is required"),
  country: Yup.string().required("Country is required"),
  mobile: Yup.string().nullable()
  .min(10, "Mobile name is too short")
  .required("Mobile is required"),
  addSecretWord: Yup.boolean(),
  secretWord: Yup.string().when("addSecretWord", {
    is: true,
    then: Yup.string().required("Secret word is required")
  }),
  addBankAccount: Yup.boolean(),
  accountNumber: Yup.string().when("addBankAccount", {
    is: true,
    then: Yup.string().required("Account number is required")
  })
});

export default validationSchema;
