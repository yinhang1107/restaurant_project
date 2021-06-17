import React from "react";

import Footer from "../Common/Footer/Footer";
import Hero from "../Common/Hero/Hero";
import reservationImage from '../../images/reservation_background.jpg';
import roomPicture from "../../images/reservation_room.jpg";
import "./styles.css";

const Reservation = () => {
  return (
    <>
      <Hero
        backgroundImage={reservationImage}
        heading1="Reservation"
        heading2="We accept a limited number of reservations up to one month in
                advance for parties of up to ten guests."
      />

      <section className="py-3 text-center">
        <div className="container">
          <h3 className="mt-5 fw-bold">MAKE A RESERVATION </h3>
        </div>
        <a
          href="http://www.tableagent.com"
          className="btn btn-dark btn-find-table"
          target="_blank"
          rel="noreferrer"
        >
          FIND A TABLE
        </a>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="description col-sm-6 ">
              <h3>By Phone</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa
                nisi fugit sed laboriosam eveniet expedita?
              </p>
            </div>
            <div className="col-sm-6">
              <h3>Special Event &#038; Private Parties</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, ad
                ipsam repudiandae explicabo corporis laudantium quia possimus
                eligendi amet libero molestias, assumenda beatae fuga debitis.
                Doloremque repudiandae ratione aut esse!
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <img
          className="w-100"
          style={{ minHeight: "200px", maxHeight: '650px' }}
          src={roomPicture}
          alt="restaurant"
        />
      </div>
      <section>
        <div className="container py-5 px-3">
          <div className="row">
            <div className="description col-sm-6">
              <h3>The Big Room</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur fugit unde, consequuntur illum omnis magni minima
                distinctio adipisci nisi, maiores, quae mollitia itaque
                molestias temporibus ratione numquam quia corporis. Architecto,
                eius sapiente. Voluptatem repudiandae, est nam nostrum sapiente
                distinctio minima!
              </p>
            </div>
            <div className="col-sm-6">
              <h3>The Small Room</h3>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
                aspernatur dicta necessitatibus libero! Praesentium placeat
                numquam magnam illo nihil accusamus debitis! Iusto unde, velit
                consequuntur sint fugit quae tempore eius? Sunt cum animi
                quaerat vitae, delectus minima. Eum ullam dolor, quas ut soluta
                sit optio!
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Reservation;
