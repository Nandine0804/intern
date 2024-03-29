import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function AppFooter() {
  return (
    // Footer component
    <MDBFooter
      bgColor="light"
      id="contact"
      className="text-center text-lg-left"
    >
      {/* Footer content */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        {/* Copyright information */}
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-dark" href="https://www.linkedin.com/in/nandine/">
          by NANDINE S S
        </a>
        <div className="rounded-social-buttons">
          <a
            className="social-button facebook"
            href="https://www.facebook.com/"
            target="_blank"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            className="social-button twitter"
            href="https://www.twitter.com/"
            target="_blank"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            className="social-button linkedin"
            href="https://www.linkedin.com/in/nandine/"
            target="_blank"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            className="social-button youtube"
            href="https://www.youtube.com/"
            target="_blank"
          >
            <i className="fab fa-youtube"></i>
          </a>

        </div>
      </div>
    </MDBFooter>
  );
}
