import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Item, Cart, User } from "./pages";
import { Header, Footer } from "./components";
import { NAVIGATION_ROUTES } from "./constants";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={NAVIGATION_ROUTES.home} element={<Home />} />
          <Route path={NAVIGATION_ROUTES.item} element={<Item />} />
          <Route path={NAVIGATION_ROUTES.cart} element={<Cart />} />
          <Route path={NAVIGATION_ROUTES.user} element={<User />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
