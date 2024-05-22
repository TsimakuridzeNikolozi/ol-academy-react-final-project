import React from "react";
import FragranceList from "./components/FragranceList";

const Home = () => {
  return (
    <div>
      <div className="p-4">
        <h1 className="h-4 h-3-md h-2-lg h-1-xl text-center my-3">
          Discover Your Signature Scent with Our Fragrance Explorer
        </h1>
        <p className="h-6 h-5-md h-3-lg text-center">
          Dive into our extensive collection of fragrances. Whether you prefer
          floral, woody, oriental, or fresh notes, we have the perfect scent
          waiting for you. Start exploring now!
        </p>
      </div>

      <FragranceList />
    </div>
  );
};

export default Home;
