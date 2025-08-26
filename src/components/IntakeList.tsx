import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {fetchIntakes, importIntakeFromPdf, submitIntake} from '../api/intakeApi'; // You must implement submitIntake in your API
import { Intake } from '../models/Intake';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Container,
    Box
} from '@mui/material';

const IntakeList: React.FC = () => {
    const [intakes, setIntakes] = useState<Intake[]>([]);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchIntakes()
            .then(response => setIntakes(response.data))
            .catch(error => console.error('Failed to load intakes', error));
    }, []);

    const handleImportPdf = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/pdf';

        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            try {
                const response = await importIntakeFromPdf(file);
                const intakeData = response.data;

                // Navigate to intake creation page with imported data
                navigate('/intakes/new', { state: { intake: intakeData } });
            } catch (error) {
                console.error('PDF import failed:', error);
                alert('Failed to import intake from PDF. Please check the file or try again.');
            }
        };

        input.click(); // Trigger file picker
    };

    const handleSubmitIntake = async (id: string) => {
        try {
            const response = await submitIntake(id);

            if (response.data === true) {
                const refreshed = await fetchIntakes();
                setIntakes(refreshed.data);
            } else {
                alert('Submission is not possible yet. Please fill in all required fields.');
            }
        } catch (error) {
            console.error('Failed to submit intake:', error);
            alert('An error occurred while submitting intake. Please ensure that all data is provided and valid.');
        }
    };

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
                <Typography variant="h4">Procurement Intakes</Typography>
                <Box>
                    <Button variant="outlined" color="secondary" onClick={handleImportPdf} sx={{ mr: 2 }}>
                        Import PDF
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => navigate('/intakes/new')}>
                        Add New Intake
                    </Button>
                </Box>
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Requestor</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Vendor</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Total Cost</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {intakes.map(intake => (
                        <TableRow
                            key={intake.id}
                            onMouseEnter={() => {
                                setHoveredId(intake.id);
                            }}
                            onMouseLeave={() => {
                                setHoveredId(null);
                            }}
                            hover
                            sx={{ height: 64, cursor: 'pointer' }}
                        >
                            <TableCell>{intake.requestorName}</TableCell>
                            <TableCell>{intake.title}</TableCell>
                            <TableCell>{intake.vendorName}</TableCell>
                            <TableCell>{intake.status}</TableCell>
                            <TableCell>€{intake.totalCost.toFixed(2)}</TableCell>
                            <TableCell>
                                <Box display="flex" gap={1} minWidth={160}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate(`/intakes/${intake.id}`)}
                                    >
                                        View
                                    </Button>

                                    {intake.status === 'Open' ? (
                                        hoveredId === intake.id ? (
                                            <Button
                                                variant="contained"
                                                color="success"
                                                size="small"
                                                onClick={() => handleSubmitIntake(intake.id)}
                                            >
                                                Submit
                                            </Button>
                                        ) : (
                                            <Box width={75} /> // Reserve space for Submit button (approximate width)
                                        )
                                    ) : null}
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default IntakeList;
