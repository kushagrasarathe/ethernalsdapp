import React from 'react';
import Image from 'next/image';

export default function WelcomeImage( props ) {
  return (
    <Image src={require("../public/cryptodevs/4.svg")} alt="Welcome Picture"
      width={400}
      height={400} />
  )
}
