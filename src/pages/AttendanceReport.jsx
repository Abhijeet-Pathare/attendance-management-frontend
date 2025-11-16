// src/pages/AttendanceReport.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBatchReport } from "../api/attendanceReportApi";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

// Colors for chart
const COLORS = ["#4caf50", "#f44336", "#ff9800"];

const AttendanceReport = () => {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [fetchKey, setFetchKey] = useState(0); // to trigger query manually

  // Fetch all batches
  const { data: batches } = useQuery({
    queryKey: ["batches"],
    queryFn: getBatches,
  });

  // Fetch attendance for selected batch and date
  const { data: attendance, isLoading, isError } = useQuery({
    queryKey: ["attendance", selectedBatch, date, fetchKey],
    queryFn: () => getBatchReport(selectedBatch),
    enabled: !!selectedBatch, // only fetch when batch selected
  });

  // Convert attendance response to chart-friendly array
  const chartData = attendance
    ? [
        { status: "Present", count: attendance.totalPresent },
        { status: "Absent", count: attendance.totalAbsent },
        { status: "Late", count: attendance.totalLate },
      ]
    : [];

  const handleFetch = () => setFetchKey(prev => prev + 1);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Daily Attendance Report
      </Typography>

      <FormControl sx={{ mr: 2, minWidth: 200 }}>
        <InputLabel>Batch</InputLabel>
        <Select
          value={selectedBatch}
          label="Batch"
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          {batches?.map((batch) => (
            <MenuItem key={batch.id} value={batch.id}>
              {batch.subject} ({batch.teacherName})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" onClick={handleFetch} sx={{ mb: 2 }}>
        Fetch Attendance
      </Button>

      {isLoading && <Typography>Loading...</Typography>}
      {isError && <Typography>Error fetching attendance!</Typography>}

      {attendance && (
        <>
          {/* Chart */}
          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          {/* Table */}
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chartData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default AttendanceReport;
