export default function SideBarItem({itemIcon, Title, isOpen, OnClick,ClassName}) { 
  return( 
    <button onClick={OnClick} className={`flex flex-col items-center space-y-2 ${!isOpen } ${ClassName}`}> 
      {isOpen ? 
        <div className={` ${!isOpen && "hidden"} flex items-center justify-between cursor-pointer w-full hover:bg-blue-500 rounded relative`}>
          <div className="flex items-center font-semibold">
            <div className="icon h-6 w-6 m-1 text-white">{itemIcon}</div>
            <span className="text-base whitespace-nowrap">{Title}</span>
          </div>          
        </div>       
        : 
        <div className="flex justify-center cursor-pointer w-full hover:bg-blue-500">
          <div className="icon h-7 w-7 mb-2 mt-1 text-white">{itemIcon}</div>
        </div>
      }
    </button>
  );
}
