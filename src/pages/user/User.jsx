import React, { useMemo } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { Container, ListGroup } from "reactstrap";
import { useDB } from "../../hooks/useDB";
import OrderCard from "./components/OrderCard";

const User = () => {
  const { currentUser } = useAuthentication();
  const { userOrdersList, getUserOrdersList } = useDB();

  useMemo(async () => {
    if (currentUser) {
      await getUserOrdersList(currentUser.uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  console.log(userOrdersList);

  return (
    <Container
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column gap-3"
    >
      <div>
        <h1>User</h1>

        <div className="d-flex align-items-center gap-4 flex-wrap bg-light p-3">
          <img
            src={currentUser?.photoURL}
            alt={currentUser?.displayName}
            style={{ borderRadius: "100%" }}
          />
          <h3>{currentUser?.displayName}</h3>
          <h3>{currentUser?.email}</h3>
        </div>
      </div>

      <div>
        <h2>My Orders</h2>

        <ListGroup className="p-3 p-sm-6 bg-light">
          {userOrdersList.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </ListGroup>
      </div>
    </Container>
  );
};

export default User;
