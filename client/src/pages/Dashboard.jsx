import Card from "../components/Card";
import Grid from "../components/Grid";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const nav = useNavigate();

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Dashboard</h1>

            <Grid>
                <Card onClick={() => nav("/patients")}>
                    <h2>Patients</h2>
                    <p>View and manage patient records</p>
                </Card>

                <Card onClick={() => nav("/frames")}>
                    <h2>Frames</h2>
                    <p>Browse frame inventory</p>
                </Card>

                <Card onClick={() => nav("/lenses")}>
                    <h2>Lenses</h2>
                    <p>Lens catalog and options</p>
                </Card>
            </Grid>
        </div>
    );
}
