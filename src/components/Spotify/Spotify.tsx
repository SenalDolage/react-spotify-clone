import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

export default function Spotify() {
  return (
    <div className="spotify min-h-[100vh]">
      <div className="spotify-content bg-gradient-to-r from-green-800 to-green-600 min-h-[90vh]">
        <div className="body-wrap px-10">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="left-col col-span-1">
              <Sidebar />
            </div>
            <div className="right-col inner-body-content col-span-3">
              <Header />
            </div>
          </div>
        </div>
      </div>

      <div className="footer-wrap min-h-[10vh]">
        <Footer />
      </div>
    </div>
  );
}
