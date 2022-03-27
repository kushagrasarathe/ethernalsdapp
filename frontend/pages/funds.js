import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import NavigationBar from "../components/NavigationBar";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";
import { ethers, providers, Contract } from "ethers";
import Web3Modal, { Provider } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Funds() {



  const [address, setAddress] = useState("");
  const [position, setPosition] = useState(0);
  
  const [amount, setAmount] = useState("");

  const [account, setAccount] = useState("");
  const [walletConnected, setWalletConnected] = useState(false)

  const [Signer, setSigner] = useState()
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

  const getBalance = async () => {
    setLoading();
    try {

      const signer = await getProviderOrSigner();

      const salContract = new Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      let getBalance = salContract.getContractBalance();
      let balance = await getBalance;
      console.log(balance.toString());
      let bal = parseFloat(balance.toString())/1000000000000000000;
      console.log(bal)

      let balField = document.getElementById("displayBal");
      balField.innerHTML= `Contract Balance is ${bal} ETH`;

      toast("Balance Fetched")
      console.log("Done");
      
    } catch (e) {
      console.log(e);
      checkForError(e);
    }
    setLoading();
  }

  const addFundToContract = async () => {
    setLoading();
    try {

      const signer = await getProviderOrSigner();

      const salContract = new Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      let addFunds = salContract.acceptPayment({
        value: ethers.utils.parseEther(amount),
      });
      let funds = await addFunds;
      console.log(funds);

      toast("Funds Added To Contract")
      console.log("Done");
      
    } catch (e) {
      console.log(e);
      checkForError(e);
    }
    setLoading();
  }

  return (
    <>
     {/* Add Funds To Contract  &&  Get Contract Balance*/}
     <div className="top-3">
        <div className="mt-8 p-12 rounded-md max-w-lg mx-auto shadow-2xl sm:p-3 bg-opacity-50 bg-gray-400 ">
          <p className="text-center text-4xl font-bold">
            Enter Amount Below
          </p>
          <div className="space-x-4 mt-4 text-center">
            <input
              value={amount}
              onChange={(e) => {
                 setAmount(e.currentTarget.value);
              }}
              type="text"
              id="amount"
              className="mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Amount"
              required
            />
          </div>

          <div className="space-x-4 mt-4 text-center">
            
          </div>

          <div className="flex justify-center mt-4 text-center">
            <div id="addEmp" className="flex m-5">
              <Button onClick={addFundToContract} text="Add Funds" />
            </div>
            <div id="addEmp" className="flex m-5">
              <Button onClick={getBalance} text="Get Balance" />
            </div>
          </div>
          
        </div>
      </div>

      <div className="top-3">
        <div className="mt-8 p-12 rounded-md max-w-lg mx-auto shadow-2xl sm:p-3 bg-opacity-90 bg-gray-400  ">
          <p className=" p-12 rounded-md max-w-lg mx-auto sm:p-3 text-black ">
              
              <h1 className="text-black text-2xl font-semibold text-center">  
                  
                  <span id="displayBal">

                  </span>
              </h1>
              
          </p>
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
  )
}
