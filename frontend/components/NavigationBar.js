import React, { useEffect, useRef, useState } from "react";
import { ethers, providers, Contract } from "ethers";
import Web3Modal, { Provider } from "web3modal";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";
import Link from "next/link";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UNSD from "./UNSD";

export default function NavigationBar(props) {
  return (
    //fixed top-2 z-50 inset-x-0
    <div className="pt-2">
      <nav className="fixed p-3 mx-2 h-[vh] text-gray-100 inset-x-0 top-3 shadow-2xl sm:rounded-2xl sm:p-3 bg-opacity-70 bg-gray-50 dark:bg-gray-800 flex justify-between items-center rounded-lg overflow-x-auto ">
        <Link href="/">
          <h1 className="text-xl font-bold text-center">LW3HUSTLERS</h1>
        </Link>
        <div className="flex items-center space-x-4 ">
          <Link href="/">
            <a className="text-lg font-medium p-1 hover:bg-slate-400 hover:rounded ease-in">
              Home
            </a>
          </Link>

          <Link href="/about">
            <a className="text-lg font-medium p-1 hover:bg-slate-400 hover:rounded">
              About
            </a>
          </Link>

          <Link href="/team">
            <a className="text-lg font-medium p-1 hover:bg-slate-400 hover:rounded">
              Team
            </a>
          </Link>
        </div>
        <UNSD/>

        {props.children}
      </nav>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </div>
  );
}
