import { useContext, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "@clerk/clerk-react";
import { UserCreditContext } from "../context/UserCreditsContext";
import { AlertCircle } from "lucide-react";
import { apiEndpoints } from "../util/ApiEndpoint";
import axios from "axios";
import UploadBox from '../components/UploadBox';


const Upload = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // success or error
    const {getToken} = useAuth();
    const {credits, setCredits} = useContext(UserCreditContext);
    const MAX_FILES = 5;

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        
        if(files.length + selectedFiles.length > MAX_FILES) {
            setMessage(`You can only upload a maximum of ${MAX_FILES} files at once`);
            setMessageType("error");
            return;
        }

        // add new files into the existing files

        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        setMessage("");
        setMessageType("");
    }
    
    const handleRemoveFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        setMessage("");
        setMessageType("");
    }

    const handleUpload = async () => {
        if(files.length === 0) {
            setMessage("error");
            setMessageType("Please select atleast one file to upload.");
            return;
        }

        if(files.length > MAX_FILES) {
            setMessage(`You can only upload a maximum of ${MAX_FILES} files at once`);
            setMessageType("error");
            return;
        }

        setUploading(true);
        setMessage("Uploading files...");
        setMessageType("info");

        const formData = new FormData();
        files.forEach(file => formData.append("Files", file));

        try {
            const token = await getToken({template : "backend"});
            const response = await axios.post(apiEndpoints.UPLOAD_FILE, formData, {headers: {Authorization : `Bearer ${token}`}});

            if(response.data && response.data.remainingCredits != undefined) {
                setCredits(response.data.remainingCredits);
            }

            setMessage("Files uploaded successfully.");
            setMessageType("success");
            setFiles([]);
        } catch (error) {
            console.log("Error uploading files", error);
            setMessage(error.response?.data?.message || "Error uploading files. Please try again.");
            setMessageType("error");
        } finally {
            setUploading(false);
        }
    }

    const isUploadDisabled = files.length === 0 || files.length > MAX_FILES || credits <= 0 || files.length > credits;

    return (
        <DashboardLayout activeMenu={"Upload"}>
            <div>
                <div className="p-6">
                    {message && (
                        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${messageType === 'error' ? 'bg-red-50 text-red-700' : messageType === 'success' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                            {messageType === 'error' && <AlertCircle size={20} />}
                            {message}
                        </div>
                    )}

                    <UploadBox 
                        files={files}
                        onFileChange={handleFileChange}
                        onUpload={handleUpload}
                        uploading={uploading}
                        onRemoveFile={handleRemoveFile}
                        remainingCredits={credits}
                        isUploadDisabled={isUploadDisabled}
                    />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Upload;