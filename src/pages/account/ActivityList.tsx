
import { Order } from "model/order";
import { Receiver } from "model/receiver";
import ActivityItem from "./ActivityItem";
import { groupBy, findIndex } from "lodash";
import { sortByDate } from "utils/date";
import { startOfDay } from "date-fns";

type Props = {
  selectedActivity: string;
  orders: Order[];
  receivers: Receiver[];
  onClickActivity: any;
  onCancelOrder: any;
  onMarkOrderPaid: any;
  onMarkOrderUnpaid: any;
  onNavigateToPay: any;
  onClickBack: any;
 
};

function ActivityList({
  orders,
  receivers,
  onClickActivity,
  selectedActivity,
  onCancelOrder,
  onMarkOrderPaid,
  onMarkOrderUnpaid,
  onNavigateToPay,
  onClickBack
}: Props) {
  const unpaidOrders = orders.filter(order => !order.paid && !order.markSent && !order.cancelled);
  const inProgressOrders = orders.filter(order => {
    const found = findIndex(unpaidOrders, { id: order.id }) === -1 && order.markSent && !order.paid && !order.cancelled;
    return found;
  });

  const pastOrders = orders.filter(order => {
    const found =
      findIndex(inProgressOrders, { id: order.id }) === -1 && findIndex(unpaidOrders, { id: order.id }) === -1;
    return found;
  });
  

  // startOfDay(new Date(2014, 8, 2, 11, 55, 0))
  var orderList = groupBy(pastOrders, (order) => {
     
    let m = startOfDay(order.orderDate);
    
    return m
  });
  


  /*
  const orderList = groupBy(
    pastOrders.map(order => {
      
      return {
        ...order,
        date:  startOfDay()
      }
    }),
    "orderDate"
  ); */
  
  let list = [];

  Object.keys(orderList).map(key => {
    const activities = [];
    orderList[key].forEach(order => {
      activities.push(order);
    });
    list.push({ date: key, list: activities });
  });

  sortByDate(list);
  
  return (
    <div className="home-activity-list">
      {unpaidOrders.length > 0 && (
        <div className="activity-list-group">
          <div className="sticky-heading sticky-heading--actionbar">
            <div className="row">
              <div className="col-md-6 col-lg-8 m-b-0">
                <h3 className="panel-title h6 warning-text">Needs your attention</h3>
              </div>
            </div>
          </div>
          <div className="panel-inactive">
            <ul className="list-group panel-list-group list-group-slide-out">
              {unpaidOrders.map(order => {
                
                return (
                  <ActivityItem
                    key={order.id}
                    id={order.id}
                    orderId={order.orderId}
                    orderDate={order.orderDate}
                    sentDate={order.sentDate}
                    paidDate={order.paidDate}
                    selectedActivity={selectedActivity}
                    sendAmount={order.sendAmount}
                    receiveAmount={order.receiveAmount}
                    targetCurrency={order.targetCurrency}
                    paid={order.paid}
                    receiverId={order.receiverId}
                    receivers={receivers}
                    cancelled={order.cancelled}
                    needsAttention
                    subtext="Sending paused"
                    markSent={order.markSent}
                    onMarkOrderPaid={() => onMarkOrderPaid(order)}
                    onMarkOrderUnpaid={() => onMarkOrderUnpaid(order)}
                    onCancelOrder={() => onCancelOrder(order)}
                    onNavigateToPay={() => onNavigateToPay(order.orderId, order.receiverId)}
                    onClickActivity={() => onClickActivity(order.id)}
                    onClickBack={() => onClickActivity(null)}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {inProgressOrders.length > 0 && (
        <div className="activity-list-group">
          <div className="sticky-heading sticky-heading--actionbar">
            <div className="row">
              <div className="col-md-6 col-lg-8 m-b-0">
                <h3 className="panel-title h6 text-info">In progress</h3>
              </div>
            </div>
          </div>
          <div className="panel-inactive">
            <ul className="list-group panel-list-group list-group-slide-out">
              {inProgressOrders.map(order => {
                return (
                  <ActivityItem
                    key={order.id}
                    id={order.id}
                    orderId={order.orderId}
                    orderDate={order.orderDate}
                    sentDate={order.sentDate}
                    paidDate={order.paidDate}
                    selectedActivity={selectedActivity}
                    sendAmount={order.sendAmount}
                    receiveAmount={order.receiveAmount}
                    targetCurrency={order.targetCurrency}
                    paid={order.paid}
                    receiverId={order.receiverId}
                    receivers={receivers}
                    cancelled={order.cancelled}
                    subtext="Sending"
                    markSent={order.markSent}
                    onMarkOrderPaid={() => onMarkOrderPaid(order)}
                    onMarkOrderUnpaid={() => onMarkOrderUnpaid(order)}
                    onNavigateToPay={() => onNavigateToPay()}
                    onCancelOrder={() => onCancelOrder(order)}
                    onClickActivity={() => onClickActivity(order.id)}
                    onClickBack={onClickBack}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {list.map(order => {
        
        return (
          <div className="activity-list-group">
            <div className="sticky-heading sticky-heading--actionbar">
              <div className="row">
                <div className="col-md-6 col-lg-8 m-b-0">
                  <h3 className="panel-title h6 ">{order.list[0].orderDate}</h3>
                </div>
              </div>
            </div>
            <div className="panel-inactive">
              <ul className="list-group panel-list-group list-group-slide-out">
                {order.list.map(order => {
                  return (
                    <ActivityItem
                      key={order.id}
                      id={order.id}
                      orderId={order.orderId}
                      orderDate={order.orderDate}
                      sentDate={order.sentDate}
                      paidDate={order.paidDate}
                      selectedActivity={selectedActivity}
                      sendAmount={order.sendAmount}
                      receiveAmount={order.receiveAmount}
                      targetCurrency={order.targetCurrency}
                      paid={order.paid}
                      receiverId={order.receiverId}
                      receivers={receivers}
                      cancelled={order.cancelled}
                      subtext={order.cancelled ? "Cancelled" : "Sent"}
                      markSent={order.markSent}
                      onNavigateToPay={() => onNavigateToPay()}
                      onMarkOrderPaid={() => onMarkOrderPaid(order)}
                      onMarkOrderUnpaid={() => onMarkOrderUnpaid(order)}
                      onCancelOrder={() => onCancelOrder(order)}
                      onClickActivity={() => onClickActivity(order.id)}
                      onClickBack={onClickBack}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ActivityList;
