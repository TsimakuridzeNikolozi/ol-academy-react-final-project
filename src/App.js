import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Item, Cart, OrderHistory } from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item" element={<Item />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
