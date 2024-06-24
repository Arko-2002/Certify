import React from 'react';
import Navbar from './Navbar';
import womenTexting from '../assets/women_texting.mp4';
import fingerPrint from '../assets/finger_print.mp4';
const Header = () => {
  return (
    <header className="w-full h-dvh p-6 ">
      <div className=" relative w-full h-full bg-black rounded-[20rem] overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-65 z-10"></div>
        <div className="z-12 absolute right-1/2 top-16 backdrop-filter-none rounded-full w-24">
          <video
            src={fingerPrint}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute -translate-x-1/2 -translate-y-1/2 bottom-0 left-1/2 z-10 p-4 flex gap-4 flex-col">
          <h1 className="text-white  text-4xl tracking-wide ">
            Unlocking Credentials: Seamlessly Secure and Verified on{' '}
            <span className="text-[#9bb0ff] font-bold">Ethereum.</span>
          </h1>
          <ul className="flex  text-white gap-2 md:flex-row flex-col">
            <li>
              <h2>Modern Tech Stack</h2>
              <p className="max-w-64 opacity-65">
                Built with React.js, Hardhat, Ganache, Ethereum as we consider
                mordern is the way to go.
              </p>
            </li>
            <li>
              <h2>Modern authentication</h2>
              <p className="max-w-64 opacity-65">
                Access your certificates securely using any etherum wallets.
              </p>
            </li>
            <li>
              <h2>Empowering Trust</h2>
              <p className="max-w-64 opacity-65">
                Issue, Store, and Authenticate anywhere, anytime.
              </p>
            </li>
          </ul>
        </div>

        <video
          className="w-full h-full object-cover"
          src={womenTexting}
          autoPlay
          loop
          muted
        />
      </div>
    </header>
  );
};

export default Header;
