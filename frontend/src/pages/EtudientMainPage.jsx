import React from "react";
import Header from "components/Header/Header";
import SideBar from "components/Sidebar/SideBar";
import SideBarr from "components/Sidebar/SideBar";
import { RxDashboard } from "react-icons/rx";


export default function MainPage({openedPage}){
    return(
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
            <Header ClassName="col-start-2 row-start-1 justify-self-end" ActualPageName="Dashboard" ActualPageIcon={RxDashboard}/>
            <SideBar ClassName='col-start-1 row-start-1 row-span-2'/>
            <div className="bg-gray-200 w-full h-full col-start-2 row-start-2">

            </div>
        </div>
    );
}