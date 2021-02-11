import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { RootState } from "app/rootReducer";
import { useAuth } from "contexts/Firebase";
import { selectRecipient } from "store/receiver/receiverSlice";
import { updateOrderAction } from "store/order/orderSlice";
import { Order } from "model/order";
import ActivityList from "./ActivityList";
import PreloadAccountIndicator from "./PreloadAccountIndicator";
import { useWindowSize } from "hooks";
interface Props {
  selectedActivity: string;
  onChangeActivity: any;
  isMobile: boolean;
  isTablet: boolean;
}

function AccountHome({ selectedActivity, onChangeActivity, isMobile }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();

  const { userId } = useAuth();
  const user = useSelector((state: RootState) => state.user);
  const { fetchingReceivers, receivers } = useSelector((state: RootState) => state.receivers);
  const { fetchingOrders, orders } = useSelector((state: RootState) => state.order);

  const handleCancelOrder = async (order: Order) => {
          await dispatch(updateOrderAction({ userId, order: { ...order, cancelled: true } }));
    onChangeActivity(null);
  };

  const handleMarkOrderPaid = async (order: Order) => {
      
    await dispatch(updateOrderAction({ userId, order: { ...order, status: 'checkAccount', markSent: true } }));
    onChangeActivity(order.id);
  };
  const handleMarkOrderUnpaid = async (order: Order) => {
    await dispatch(updateOrderAction({ userId, order: { ...order, status: 'notPaid', markSent: false } }));
    onChangeActivity(order.id);
  };

  const handleNavigateToPay = async (orderId: string, receiverId: string) => {
    dispatch(selectRecipient(receiverId));
    navigate(`/transfer/pay/${orderId}`, { replace: true, state: null });
  };
  const { width } = useWindowSize();
  return (
    <>
      <div className="nav-toolbar p-t-1">
        <div className="balance-carousel"></div>
      </div>

      {user.loading === "pending" ||
      fetchingReceivers === "pending" ||
      fetchingOrders === "pending" ||
      !receivers ||
      !orders ? (
        <PreloadAccountIndicator />
      ) : (
        <div className="container full-height-container__home">
          <div className="sticky-heading--search sticky-heading--search-home">
            <div className="activity-list-group activity-list-group-header">
              <div className="row">
                <div className="col-md-12 m-b-0">
                  <h3
                    className={`panel-title h6 search-title ${
                      width < 768 ? "search-title__mobile" : "search-title__desktop"
                    }`}
                  >
                    <div>
                      <span>All activity</span>
                    </div>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <ActivityList
            selectedActivity={selectedActivity}
            orders={orders}
            receivers={receivers}
            onMarkOrderPaid={handleMarkOrderPaid}
            onMarkOrderUnpaid={handleMarkOrderUnpaid}
            onCancelOrder={handleCancelOrder}
            onNavigateToPay={handleNavigateToPay}
            onClickActivity={onChangeActivity}
            onClickBack={onChangeActivity}
          />
        </div>
      )}
    </>
  );
}

export default AccountHome;
