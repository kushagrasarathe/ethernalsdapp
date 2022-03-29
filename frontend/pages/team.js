import React, { useEffect, useRef, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import Button from "../components/Button";
import { connectWallet } from "./index";
import Link from "next/link";

export default function Team() {
  const [connection, setConnection] = useState(false);

  return (
    <div className="mt-8 p-12 rounded-md max-w-lg mx-auto shadow-2xl sm:p-3 bg-opacity-90 bg-gray-400  ">
      <div className="text-center">
        <div className="text-black font-semibold">
          <div className="text-center">
            <div className="font-semibold">
              <p className="mt-8 text-2xl font-medium text-center">
                Team Members
              </p>
              <p className="max-w-sm mx-auto p-4 mt-4 text-md font-medium">
                These our team members who created this amazing dapp.
              </p>
              
              <Link href="https://twitter.com/kushagrasarathe">
                Kushagra Sarathe
              </Link>
<br />
              <Link href="https://twitter.com/prasannaj_dev">
              Prasanna
              </Link>

<br />
              <Link href="https://twitter.com/rahul3526/">
                Rahul Singh
              </Link>
<br />

              <Link href="https://twitter.com/__RahulPathak__">
                Rahul Pathak
              </Link>
<br />

              <Link href="https://twitter.com/manoharsspace">
                Manohar
              </Link>
            </div>
          </div>
        </div>

        <NavigationBar>
          {!connection ? (
            <>
              <div className="flex items-end">
                <Button text={"Connected"} onClick={connectWallet} />
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
      </div>
    </div>
  );
}
