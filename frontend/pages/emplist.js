import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import NavigationBar from "../components/NavigationBar";
import { connectWallet } from "../pages/index";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";
import { ethers, providers, Contract } from "ethers";
import Web3Modal, { Provider } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Emplist() {
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState(0);

  const [account, setAccount] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);

  const [Signer, setSigner] = useState();
  const [loading, setLoading] = useState();

  const [connection, setConnection] = useState(false);
  const web3ModalRef = useRef();
  const notify = (message) => toast(`${message}`);

  // clear input field
  React.useEffect(() => {
    setLoading(true);
  }, []);

  // check wallet connection
  useEffect(() => {
    if (!connection) {
      connectWallet();
    }
  }, []);

  // hash
  const shortenHash = (hash = "", charLength = 6, postCharLength) => {
    let shortendHash;
    if (postCharLength) {
      shortendHash =
        hash.slice(0, charLength) +
        "..." +
        hash.slice(hash.length - postCharLength, hash.length);
    } else {
      shortendHash = hash.slice(0, charLength);
    }
    return shortendHash;
  };

  // Error Checking
  const checkForError = (error) => {
    if (error.hasOwnProperty("data")) {
      console.log(error.data.message);
      return;
    }
    if (error.message.includes("reverted")) {
      console.log(error.error.message);
    } else if (error.message.includes("User denied transaction.")) {
      toast("User Denied Connection");
    } else {
      notify(error.message);
    }
  };

  // providersigner();
  const getProviderOrSigner = async (needSigner = true) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();

    if (chainId != 80001) {
      throw new Error("Please Change Network To Mumbai");
    }
    const signer = web3Provider.getSigner();
    const userAccount = await signer.getAddress();
    setSigner(userAccount);

    // set the Signer to localStorage
    localStorage.setItem("userAccount", userAccount);
    return signer;
  };
  const providerOptions = {
    walletconnect: WalletConnectProvider,
  };

  //connecting wallet
  const connectWallet = async () => {
    try {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions,
        disableInjectedProvider: false,
      });
      await getProviderOrSigner();
      setConnection(true);
    } catch (e) {
      console.error(e);
      checkForError(e);
    }
  };

  // Get Employees Function
  const getAllEmps = async () => {
    setLoading();
    try {
      const signer = await getProviderOrSigner();

      const salContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      let getAllEmpsPromise = salContract.getAllEmployees();
      let Emps = await getAllEmpsPromise;

      toast("Here's your Employees List");
      console.log(Emps);
      console.log("Done");

      let interns = document.getElementById("interns");
      let juniors = document.getElementById("juniors");
      let seniors = document.getElementById("seniors");

      let internList = Emps[0];
      let juniorList = Emps[1];
      let seniorList = Emps[2];

      printList(interns, internList);
      printList(juniors, juniorList);
      printList(seniors, seniorList);

      console.log("Interns: " + Emps[0]);
      console.log("Juniors: " + Emps[1]);
      console.log("Seniors: " + Emps[2]);
    } catch (e) {
      console.log(e);
      checkForError(e);
    }
    setLoading();
  };

  function printList(id, array) {
    for (let k = 0; k < array.length; k++) {
      
      let tr = document.createElement("tr");
      let td = document.createElement("td");

      td.appendChild(document.createTextNode(`${(k+1)}. ${array[k]}`));
      tr.appendChild(td);
      id.appendChild(tr);
    }
  }

  return (
    <>
      {/* Get Employee List */}
      <div className="top-3">
        <div className="mt-8 p-12 rounded-md max-w-lg mx-auto shadow-2xl sm:p-3 bg-opacity-50 bg-gray-400">
          <p className="text-center text-4xl font-bold ">
          List All Employees 
          </p>

          <div className="space-x-4 mt-4 text-center">
            <div id="addEmp" className="flex m-5">
              <Button onClick={getAllEmps} text="Show List" />
            </div>
          </div>
        </div>
      </div>

      <div className="top-3">
        <div className="mt-8 p-12 rounded-md max-w-lg mx-auto shadow-2xl sm:p-3 bg-opacity-90 bg-gray-400  ">
          <table className=" p-12 rounded-md max-w-lg mx-auto sm:p-3 table-auto text-black ">
            <thead className="text-white text-center text-2xl font-semibold ">
              <tr>
                <h3 className="text-black text-center text-2xl font-semibold">
                  Interns
                </h3>
                <th className="text-2xl text-center"></th>
              </tr>
            </thead>

            <tbody id="interns" className="text-center"></tbody>
          </table>
        </div>

        <div className="mt-8 p-12 rounded-md max-w-lg mx-auto shadow-2xl sm:p-3 bg-opacity-90 bg-gray-400  ">
          <table className=" p-12 rounded-md max-w-lg mx-auto sm:p-3  table-auto text-black ">
            <thead className="text-white text-center text-2xl font-semibold ">
              <tr>
                <h3 className="text-black text-center text-2xl font-semibold">
                  Juniors
                </h3>
                <th className="text-2xl text-center"></th>
              </tr>
            </thead>

            <tbody id="juniors" className="text-center"></tbody>
          </table>
        </div>

        <div className="mt-8 p-12 rounded-md max-w-lg mx-auto shadow-2xl sm:p-3 bg-opacity-90 bg-gray-400  ">
          <table className=" p-12 rounded-md max-w-lg mx-auto sm:p-3  table-auto text-black ">
            <thead className="text-white text-center text-2xl font-semibold ">
              <tr>
                <h3 className="text-black text-center text-2xl font-semibold">
                  Seniors
                </h3>
                <th className="text-2xl text-center"></th>
              </tr>
            </thead>

            <tbody id="seniors" className="text-center"></tbody>
          </table>
        </div>
      </div>

      <NavigationBar>
        {!connection ? (
          <>
            <div className="flex items-end">
              <Button text={"Connect Wallet"} onClick={connectWallet} />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-end">
              <Button text={shortenHash(Signer, 5, 5)} />
            </div>
          </>
        )}
      </NavigationBar>
    </>
  );
}
