import React from "react";

import Footer from "../Common/Footer/Footer";
import Hero from "../Common/Hero/Hero";
import locationImage from "../../images/location.jpg";
import "./styles.css";

const Location = () => {
  return (
    <>
      <Hero
        backgroundImage={locationImage}
        heading1="Location"
        heading2="Business hours &ndash; Tue &ndash; Sun, 5pm &ndash; 11pm"
      />

      <section className="block-contact">
        <div className="container ">
          <header>
            <h3>For all other questions, please use the form.</h3>
          </header>
          <div className="row">
            <div className="col-sm-6">
              <form
                className="mb-3"
                action="https://formspree.io/f/mdoyngnd"
                method="POST"
              >
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name *
                  </label>
                  <input
                    type="text"
                    className="form-control control__dark"
                    id="name"
                    name="name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile No *
                  </label>
                  <input
                    type="text"
                    className="form-control control__dark"
                    id="mobile"
                    name="mobile"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="form-control control__dark"
                    id="email"
                    name="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    className="form-control control__dark"
                    name="message"
                    id="message"
                    cols="30"
                    rows="4"
                    maxLength="200"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </form>
            </div>
            <div className="col-sm-6">
              <iframe
                id="iframe__maps"
                title="google_maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1118.53411396737!2d102.8210223183558!3d2.506170575280785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cfd324bc195121%3A0x7b949c2e6e69ffa0!2sThe%20Bricks%20Cafe!5e0!3m2!1sen!2smy!4v1616831106885!5m2!1sen!2smy"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
              <dl className="contact__description">
                <dt>ABC Restaurant</dt>
                <dd>John Smith</dd>
                <dd>
                  <i className="fas fa-phone-alt"></i> 012-345 6789
                </dd>
                <dd>
                  <i className=" fas fa-envelope"></i> abc@domain.com
                </dd>
                <dd>
                  <i className="fas fa-map-marked-alt"></i>123, Jalan ABC 34567 Tangkak,Johor,Malaysia
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Location;
