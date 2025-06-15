import React from "react";


function HomeBanner() {
  return (
    <div className="py-16 md:py-0 bg-shop_light_pink rounded-lg px-10 lg:px-24 flex items-center justify-between">
      <div className="promo-banner">
        <h1 className="promo-title">
          Enjoy Up to <span className="highlight">50% Off</span> on <br />{" "}
          Selected Items
        </h1>
        <h2 className="promo-subtitle">
          Discover exclusive deals on a curated selection of products — <br />{" "}
          limited-time offer while stocks last.
        </h2>
      </div>
      <div></div>
    </div>
  );
}

export default HomeBanner;
