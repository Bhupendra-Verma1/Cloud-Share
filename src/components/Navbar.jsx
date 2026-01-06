import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Menu, Share2, X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import CreditsDisplay from "./CreditsDisplay";
import { UserCreditContext } from "../context/UserCreditsContext";

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const { credits, fetchUserCredits } = useContext(UserCreditContext);
    const btnRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        fetchUserCredits();
    }, [fetchUserCredits]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                btnRef.current &&
                !btnRef.current.contains(event.target)
            ) {
                setOpenSideMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="flex items-center justify-between gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
                {/* Left */}
                <div className="flex items-center gap-5">
                    <button
                        ref={btnRef}
                        className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded"
                        onClick={() => setOpenSideMenu(prev => !prev)}
                    >
                        {openSideMenu ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
                    </button>

                    <div className="flex items-center gap-2">
                        <Share2 className="text-blue-600" />
                        <span className="text-lg font-medium text-black truncate">
                            Cloud Share
                        </span>
                    </div>
                </div>

                {/* Right */}
                <SignedIn>
                    <div className="flex items-center gap-4">
                        <Link to="/subscriptions">
                            <CreditsDisplay credits={credits} />
                        </Link>
                        <UserButton />
                    </div>
                </SignedIn>
            </div>

            {/* Mobile Side Menu – OUTSIDE navbar */}
            {openSideMenu && (
                <div className="fixed top-[67px] left-0 right-0 bottom-0 bg-white lg:hidden z-40 overflow-y-auto">
                    <SideMenu ref={menuRef} activeMenu={activeMenu} />
                </div>
            )}
        </>
    )
}

export default Navbar;