import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

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
    );
}

export default Dashboard;