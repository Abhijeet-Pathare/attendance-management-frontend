import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBatches } from "../api/batchApi";
import studentApi from "../api/studentApi";
import { markAttendance } from "../api/attendanceApi";
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
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

const Attendance = () => {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [studentsList, setStudentsList] = useState([]);
  const [attendance, setAttendance] = useState({});

  // Fetch batches
  const { data: batches } = useQuery({ queryKey: ["batches"], queryFn: getBatches });

  // Fetch students when batch changes
  useEffect(() => {
    if (!selectedBatch) return;

    studentApi.get("").then(res => {
      const batchStudents = res.data.filter(s => s.batchId === selectedBatch);
      setStudentsList(batchStudents);

      // Initialize all as absent
      const initialAttendance = {};
      batchStudents.forEach(s => { initialAttendance[s.id] = false; });
      setAttendance(initialAttendance);
    });
  }, [selectedBatch]);

  const handleAttendanceChange = (studentId) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleSave = async () => {
    try {
      // Prepare payload: one request per student
      const promises = studentsList.map(student => {
        return markAttendance({
          studentId: student.id,
          batchId: selectedBatch,
          date,
          status: attendance[student.id] ? "PRESENT" : "ABSENT", // required field
        });
      });

      await Promise.all(promises);
      alert("Attendance saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving attendance!");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Mark Attendance</Typography>

      <FormControl sx={{ mr: 2, minWidth: 200 }}>
        <InputLabel>Batch</InputLabel>
        <Select
          value={selectedBatch}
          label="Batch"
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          {batches?.map(batch => (
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

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Present</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsList.map(student => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={attendance[student.id] || false}
                    onChange={() => handleAttendanceChange(student.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>
        Save Attendance
      </Button>
    </Container>
  );
};

export default Attendance;
