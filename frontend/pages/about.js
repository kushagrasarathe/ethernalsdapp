import React, { useEffect, useRef, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import Button from "../components/Button";
import { connectWallet } from "../pages/index";


export default function Contact() {

  const [connection, setConnection] = useState(false);

  return (
    <div className="top-3">
      <div className="mt-8 p-12 rounded-md max-w-lg mx-auto shadow-2xl sm:p-3 bg-opacity-90 bg-gray-400  ">
          <div className="text-center">
            <div className="text-black font-semibold">
              <p className="mt-8 text-2xl font-medium text-center">About This Dapp</p>
              <p className="max-w-sm mx-auto p-4 mt-4 text-md font-medium">
                This is a Salary Management Decentralized application that lets an organisation&apos;s admin send payments to their employees in Ethereum.
                <br />
                <br />
                The application allows an admin to add an employee to their list using Add Employee feature and then later pay them salary in ETH using the Pay Salary feature.
                <br />
                <br />
                The application also allows an admin to see all employees under Employees List section.
              </p>
            

          </div>
      </div>
      <NavigationBar>
        {
          !connection ? (<>
            <div className="flex items-end">
              <Button text={"Connected"} onClick={connectWallet} />
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
    </div>      
    </div >
  );
}
