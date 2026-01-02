import React, { useEffect, useState } from "react";
import { getBatches, createBatch, deleteBatch } from "../api/batchApi";
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

const Batches = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState(null);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    subject: "",
    teacherName: "",
    startTime: "",
    endTime: "",
    daysOfWeek: "",
    maxCapacity: "",
    status: "ACTIVE",
  });

  /* ---------------- Fetch batches ---------------- */
  const fetchBatches = async () => {
    try {
      setLoading(true);
      const data = await getBatches();
      setBatches(data || []);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  /* ---------------- Add batch ---------------- */
  const handleAddBatch = async () => {
    setSaving(true);
    try {
      await createBatch({
        ...formData,
        maxCapacity: Number(formData.maxCapacity),
      });
      setOpenAdd(false);
      fetchBatches();
    } catch (err) {
      alert("Failed to add batch");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- Delete batch ---------------- */
  const handleDeleteConfirm = async () => {
    try {
      await deleteBatch(selectedBatchId);
      setOpenDelete(false);
      setSelectedBatchId(null);
      fetchBatches(); // refresh list
    } catch (err) {
      alert("Failed to delete batch");
    }
  };

  if (loading) return <Typography sx={{ mt: 5 }}>Loading...</Typography>;
  if (error) return <Typography sx={{ mt: 5 }} color="error">Error loading batches</Typography>;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Batch Details
      </Typography>

      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpenAdd(true)}>
        Add Batch
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Days</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {batches.map((batch) => (
              <TableRow key={batch.id}>
                <TableCell>{batch.id}</TableCell>
                <TableCell>{batch.subject}</TableCell>
                <TableCell>{batch.teacherName}</TableCell>
                <TableCell>{batch.startTime}</TableCell>
                <TableCell>{batch.endTime}</TableCell>
                <TableCell>{batch.daysOfWeek}</TableCell>
                <TableCell>{batch.maxCapacity}</TableCell>
                <TableCell>{batch.status}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => {
                      setSelectedBatchId(batch.id);
                      setOpenDelete(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* -------- Delete Confirmation Dialog -------- */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Batch</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this batch?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Batches;
