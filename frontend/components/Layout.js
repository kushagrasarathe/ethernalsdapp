import React from "react";
import NavigationBar from "./NavigationBar";
import SideBar from "./SideBar";

export default function Layout({ children }) {
  return (
    <>
      <div className="">
        <NavigationBar />
        <SideBar />
      </div>
      {/* <footer className="text-white items-end flex justify-end" >
        Made with &#10084; by LW3N00BS
      </footer> */}
      {children}
    </>
  );
}
