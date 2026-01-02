import React, { useEffect, useState } from "react";
import studentApi from "../api/studentApi";
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

const Students = () => {
  const [students, setStudents] = useState([]); // always array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await studentApi.get(""); // GET /students
        setStudents(res.data || []); // safety fallback
      } catch (err) {
        console.error("Error fetching students:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
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
          Error fetching students!
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Student Details
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.length > 0 ? (
              students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Students;
