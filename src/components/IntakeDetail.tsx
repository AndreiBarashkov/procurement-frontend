import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    TextField,
    Typography,
    Container,
    Box,
    Button,
    Divider,
    Grid,
} from '@mui/material';
import {fetchIntakeById, createIntake, updateIntake} from '../api/intakeApi';
import { Intake, Order } from '../models/Intake';
import OrderGridRow from './OrderGridRow';

const emptyOrder: Order = {
    description: '',
    unitPrice: 0,
    amount: 0,
    unit: '',
    totalPrice: 0,
};

const IntakeDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = id === undefined;

    const [intake, setIntake] = useState<Intake | null>(null);

    useEffect(() => {
        if (!isNew) {
            fetchIntakeById(id!)
                .then(res => setIntake(res.data))
                .catch(err => console.error('Failed to fetch intake', err));
        } else {
            setIntake({
                id: '',
                requestorName: '',
                title: '',
                vendorName: '',
                vatId: '',
                commodityGroup: '',
                department: '',
                totalCost: 0,
                status: 'Open',
                orders: [emptyOrder],
            });
        }
    }, [id, isNew]);

    const handleChange = (field: keyof Intake, value: any) => {
        if (!intake) return;
        setIntake({ ...intake, [field]: value });
    };

    const handleOrderChange = (index: number, field: keyof Order, value: any) => {
        if (!intake) return;
        const updatedOrders = [...intake.orders];
        updatedOrders[index] = { ...updatedOrders[index], [field]: value };
        setIntake({ ...intake, orders: updatedOrders });
    };

    const handleAddOrder = () => {
        if (!intake) return;
        setIntake({ ...intake, orders: [...intake.orders, emptyOrder] });
    };

    // const handleSubmitCreateOrUpdate = () => {
    //     if (!intake) return;
    //     const { id, status, ...intakeData } = intake;
    //     createIntake(intakeData as any)
    //         .then(() => navigate('/'))
    //         .catch(err => console.error('Failed to create intake', err));
    // };
    const handleSubmitCreateOrUpdate = () => {
        if (!intake) return;

        const { id, status, ...intakeData } = intake;

        const payload = {
            id,
            status,
            ...intakeData,
            // orders: intake.orders.map(order => ({
            //     description: order.description,
            //     unitPrice: order.unitPrice,
            //     amount: order.amount,
            //     unit: order.unit
            // }))
        };

        const action = id
            ? updateIntake(payload)
            : createIntake(payload);

        action
            .then(() => navigate('/'))
            .catch(err => console.error('Failed to submit intake', err));
    };

    if (!intake) return <p>Loading...</p>;

    return (
        <Container>
            <Box mt={4} mb={2}>
                <Typography variant="h4">
                    {isNew ? 'Create New Intake' : 'Intake Details'}
                </Typography>
            </Box>

            <Grid container spacing={2}>
                <Grid size={{ xs: 6 }} component="div">
                    <TextField fullWidth label="Requestor Name" value={intake.requestorName}
                               onChange={e => handleChange('requestorName', e.target.value)} />
                </Grid>
                <Grid size={{ xs: 6 }} component="div">
                    <TextField fullWidth label="Title" value={intake.title}
                               onChange={e => handleChange('title', e.target.value)} />
                </Grid>
                <Grid size={{ xs: 6 }} component="div">
                    <TextField fullWidth label="Vendor Name" value={intake.vendorName}
                               onChange={e => handleChange('vendorName', e.target.value)} />
                </Grid>
                <Grid size={{ xs: 6 }} component="div">
                    <TextField fullWidth label="VAT ID" value={intake.vatId}
                               onChange={e => handleChange('vatId', e.target.value)} />
                </Grid>
                <Grid size={{ xs: 6 }} component="div">
                    <TextField fullWidth label="Department" value={intake.department}
                               onChange={e => handleChange('department', e.target.value)} />
                </Grid>
                <Grid size={{ xs: 6 }} component="div">
                    <TextField fullWidth label="Commodity Group" value={intake.commodityGroup}
                               onChange={e => handleChange('commodityGroup', e.target.value)} />
                </Grid>
                {!isNew && (
                    <Grid size={{ xs: 6 }} component="div">
                        <TextField fullWidth type="number" label="Total Cost" value={intake.totalCost} disabled />
                    </Grid>
                )}
            </Grid>

            <Box mt={4}>
                <Typography variant="h6">Order Lines</Typography>
                <Divider sx={{ mb: 2 }} />

                {intake.orders.map((order, idx) => (
                    <OrderGridRow
                        key={idx}
                        index={idx}
                        order={order}
                        isEditable={true}
                        showTotals={!isNew}
                        onChange={handleOrderChange}
                    />
                ))}

                <Button onClick={handleAddOrder} variant="outlined">Add Order Line</Button>
            </Box>

            <Box mt={4}>
                <Button variant="contained" color="primary" onClick={handleSubmitCreateOrUpdate}>
                    {isNew ? 'Create' : 'Update'}
                </Button>
            </Box>
        </Container>
    );
};

export default IntakeDetail;
