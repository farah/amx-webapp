import { Receiver } from "model/receiver";
import ReceiverItem from "./ReceiverItem";

type Props = {
  receivers: Receiver[];
  selectedReceiverId: string;
  onSelectReceiver: any;
  onDeleteReceiver: any;
  deletingReceiver: string;
  onSendMoney: any;
};

function ReceiverList({
  receivers,
  selectedReceiverId,
  onSelectReceiver,
  onDeleteReceiver,
  deletingReceiver,
  onSendMoney
}: Props) {
  const activeClass = "TrackingItem-module_active__383Xc TrackingItem-module_success__35RX1";

  return (
    <>
      <ul className="list-group list-group-inactive">
        {receivers
          .filter(receiver => receiver.visible)
          .map(receiver => (
            <ReceiverItem
              receiver={receiver}
              selectedReceiverId={selectedReceiverId}
              onSelectReceiver={() => onSelectReceiver(receiver.id)}
              onDeleteReceiver={() => onDeleteReceiver(receiver.id)}
              deletingReceiver={deletingReceiver}
              onSendMoney={onSendMoney}
            />
          ))}
      </ul>
    </>
  );
}

export default ReceiverList;
