import React from "react";

import Footer from "../Common/Footer/Footer";
import Hero from "../Common/Hero/Hero";
import gallery1 from "../../images/gallery_beefsteak.jpeg";
import gallery2 from "../../images/gallery_spaghetti.jpg";
import gallery3 from "../../images/gallery_dessert.jpg";
import homeImage from "../../images/main_page.jpg";
import reservationImage from "../../images/reservation_background.jpg";
import aboutImage from "../../images/about_us_image.jpg";
import "./styles.css";

const Home = () => {
  return (
    <>
      <Hero
        backgroundImage={homeImage}
        heading1='Explore. Eat. Enjoy.'
        heading2="Best Chop House in Malaysia."
      />
      <section className="py-5">
        <div className="container text-center">
          <h2>A DESTINATION</h2>
          <p className="introduction__description text-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde totam
            ipsum odit, porro dolorum, nobis dignissimos, saepe corrupti
            incidunt ab et fuga officia molestias? Necessitatibus quae adipisci
            consequatur tenetur quasi.
          </p>
        </div>
      </section>
      <Hero
        backgroundImage={reservationImage}
        heading1="Eat Together."
        heading2="Every plate achieves that elusive, cuisine-defining balance of sweet, salty, and sour — even dessert."
        link="https://tableagent.com/"
        buttonName="MAKE A RESERVATION"
      />
      <section className="py-5">
        <div className="container gallery">
          <div className="gallery__images">
            <img src={gallery1} alt="beef steak" />
            <img src={gallery2} alt="spaghetti" />
            <img src={gallery3} alt="dessert" />
          </div>
          <a href="/menu">
            <button className="btn btn-outline-dark gallery-btn">
              VIEW MENUS
            </button>
          </a>
        </div>
      </section>
      <Hero backgroundImage={aboutImage} heading1="About Us" />
      <section className="py-5 block-about">
        <div className="container">
          <h3 className="fw-bold">Our Story</h3>
          <div className="row">
            <div className="col-sm">
              <p className="first__paragraph">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi quae corporis corrupti voluptatibus omnis dolorum
                voluptate saepe excepturi fuga delectus quasi vero, odit
                dolorem! Et enim atque iste ipsum obcaecati.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                incidunt, architecto unde fugiat enim ex soluta vitae quasi
                mollitia non beatae reiciendis corporis cumque placeat!
                Blanditiis ipsam porro sint. Nesciunt maiores, odit nisi
                perferendis voluptates facere blanditiis ea ducimus vitae!
              </p>
            </div>
            <div className="col-sm">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi quae corporis corrupti voluptatibus omnis dolorum
                voluptate saepe excepturi fuga delectus quasi vero, odit
                dolorem! Et enim atque iste ipsum obcaecati.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                incidunt, architecto unde fugiat enim ex soluta vitae quasi
                mollitia non beatae reiciendis corporis cumque placeat!
                Blanditiis ipsam porro sint. Nesciunt maiores, odit nisi
                perferendis voluptates facere blanditiis ea ducimus vitae!
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
