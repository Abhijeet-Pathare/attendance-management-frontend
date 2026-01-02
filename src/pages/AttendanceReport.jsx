// src/pages/AttendanceReport.jsx
import React, { useEffect, useState } from "react";
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
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /* ---------------- Fetch all batches on page load ---------------- */
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const data = await getBatches();
        setBatches(data || []);
      } catch (err) {
        console.error("Error fetching batches:", err);
      }
    };

    fetchBatches();
  }, []);

  /* ---------------- Fetch attendance manually ---------------- */
  const handleFetch = async () => {
    if (!selectedBatch) return;

    setLoading(true);
    setError(false);

    try {
      const data = await getBatchReport(selectedBatch, date);
      setAttendance(data);
    } catch (err) {
      console.error("Error fetching attendance:", err);
      setError(true);
      setAttendance(null);
    } finally {
      setLoading(false);
    }
  };

  // Convert attendance response to chart-friendly array
  const chartData = attendance
    ? [
        { status: "Present", count: attendance.totalPresent },
        { status: "Absent", count: attendance.totalAbsent },
        { status: "Late", count: attendance.totalLate },
      ]
    : [];

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Daily Attendance Report
      </Typography>

      {/* Batch selector */}
      <FormControl sx={{ mr: 2, minWidth: 220 }}>
        <InputLabel>Batch</InputLabel>
        <Select
          value={selectedBatch}
          label="Batch"
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          {batches.map((batch) => (
            <MenuItem key={batch.id} value={batch.id}>
              {batch.subject} ({batch.teacherName})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Date picker */}
      <TextField
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        sx={{ mr: 2, mb: 2 }}
      />

      {/* Fetch button */}
      <Button
        variant="contained"
        onClick={handleFetch}
        disabled={!selectedBatch || loading}
        sx={{ mb: 2 }}
      >
        Fetch Attendance
      </Button>

      {/* Status messages */}
      {loading && <Typography>Loading...</Typography>}
      {error && (
        <Typography color="error">
          Error fetching attendance!
        </Typography>
      )}

      {/* Report */}
      {attendance && !loading && (
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
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
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
