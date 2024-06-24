import Header from '../components/Header';
import checkmark from '../assets/checkmark.png';
import lock from '../assets/lock.png';
import generate from '../assets/generate.png';
import institute from '../assets/institute.png';
import { Link } from 'react-router-dom';
import eth from '../assets/eth.png';
const Home = () => {
  return (
    <div className="w-full flex  flex-col  items-center ">
      <Header />
      <div className="w-full relative">
        <div className="absolute leading-normal md:top-36 top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-16">
          <h2 className="  lg:text-4xl text-base ">
            Solutions for mordern document storage & generation
          </h2>
          <p className="tracking-wide opacity-60 hidden lg:block">
            Certifly, crafted with React.js, Hardhat, and Ganache, redefines
            credential verification. Leveraging Ethereum, it securely generates
            and stores certificates on the blockchain. With unique IDs for each
            credential, Certifly ensures authenticity, fostering trust in
            educational and professional accomplishments through decentralized
            validation.
          </p>
          <div className="flex justify-between tracking-wider uppercase text-[#C7F549]">
            <p>React.js</p>
            <p>Etherum</p>
            <p>Hardhat</p>
            <p>Ganache</p>
            <p>Metamask</p>
          </div>
        </div>

        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:text-6xl text-xl leading-normal">
          Unleashing Blockchain's Potential: Transforming Certification
        </h1>
        <img src={eth} alt="eth" className="w-full" />
      </div>
      <div className="w-full max-w-[1500px] grid md:grid-cols-2 gap-4 grid-cols-1">
        <Link to="/verify">
          <div className="min-h-80 rounded-lg p-4 flex flex-col gap-4 bg- bg-gradient-to-r from-[#d2ff56] to-[#8abd00] border border-s border-[#e2ff91] text-black">
            <h1 className="text-4xl font-bold ">Verify</h1>
            <p className="tracking-tight font-medium leading-tight opacity-50">
              Blockchain certificate verification ensures authenticity by
              assigning each certificate a unique code stored on the blockchain.
              Individuals can verify certificates instantly, without relying on
              a central authority. This decentralized system offers transparent
              and tamper-proof validation, ensuring trust in educational and
              professional credentials.
            </p>
            <div className="w-12 opacity-50 self-end mt-auto">
              <img
                src={checkmark}
                alt="checkmark"
                className="w-full object-cover"
              />
            </div>
          </div>
        </Link>
        <Link to="/vault">
          <div className="bg-gradient-to-r from-[#215CFF] to-[#0631a7] border border-s border-[#759aff]  min-h-80 rounded-lg p-4 flex flex-col gap-4 text-white">
            <h1 className="text-4xl font-bold ">Student vault</h1>
            <p className="tracking-tight font-medium opacity-50 leading-tight">
              A blockchain-based system securely stores all student
              certificates. Each certificate is assigned a unique code, ensuring
              authenticity. With instant verification, individuals can access
              their credentials anytime, anywhere, fostering trust and
              transparency in educational achievements.
            </p>
            <div className="w-12 opacity-50 self-end mt-auto">
              <img
                src={lock}
                alt="checkmark"
                className="w-full object-cover invert"
              />
            </div>
          </div>
        </Link>
        <Link to="/certificate">
          <div className="bg-gradient-to-r from-[#215CFF] to-[#0631a7] border border-s border-[#759aff]  min-h-80 rounded-lg p-4  flex flex-col gap-4 text-white">
            <h1 className="text-4xl font-bold ">Generate Certificate</h1>
            <p className="tracking-tight font-medium opacity-50 leading-tight">
              Blockchain certificate generation securely creates student
              certificates, each with a unique identifier, ensuring authenticity
              and enabling instant verification of educational achievements.
            </p>
            <div className="w-12 opacity-50 self-end mt-auto">
              <img
                src={generate}
                alt="checkmark"
                className="w-full object-cover invert"
              />
            </div>
          </div>
        </Link>
        <Link to="/institutes">
          <div className="bg-gradient-to-r from-[#215CFF] to-[#0631a7] border border-s border-[#759aff]   min-h-80 rounded-lg  p-4  flex flex-col gap-4 text-white">
            <h1 className="text-4xl font-bold ">Create Institute</h1>
            <p className="tracking-tight font-medium opacity-50 leading-tight">
              Institute creates blockchain-based certificates, each with a
              unique ID, ensuring authenticity. Instant verification fosters
              trust in educational credentials.
            </p>
            <div className="w-12 opacity-50 self-end mt-auto">
              <img
                src={institute}
                alt="checkmark"
                className="w-full object-cover invert"
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Home;
