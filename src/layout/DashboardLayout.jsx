import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useUser();
    return (
        <div className="h-screen overflow-hidden flex flex-col">
            {/* Navbar */}
            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className="flex flex-1 min-h-0">
                    {/* Side Menu */}
                    <div className="hidden min-[1080px]:block">
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0 overflow-y-auto px-3 sm:px-5 md:px-8">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};



export default DashboardLayout;