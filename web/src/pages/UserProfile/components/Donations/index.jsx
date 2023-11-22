import React from "react";
import {
    Card,
    CardContent,
    Grid,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Button from "@mui/material/Button";

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
                <Typography variant="h5" sx={{mb: 3}}>
                    <VolunteerActivismIcon/> {title}
                </Typography>
                {donations.length > 0 && (
                    <Grid container spacing={2}>

                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{fontWeight: 'bold'}}>Usuario</TableCell>
                                        <TableCell align="center" sx={{fontWeight: 'bold'}}>Mensaje</TableCell>
                                        <TableCell align="center" sx={{fontWeight: 'bold'}}>Monto</TableCell>
                                        <TableCell align="center" sx={{fontWeight: 'bold'}}>Comprobante</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {donations.map((donation) => (
                                        <TableRow
                                            key={donation.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                {donation.donor_data.username}
                                            </TableCell>
                                            <TableCell align="center">{donation.message}</TableCell>
                                            <TableCell align="center">{formatter.format(donation.amount)}</TableCell>
                                            <TableCell align="center"><Button><ReceiptIcon/></Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
};

export default CurrentCourses;
