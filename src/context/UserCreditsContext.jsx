import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useCallback, useEffect, useState} from "react";
import { apiEndpoints } from "../util/ApiEndpoint";

export const UserCreditContext = createContext();

export const UserCreditsProvider = ({children}) => {

    const [credits, setCredits] = useState(5);
    const [loading, setLoading] = useState(false);
    const {getToken, isSignedIn} = useAuth();

    // Function to fetch the user credits that can be called from anywhere
    const fetchUserCredits = useCallback(async () => {
        if(!isSignedIn) return;
        
        setLoading(true);

        try {
            const token = await getToken({template : "backend"});
            const response = await axios.get(apiEndpoints.GET_CREDITS, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setCredits(response.data.credits);
            } else  {
                toast.error("Unable to get user credits.");
            }
        } catch (error) {
            console.log("Error fetching the user credits", error);
        } finally {
            setLoader(false);
        }
    }, [getToken, isSignedIn]);

    useEffect(() => {
        if(!isSignedIn) return;
        fetchUserCredits();
    }, [isSignedIn, fetchUserCredits]);

    const updateCredits = useCallback((newCredits) => {
        console.log("updating the credits", newCredits);
    }, []);

    const contextValue = {
        credits,
        setCredits,
        fetchUserCredits,
        updateCredits
    }

    return (
        <UserCreditContext.Provider value={contextValue}>
            {children}
        </UserCreditContext.Provider>
    )
}