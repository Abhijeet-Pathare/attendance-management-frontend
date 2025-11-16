import React from "react";
import { useQuery } from "@tanstack/react-query";
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

const fetchStudents = async () => {
  const { data } = await studentApi.get(""); // GET /students
  return data;
};

const Students = () => {
  const { data: students, isLoading, isError } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents
  });



  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching students!</Typography>;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Student Details</Typography>
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
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Students;
