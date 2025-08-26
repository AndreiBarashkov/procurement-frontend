// src/components/OrderGridRow.tsx
import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Order } from '../models/Intake';

interface Props {
    order: Order;
    index: number;
    isEditable: boolean;
    showTotals: boolean;
    onChange: (index: number, field: keyof Order, value: any) => void;
}

const OrderGridRow: React.FC<Props> = ({ order, index, isEditable, showTotals, onChange }) => {
    return (
        <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 6 }} component="div">
                <TextField
                    fullWidth
                    label="Description"
                    value={order.description}
                    onChange={e => onChange(index, 'description', e.target.value)}
                    disabled={!isEditable}
                />
            </Grid>
            <Grid size={{ xs: 2 }} component="div">
                <TextField
                    fullWidth
                    type="number"
                    label="Unit Price"
                    value={order.unitPrice}
                    onChange={e => onChange(index, 'unitPrice', parseFloat(e.target.value))}
                    disabled={!isEditable}
                />
            </Grid>
            <Grid size={{ xs: 2 }} component="div">
                <TextField
                    fullWidth
                    type="number"
                    label="Amount"
                    value={order.amount}
                    onChange={e => onChange(index, 'amount', parseInt(e.target.value))}
                    disabled={!isEditable}
                />
            </Grid>
            <Grid size={{ xs: 2 }} component="div">
                <TextField
                    fullWidth
                    label="Unit"
                    value={order.unit}
                    onChange={e => onChange(index, 'unit', e.target.value)}
                    disabled={!isEditable}
                />
            </Grid>
            {showTotals && (
                <Grid size={{ xs: 2 }} component="div">
                    <TextField
                        fullWidth
                        label="Total Price"
                        value={order.totalPrice}
                        disabled
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default OrderGridRow;
