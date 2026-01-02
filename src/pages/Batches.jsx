import React, { useEffect, useState } from "react";
import { getBatches } from "../api/batchApi";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";

const Batches = () => {
  const [batches, setBatches] = useState([]); // always an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const data = await getBatches();
        setBatches(data || []); // safety fallback
      } catch (err) {
        console.error("Error fetching batches:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography color="error">
          Error fetching batches!
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Batch Details
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Days</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {batches.length > 0 ? (
              batches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell>{batch.id}</TableCell>
                  <TableCell>{batch.subject}</TableCell>
                  <TableCell>{batch.teacherName}</TableCell>
                  <TableCell>{batch.startTime}</TableCell>
                  <TableCell>{batch.endTime}</TableCell>
                  <TableCell>{batch.daysOfWeek}</TableCell>
                  <TableCell>{batch.maxCapacity}</TableCell>
                  <TableCell>{batch.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No batches found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Batches;
