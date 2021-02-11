import * as React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { createReceiver } from "store/receiver/receiverSlice";
import Modal from "./Modal";
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
  countryCode?: any;
};

function AddReceiverModal({ open, title, onClose, createRecipient, name }): any {
  const modalDialog = null;

  const handleOnClick = event => {
    // Prevents the onclick to be fired by children.
    if (event.target === event.currentTarget) {
      onClose(event);
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleSubmit = async values => {
    const {
      country: { label }
    } = values;

    await createRecipient({
      userId: "kXl9UNbiyfXNHHO36KnF46Vm5Ms2",
      receiver: { ...values }
    });

    onClose();
  };

  return (
    <Modal title={title} open={open} onClose={handleCloseModal}>
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
          countryCode: ""
        }}
        onSubmit={handleSubmit}
      >
        <InnerForm name={name} />
      </Formik>
    </Modal>
  );
}

const mapDispatchToProps = {
  createRecipient: createReceiver
};

export default connect(null, mapDispatchToProps)(AddReceiverModal);
