import React from "react";
import { useQuery } from "@tanstack/react-query";
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
  const { data: batches, isLoading, isError } = useQuery({
    queryKey: ["batches"],
    queryFn: getBatches,
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching batches!</Typography>;

  const batchList = batches || [];

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
            {batchList.length > 0 ? (
              batchList.map((batch) => (
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
