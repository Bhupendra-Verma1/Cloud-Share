
import { useAuth } from "@clerk/clerk-react";
import DashboardLayout from "../layout/DashboardLayout";
import { useEffect } from "react";

const Dashboard = () => {
    const {getToken} = useAuth();

    useEffect(() => {

        const displayToken  = async () => {
            const token = await getToken({ template: "backend" }); 
            console.log(token);
        }

        displayToken();
    }, []);

    return (
        <DashboardLayout activeMenu={"Dashboard"}>
            <div>
                Dashboard content
            </div>
        </DashboardLayout>
    )
}

export default Dashboard;

