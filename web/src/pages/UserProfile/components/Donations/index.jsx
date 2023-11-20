import React from "react";
import {Card, CardContent, Grid, Typography,} from "@mui/material";

const CurrentCourses = ({donations, user, showProgress = false, title = ""}) => {
    if (donations.length === 0) {
        return <> </>;
    }

    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    });


    return (
        <Card style={{marginTop: "20px"}}>
            <CardContent>
                <Typography variant="h5" sx={{mb: 1}}>
                    {title}
                </Typography>
                {donations.length > 0 && (
                    <Grid container spacing={2}>
                        {donations.map((donation) => (
                            <Grid item key={donation.id} xs={12} sm={12}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <CardContent sx={{flexGrow: 1}}>
                                        <Typography>Usuario: {donation.donor_data.username}</Typography>
                                        <Typography>{donation.message}</Typography>
                                        <Typography>{formatter.format(donation.amount)}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
};

export default CurrentCourses;
