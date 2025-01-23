"use client"
import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import TryIcon from "@mui/icons-material/Try";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

type menuitem = {
    name:string,
    icon:React.ReactNode
}

const menuitems:menuitem[] = [
  {
    name: "home",
    icon: <HomeIcon />,
  },
  {
    name:'checkedin',
    icon:<AutoAwesomeMosaicIcon/>
  },
  {
    name: "search",
    icon: <SearchIcon />,
  },
  {
    name: "saved",
    icon: <TryIcon />,
  },
  {
    name: "Notification",
    icon: <CircleNotificationsIcon />,
  },
];

function Sidebar() {


  const pathname = usePathname();
  const [activeTab,setActiveTab] = useState<string | null>(null);
  const handleClick = (val:string) : void=>{
    setActiveTab(val);
  }



  useEffect(()=>{
    console.log(pathname)
    setActiveTab(pathname.split("/")[1]);
    console.log(pathname.split("/")[1])
    console.log(pathname.split("/"))
  },[]);

  return (
    <div>
      <div className=" sticky top-0 h-screen bg-white shadow-lg px-2">
        <div className="flex h-full flex-col justify-center items-center space-y-4">
          {menuitems?.map((elm, id) => {
            return (
              <>
                {elm.name.includes('Notification') ?  
                <div key={elm.name} className={`w-full ${elm.name===activeTab ? ' text-blue-600' : ''}`}>
                  <Link href={`/${elm.name}`}  className={`${elm.name===activeTab ? 'bg-blue-100 text-blue-400' : ''} flex flex-col items-center cursor-pointer relative text-[gray] p-2 rounded-3xl hover:bg-blue-100 transition-colors duration-200 px-2 w-full`}
                   onClick={()=>{handleClick(elm.name);}}
                  >
                    <div className="bg-red-500 rounded-full w-[15px] h-[15px] p-2.5 absolute  top-0 right-[15px] flex justify-center items-center">
                        <p className="text-white">2</p>
                    </div>
                    {elm.icon}
                  </Link>
                  <Link href={`/${elm?.name}`}className="text-[12px] text-center">
                    {elm.name}
                  </Link>
                </div> 
                :

                <Link href={`/${elm.name}`}  key={elm.name} className={`w-full ${elm.name===activeTab ? ' text-blue-600' : ''}`}>
                  <div className={` ${elm.name===activeTab ? 'bg-blue-100 text-blue-400' : ''} flex flex-col items-center cursor-pointer text-[gray] p-2 rounded-3xl hover:bg-blue-100 transition-colors duration-200 px-2 w-full`}
                  onClick={()=>{handleClick(elm.name)}}>
                    {elm.icon}
                  </div>
                  <p className="text-[12px] text-center">
                    {elm.name}
                  </p>
                </Link>
                }
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
