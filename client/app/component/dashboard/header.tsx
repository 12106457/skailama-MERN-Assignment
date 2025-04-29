// header.tsx

import Image from 'next/image'
import { Cog6ToothIcon, BellIcon } from "@heroicons/react/24/outline"

const Header = () => {
  return (
    <div className="w-full h-[100px] flex justify-between items-center">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-14">
        <Image src="/logo-2.png" alt="logo2" width={150} height={100} />
        <div className="flex justify-center items-center gap-5">
          <Cog6ToothIcon className="w-7 h-7" />
          <BellIcon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
}

export default Header
