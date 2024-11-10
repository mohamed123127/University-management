
export default function SideBarItem({itemIcon:Icon,Title,isOpen}){
    return(
        <div className={`flex flex-col items-center space-y-2 ${!isOpen }`}>
        {/* عنصر DocumentRequests مع القائمة الفرعية */}
        {
          isOpen ?        
        <div className={` ${!isOpen && "hidden"} flex items-center justify-between cursor-pointer w-full hover:bg-blue-500 rounded relative`}>
          <div className="flex items-center font-semibold">
            <Icon className="h-6 w-6 m-1 text-white" />
            <span className="text-base whitespace-nowrap">{Title}</span>
          </div>          
        </div>       
        :
        <div className="flex justify-center cursor-pointer w-full hover:bg-blue-500">
            <Icon className="h-7 w-7 mb-2 mt-1 text-white" />
        </div>
        }
        </div>
    );
}