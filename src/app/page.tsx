import Link from 'next/link'
import Image from 'next/image'
import Logo from '../app/assets/Logo.png'

export default function Home() {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Image className="" src={Logo} width={120} height={120} alt="Logo"></Image>
          {/* <a className="btn btn-ghost text-xl">Job Crafter</a> */}
        </div>
        <div className="navbar-end">
          <Link className="btn" href="/login">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
