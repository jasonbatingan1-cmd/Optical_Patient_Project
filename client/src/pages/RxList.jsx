import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../api";
import Card from "../components/Card";
import Grid from "../components/Grid";

export default function RxList() {
    const nav = useNavigate();
    const [rxList, setRxList] = useState([]);

    useEffect(() => {
        apiGet("/rx").then(setRxList);
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>All Prescriptions</h1>

            <Grid>
                {rxList.map(rx => (
                    <Card
                        key={rx._id}
                        onClick={() => nav(`/rx/${rx._id}`)}

                    >
                        <h2>
                            {rx.patient
                                ? `${rx.patient.firstName} ${rx.patient.lastName}`
                                : "Unknown Patient"}
                        </h2>

                        <p>Lens: {rx.lensType}</p>
                        <p>Coating: {rx.coating}</p>
                    </Card>
                ))}
            </Grid>

        </div>
    );
}
