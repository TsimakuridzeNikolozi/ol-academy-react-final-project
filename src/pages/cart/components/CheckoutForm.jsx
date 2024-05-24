import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { useLocalStorage } from "usehooks-ts";
import { useDB } from "../../../hooks/useDB";

const CheckoutForm = () => {
  const { currentUser } = useAuthentication();
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);
  const cartItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const { addOrder } = useDB();
  const [formData, setFormData] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      userId: currentUser.uid,
      items: cartItems,
      ...formData,
    };

    console.log(order);
    await addOrder(order);

    setCartItems([]);
  };

  if (!currentUser || cartItemsCount === 0) return;

  return (
    <Form onSubmit={handleSubmit} className="bg-light p-3">
      <FormGroup>
        <Label for="address1">Address 1</Label>
        <Input
          type="text"
          name="address1"
          id="address1"
          placeholder="Street address, P.O. box, company name, c/o"
          onChange={handleChange}
          required
          className="bg-secondary text-white"
        />
      </FormGroup>
      <FormGroup>
        <Label for="address2">Address 2</Label>
        <Input
          type="text"
          name="address2"
          id="address2"
          placeholder="Apartment, suite, unit, building, floor, etc."
          onChange={handleChange}
          required
          className="bg-secondary text-white"
        />
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="text"
              name="city"
              id="city"
              placeholder="Your city"
              onChange={handleChange}
              required
              className="bg-secondary text-white"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="state">State</Label>
            <Input
              type="text"
              name="state"
              id="state"
              placeholder="Your state"
              onChange={handleChange}
              required
              className="bg-secondary text-white"
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="zip">Zip</Label>
            <Input
              type="text"
              name="zip"
              id="zip"
              placeholder="Your zip code"
              onChange={handleChange}
              required
              className="bg-secondary text-white"
            />
          </FormGroup>
        </Col>
      </Row>
      <Button disabled={cartItemsCount === 0} color="primary">
        Complete Order
      </Button>
    </Form>
  );
};

export default CheckoutForm;
