import React from 'react';
import Image from 'next/image';

export default function WelcomeImage( props ) {
  return (
    <Image src="/../cryptodevs/4.svg" alt="Picture of the author"
      width={400}
      height={400} />
  )
}
