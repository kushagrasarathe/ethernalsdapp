import React, { useEffect, useRef, useState } from "react";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";
import Button from "../components/Button";
import NavigationBar from "../components/NavigationBar";
import { ethers, providers, Contract } from "ethers";
import Web3Modal, { Provider } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Addemployee() {

  const [connection, setConnection] = useState(false);
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState(0);
  const [loading, setLoading] = useState();
  const web3ModalRef = useRef();
  const [account, setAccount] = useState("");
  const [Signer, setSigner] = useState();
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
  }, [])

  // hash
  const shortenHash = (hash = '', charLength = 6, postCharLength) => {
    let shortendHash;
    if (postCharLength) {
      shortendHash =
        hash.slice(0, charLength) + '...' + hash.slice(hash.length - postCharLength, hash.length);
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
    } 
    else if (error.message.includes("User denied transaction.")) {
      toast("User Denied Connection");
      //toast.error("Transaction has been cancelled");
    } 
    else {
      notify(error.message);
    }
  };
  
  // providersigner();
  const getProviderOrSigner = async (needSigner = true) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork()

    if (chainId != 80001) {
      throw new Error("Please Change Network To Mumbai");
    }
    const signer = web3Provider.getSigner()
    const userAccount = await signer.getAddress()
    setSigner(userAccount);

    // set the Signer to localStorage
    localStorage.setItem('userAccount', userAccount);
    return signer;
  }
  const providerOptions = {
    walletconnect: WalletConnectProvider
  }

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
      console.error(e)
      checkForError(e);
    }
  }

  const addEmployee = async () => {
    setLoading();
    try {

      const signer = await getProviderOrSigner();

      const salContract = new Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const tx = await salContract.addEmployee(address, position);
      await tx.wait();
      toast("Employee Added")
      console.log("Transaction Completed");
      
    } catch (e) {
      console.log(e);
      checkForError(e);
    }
    setLoading();
  }


  return (
    <>
      {/* Add Employee Section */}
      

      <div className="flex items-center justify-center">
        <div className=" p-12 rounded-md max-w-lg mx-auto shadow-2xl sm:p-3 bg-opacity-50 bg-gray-400 ">
          <p className="text-center text-4xl font-bold">
            Enter Employee Details
          </p>
          <div className="space-x-4 mt-4 text-center">
            <input
              value={address}
              onChange={(e) => {
                setAddress(e.currentTarget.value);
              }}
              type="text"
              id="address"
              className="mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Address"
              required
            />
          </div>

          <div className="space-x-4 mt-4 text-center">
            <select
              value={position}
              onChange={(e) => {
                setPosition(e.target.value);
              }}
              name=""
              id=""
              className="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option className="intern" value="0">
                Intern
              </option>
              <option className="junior" value="1">
                Junior
              </option>
              <option className="senior" value="2">
                Senior
              </option>
            </select>
          </div>
          <div className="space-x-4 mt-4 text-center">
            <div id="addEmp" className="flex m-5">
              <Button onClick={addEmployee} text="Add Employee" />
            </div>
          </div>
        </div>
      </div>

      <NavigationBar>
          {
            !connection ? (<>
            <div className="flex items-end">
            <Button text={"Connect Wallet"} onClick={connectWallet}/>
            </div>
            </>
            ) : (
            <> 
            <div className="flex items-end">
            <Button text={shortenHash(Signer, 5, 5)} /> 
            </div>
            </>)
          }
      </NavigationBar>
        

    </>
  );
}
