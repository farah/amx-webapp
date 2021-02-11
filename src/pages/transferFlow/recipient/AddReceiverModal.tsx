import * as React from "react";
import { useAuth } from "contexts/Firebase";
import { connect } from "react-redux";
import { Formik } from "formik";
import { createReceiver } from "store/receiver/receiverSlice";
import { Modal } from "@transferwise-ui";
import validationSchema from "./validationSchema";
import InnerForm from "./InnerForm";

export type ReceiverFormFields = {
  firstName?: any;
  middleName?: any;
  lastName?: any;
  mobile?: any;
  city?: any;
  country?: any;
  secretWord?: any;
  addSecretWord?: any;
  accountNumber?: any;
  addBankAccount?: any;
  countryCode?: any;
};

function AddReceiverModal({ open, title, onClose, createRecipient, name }): any {
  const { userId } = useAuth();

  const handleSubmit = async (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
    resetForm({})

    try {
       await createRecipient({
        userId,
        receiver: { ...values, visible: true }
      });
    } catch (error) {
      setStatus({success: false})
      setSubmitting(false)
      setErrors({submit: error.message})
    }

    onClose();
  };

  return (
    <>
      <Modal
        body={
          <>
            <Formik
              enableReinitialize
              initialValues={{
                firstName: "",
                middleName: "",
                lastName: "",
                mobile: "",
                city: "",
                country: "",
                secretWord: "",
                addSecretWord: "",
                accountNumber: "",
                countryCode: ""
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <InnerForm name="addReceiverForm" />
            </Formik>
          </>
        }
        open={open}
        onClose={() => onClose()}
        size={Modal.Size.MEDIUM}
        title="Add new receiver"
        className=""
        closeOnClick={false}
      />
    </>
  );
}

const mapDispatchToProps = {
  createRecipient: createReceiver
};

export default connect(null, mapDispatchToProps)(AddReceiverModal);
