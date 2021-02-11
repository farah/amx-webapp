import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .test("letters", "Name must only contain letters", value => {
      return /^[A-Za-z]+$/.test(value);
    })
    .min(3, "First name is too short")
    .max(15, "First name is too short")
    .required("First name is required")
    .test("letters", "Name must only contain letters", value => {
      return /^[A-Za-z]+$/.test(value);
    }),
  middleName: Yup.string()
    .test("letters", "Name must only contain letters", value => {
      return /^[A-Za-z]+$/.test(value);
    })
    .min(3, "Middle name is too short")
    .max(15, "Middle name is too short")
    .test("letters", "Name must only contain letters", value => {
      return /^[A-Za-z]+$/.test(value);
    }),
  lastName: Yup.string()
    .test("letters", "Name must only contain letters", value => {
      return /^[A-Za-z]+$/.test(value);
    })
    .min(3, "Last name is too short")
    .max(15, "Last name is too short")
    .required("Last name is required")
    .test("letters", "Name must only contain letters", value => {
      return /^[A-Za-z]+$/.test(value);
    }),
  formattedAddress: Yup.string()
    .min(10, "Address is too short")
    .required("Address is required")
    .test("validateAddress", "Address cannot be validated. Please select from the list.", value => {
      return new Promise((resolve, reject) => {
        if (!value) {
          resolve(false);
        }
        if (value.length < 6) {
          resolve(false);
        }
        resolve(true);
      });
    }),
  birthdate: Yup.string()
    .min(3, "birthdate is too short")
    .max(15, "birthdate is too long")
    .required("birthdate is required"),
  suburb: Yup.string()
    .min(3, "City is too short")
    .max(15, "City is too long")
    .required("City is required")
    .test("letters", "Name must only contain letters", value => {
      return /^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(value);
    }),
  postcode: Yup.string()
    .min(4, "Postcode is too short")
    .max(4, "Postcode is too long")
    .required("Postcode is required")
    .test("digits", "Name must only contain digits", value => {
      return /^\d+$/.test(value);
    }),
  mobile: Yup.string()
    .test("digits", "Mobile is required", value => {
      return value.length > 3;
    })
    .test("04", "Mobile must start with 04", value => {
      if (value[3] === "4") {
        return true;
      }
      if (value[3] === "0") {
        if (value[4] === "4") {
          return true;
        }
      }
      return false;
    })

    .test("short", "Mobile is too short", value => {
      if (value[3] === "4") {
        return value.length >= 12;
      }
      if (value[3] === "0") {
        return value.length >= 13;
      }
      return false;
    })

    .test("long", "Mobile is too long", value => {
      if (value[3] === "4") {
        return value.length <= 12;
      }
      if (value[3] === "0") {
        return value.length <= 13;
      }
      return false;
    }),
  state: Yup.string().required("State is required")
});

export default validationSchema;
