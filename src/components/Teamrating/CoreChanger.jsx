import React, { useEffect, useState } from "react";
import CartCoreChanger from "./cartCoreChanger";

export default function CoreChanger({ badgesId }) {
  return (
    <>
      <section className="tf-section our-creater dark-style2">
        <div className="topcore-header">
          <h2 className="tf-title style2 stylealight mb-25 text-left tf-title-top">
            Core Squads
          </h2>
        </div>
        <div className="_container">
          <div className="name-title-core header-core-none  ">
            <p className="img-name">
              <div className="margin-text">Core Squad</div>
            </p>
            <p className="core-member">Core Warrior</p>
            <p className="lead-item">Lead</p>
            <p className="value-power-item mobile-none">Value Power</p>
          </div>
          <CartCoreChanger badgesId={badgesId} />
        </div>
      </section>
    </>
  );
}
