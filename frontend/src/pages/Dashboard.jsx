import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/");
    }
    }, []);
    const [stats, setStats] = useState(null);

    useEffect(() => {

        const fetchStats = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const res = await api.get(
                    "/progress/stats",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setStats(res.data);

            } catch (error) {

                console.log(error);

            }
        };

        fetchStats();

    }, []);

    if (!stats) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <Navbar />
            <div className="p-6">

            <h1>PlacementOS Dashboard</h1>

            <h2>
                Solved: {stats.solved}
            </h2>

            <h2>
                Attempted: {stats.attempted}
            </h2>

            <h2>
                Revision Needed: {stats.revisionNeeded}
            </h2>

            <h2>
                Total Tracked: {stats.totalTracked}
            </h2>
            
            </div>
        </div>
    );
}

export default Dashboard;