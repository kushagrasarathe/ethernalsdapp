import React, { useEffect, useRef, useState } from "react";
import { ethers, providers, Contract } from "ethers";
import Web3Modal, { Provider } from "web3modal";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";
import Link from "next/link";
import Button from "../components/Button";
import NavigationBar from "../components/NavigationBar";
import Image from "../components/WelcomeImage";
import SideBar from "../components/SideBar";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
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
      //toast.error("Transaction has been cancelled");
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

  return (
    <>
      <div className="">
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

        <div className="text-center">
          <span className="text-white text-3xl font-semibold font-mono">
            Welcome to Salary Management Dapp
          </span>
          <div className="mt-8 p-12 rounded-md max-w-lg mx-auto shadow-2xl sm:p-3 bg-opacity-90 bg-gray-400  ">
          <div className="text-center">
            <div className="text-black font-semibold">
            This is a Infrastructure Tooling Dapp powered by Polygon. 
            </div>
            </div>
            </div>
        </div>
      </div>

      <div className="mt-16 flex justify-center">
            <Image/>
      </div>

    </>
  );
}
