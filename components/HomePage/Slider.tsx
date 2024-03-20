import React from "react";
import Image from "next/image";

export default function Slider() {
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%) mb-10">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        <li>
          <Image src="/fb.svg" width={60} height={30} alt="Facebook" />
        </li>
        <li>
          <Image src="/x.svg" width={60} height={30} alt="Disney" />
        </li>
        <li>
          <Image src="/instagram.svg" width={60} height={30} alt="Airbnb" />
        </li>
        <li>
          <Image src="/apple.svg" width={60} height={30} alt="Apple" />
        </li>
        <li>
          <Image src="/mercedes.svg" width={60} height={30} alt="Spark" />
        </li>
      </ul>
      <ul
        className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
        aria-hidden="true"
      >
        <li>
          <Image src="/github.svg" width={60} height={30} alt="Facebook" />
        </li>
        <li>
          <Image src="/fb-messenger.svg" width={60} height={30} alt="Disney" />
        </li>
        <li>
          <Image src="/forbes.svg" width={60} height={30} alt="Airbnb" />
        </li>
        {/* <li>
          <Image src="/instagram-logo.svg" width={60} height={30} alt="Apple" />
        </li> */}
        <li>
          <Image src="/aladdin.svg" width={60} height={30} alt="Spark" />
        </li>
      </ul>
    </div>
  );
}
