import * as React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { updateReceiver } from "store/receiver/receiverSlice";
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

function UpdateReceiverModal({
  open,
  title,
  onClose,
  currentReceiver,
  updateRecipient,
  name
}): any {
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
    onClose();
    await updateRecipient({
      userId: "kXl9UNbiyfXNHHO36KnF46Vm5Ms2",
      receiver: { ...values, id: currentReceiver.id }
    });
  };

  return (
    <Modal title={title} open={open} onClose={handleCloseModal}>
      <Formik
        enableReinitialize
        initialValues={{
          firstName: currentReceiver?.firstName || "",
          middleName: currentReceiver?.middleName || "",
          lastName: currentReceiver?.lastName || "",
          mobile: currentReceiver?.mobile || "",
          city: currentReceiver?.city || "",
          country: currentReceiver?.country || "",
          secretWord: currentReceiver?.secretWord || "",
          addSecretWord: currentReceiver?.addSecretWord || "",
          countryCode: currentReceiver?.countryCode || ""
        }}
        onSubmit={handleSubmit}
      >
        <InnerForm name={currentReceiver?.id} />
      </Formik>
    </Modal>
  );
}

const mapDispatchToProps = {
  updateRecipient: updateReceiver
};

export default connect(null, mapDispatchToProps)(UpdateReceiverModal);
