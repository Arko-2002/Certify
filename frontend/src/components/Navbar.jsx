import { Link } from 'react-router-dom';

const Navbar = ({ selectedAddress }) => {
  return (
    <nav className="flex justify-between max-w-[1500px] w-full p-8 items-center">
      <h1 className="text-3xl font-medium">
        Certifly{' '}
        <span className="text-sm text-[#215CFF]">{'<Prototype />.'}</span>
      </h1>
      <p>Hi, {selectedAddress}</p>
      <ul className="flex gap-6 bg-gradient-to-r from-[#215CFF] to-[#0631a7] rounded-full py-2 px-4 border border-s border-[#759aff]    ">
        <li>
          <Link to="/" className="opacity-85  hover:opacity-100">
            Home
          </Link>
        </li>
        <li>
          <Link to="/vault" className="opacity-85  hover:opacity-100">
            Student Vault
          </Link>
        </li>
        <li>
          <Link to="/verify" className="opacity-85  hover:opacity-100">
            Verify Documents
          </Link>
        </li>
        <li>
          <Link to="/certificate" className="opacity-85  hover:opacity-100">
            Institute
          </Link>
        </li>
        <li>
          <Link to="/institutes" className="opacity-85  hover:opacity-100">
            Govt.
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
