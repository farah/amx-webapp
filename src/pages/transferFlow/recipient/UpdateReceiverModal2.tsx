import * as React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { updateReceiver } from "store/receiver/receiverSlice";
import Modal from "./Modal";
import InnerForm from "./InnerForm";
import UpdateReceiverModal from "./UpdateReceiverModal";

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
type Props = {
  onClose?: any;
  open?: any;
  title?: any;
  currentReceiver?: any;
};

type State = {
  submitting: false;
  selectedCountry: null;
  selected: 0;
  searchValue: "";
  countryCode: "KE";
};

function AddReceiverModal({ open, title, onClose, currentReceiver, updateRecipient, name }): any {
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
	await updateRecipient({
	  userId: "kXl9UNbiyfXNHHO36KnF46Vm5Ms2",
	  receiver: { ...values, visible: true }
	});

	onClose();
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
			  countryCode: currentReceiver?.countryCode || "",
			}}
			onSubmit={handleSubmit}
		>
		  <InnerForm name={name}/>
		</Formik>
	  </Modal>
  );
}

const mapDispatchToProps = {
  updateRecipient: updateReceiver
};

export default connect(null, mapDispatchToProps)(UpdateReceiverModal);
