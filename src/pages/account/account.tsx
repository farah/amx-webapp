import React from "react";
import { Routes, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useWindowSize } from "hooks";
import { AppDispatch } from "app/store";
import { RootState } from "app/rootReducer";
import { useAuth } from "contexts/Firebase";
import { fetchUser } from "store/user/userSlice";
import { fetchRecipients, selectRecipient } from "store/receiver/receiverSlice";
import { fetchOrdersAction } from "store/order/orderSlice";
import { selectActivity, setOrderId } from "store/flow/flowSlice";
import LoadingSpinner from "components/LoadingSpinner";
import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";
import Heading from "./Heading";
import AccountHome from "./AccountHome";
import Recipients from "./recipients";
import { PrivateRoute } from "utils/routes";

// 568px
// 992spx

function Account() {
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();
  const { orderId } = useParams();
  const { width } = useWindowSize();
  const user = useSelector((state: RootState) => state.user);
  const { fetchingReceivers, receivers } = useSelector((state: RootState) => state.receivers);
  const { fetchingOrders, orders } = useSelector((state: RootState) => state.order);
  const { selectedActivityId } = useSelector((state: RootState) => state.transferFlow);
  // const [selectedActivity, setActivity] = React.useState(null);
  const { userId } = useAuth();

  const isMobile = width < 568;
  const isDesktop = width > 992;
  const isTablet = width < 768;

  const style = {
    marginTop: isMobile || isTablet ? "" : ""
  };
  React.useEffect(() => {
    dispatch(setOrderId(null));
    async function initializeData() {
      await dispatch(fetchUser(userId));
      await dispatch(fetchRecipients(userId));
      await dispatch(fetchOrdersAction({ userId }));
    }
    initializeData();
  }, []);

  const handleSendMoney = async () => {
    navigate(`/transfer`);
  };

  const handleChangeActivity = id => {
    const ordersId = id !== selectedActivityId ? id : null;
    dispatch(selectActivity(ordersId));
  };


  console.log('selectedActivityId', selectedActivityId)
  return (
    <>
      {false ? (
        <LoadingSpinner loading={true} />
      ) : (
        <>
          <div className="amx-shared-css page-layout column-layout">
            {width < 568 && <MobileNav />}
            {width > 768 && (
              <Sidebar onSendMoney={handleSendMoney} isMobile={isMobile} isTablet={isTablet} isDesktop={isDesktop} />
            )}

            <div className="column-layout-main">
              <Heading
                onClickBack={handleChangeActivity}
                isMobile={isMobile}
                isTablet={isTablet}
                isDesktop={isDesktop}
              />
              <div
                className={`container-content ${isMobile ? "container-content--with-mobile-nav" : ""}`}
                style={style}
              >
                <Routes>
                  <PrivateRoute
                    path=""
                    element={
                      <AccountHome
                        selectedActivity={selectedActivityId}
                        onChangeActivity={handleChangeActivity}
                        isMobile={isMobile}
                        isTablet={isTablet}
                      />
                    }
                  />
                  <PrivateRoute
                    path="recipients"
                    element={<Recipients receivers={receivers} onSendMoney={handleSendMoney} />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Account;
