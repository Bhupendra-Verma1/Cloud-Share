import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useUser();

    return (
        <div className="overflow-x-hidden">
            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className="flex">
                    <div className="hidden min-[1080px]:block">
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    <div className="flex-1 min-w-0 px-3 sm:px-5 md:px-8">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};


export default DashboardLayout;