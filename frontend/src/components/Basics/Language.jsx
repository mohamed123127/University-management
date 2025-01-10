import React, { useState } from "react"; 

export default function Language({ ClassName , onLanguageChange,DefaultLanguage,PrimaryButtonColor='blue'}) { 
    const [language, setLanguage] = useState(DefaultLanguage); 
    const [isOpened, setIsOpened] = useState(false); 

    const LanguageChangeHandled = (lang) => {
        setLanguage(lang);
        if (onLanguageChange) {
            onLanguageChange(lang); // استدعاء الدالة callback
        }
    };

    return ( 
        <div onClick={() => { setIsOpened(!isOpened); }} className={`${ClassName} bg-white shadow-md rounded-lg overflow-hidden cursor-pointer text-nowrap transition-width duration-500 ease-in-out`} style={{ width: isOpened ? "90px" : "30px" }}> 
            <button onClick={() => LanguageChangeHandled("ar")} className={`w-[30px] ${language === "ar" ? `bg-${PrimaryButtonColor}-600 text-white mx-auto` : "bg-white"} ${isOpened ? "pointer-events-auto" : "pointer-events-none"} ${isOpened || language === "ar" ? "visible" : "hidden"} hover:bg-${PrimaryButtonColor}-500 hover:text-white`}>ar</button> 
            <button onClick={() => LanguageChangeHandled("en")} className={`w-[30px] ${language === "en" ? `bg-${PrimaryButtonColor}-600 text-white mx-auto` : "bg-white"} ${isOpened ? "pointer-events-auto" : "pointer-events-none"} ${isOpened || language === "en" ? "visible" : "hidden"} hover:bg-${PrimaryButtonColor}-500 hover:text-white`}>en</button> 
            <button onClick={() => LanguageChangeHandled("fr")} className={`w-[30px] ${language === "fr" ? `bg-${PrimaryButtonColor}-600 text-white mx-auto` : "bg-white"} ${isOpened ? "pointer-events-auto" : "pointer-events-none"} ${isOpened || language === "fr" ? "visible" : "hidden"} hover:bg-${PrimaryButtonColor}-500 hover:text-white`}>fr</button> 
        </div> 
    ); 
}
