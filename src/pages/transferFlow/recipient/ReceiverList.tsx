import React from "react";
import ReceiverItem from "./ReceiverItem";
import { Receiver } from "model/receiver";
interface Props {
  receivers: Receiver[];
  handleSelect: any;
  loading: any;
}

export const ReceiverList = ({ receivers,  handleSelect, loading  }: Props) => {
  let m = receivers;

  const receiversList = receivers.map(receiver => {
    if (receiver?.visible || receiver?.visible == undefined) {
      return (
        <div className="tw-beneficiaries__list" onClick={(e) => handleSelect(e, receiver.id)}>
          <ReceiverItem
            key={receiver.id}
            receiver={receiver}
            loading={loading}
          />
        </div>
      );
    }
    return null;
  });

  return <>{receiversList}</>;
};

export default ReceiverList;
