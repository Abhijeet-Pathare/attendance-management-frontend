import React, { useEffect, useState } from "react";
import studentApi, { createStudent } from "../api/studentApi";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    parentPhone: "",
    standard: "",
    batchId: "",
    status: "ACTIVE",
  });

  /* ---------------- Fetch students ---------------- */
  const fetchStudents = async () => {
    try {
      const res = await studentApi.get("");
      setStudents(res.data || []);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* ---------------- Form handlers ---------------- */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddStudent = async () => {
    try {
      await createStudent({
        ...formData,
        batchId: Number(formData.batchId), // backend expects Long
      });

      setOpen(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        parentPhone: "",
        standard: "",
        batchId: "",
        status: "ACTIVE",
      });
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Failed to add student. Please check inputs.");
    }
  };

  if (loading) return <Typography sx={{ mt: 5 }}>Loading...</Typography>;
  if (error)
    return (
      <Typography sx={{ mt: 5 }} color="error">
        Error fetching students
      </Typography>
    );

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Student Details
      </Typography>

      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpen(true)}>
        Add Student
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Parent Phone</TableCell>
              <TableCell>Standard</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.length > 0 ? (
              students.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.id}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.phone}</TableCell>
                  <TableCell>{s.parentPhone}</TableCell>
                  <TableCell>{s.standard}</TableCell>
                  <TableCell>{s.batchId}</TableCell>
                  <TableCell>{s.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ---------------- Add Student Dialog ---------------- */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add Student</DialogTitle>

        <DialogContent>
          <TextField label="Name" name="name" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Email" name="email" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Phone" name="phone" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Parent Phone" name="parentPhone" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Standard" name="standard" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Batch ID" name="batchId" fullWidth margin="dense" onChange={handleChange} />

          <TextField
            select
            label="Status"
            name="status"
            fullWidth
            margin="dense"
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddStudent}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Students;
