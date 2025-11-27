import { useContext, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "@clerk/clerk-react";
import { UserCreditContext } from "../context/UserCreditsContext";

const Upload = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // success or error
    const {getToken} = useAuth();
    const {credits, setCredits} = useContext(UserCreditContext);
    const MAX_FILES = 5;

    

    return (
        <DashboardLayout activeMenu={"Upload"}>
            <div>
                Upload
            </div>
        </DashboardLayout>
    )
}

export default Upload;