import React from "react";
import Header from "components/Header";
import FirstPage from "./FirstPage";
import { RxDashboard } from "react-icons/rx";


export default function MainPage({openedPage}){
    return(
        <div className="grid grid-cols-[200px_1fr] grid-rows-[auto_1fr]">
            <Header ClassName="col-start-2 row-start-1 justify-self-end" ActualPageName="Dashboard" ActualPageIcon={RxDashboard}/>
        </div>
    );
}