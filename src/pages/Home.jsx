import { Container, Typography, Paper, Box } from "@mui/material";

const Home = () => {
  return (
    <Container sx={{ mt: 5 }}>
      <Paper sx={{ p: 5 }}>
        <Typography variant="h4" gutterBottom>Welcome to Tuition Attendance System</Typography>
        <Typography variant="body1" gutterBottom>
          Use the navigation bar to manage Students, Batches, mark Attendance, and view Reports.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">Logged-in features include:</Typography>
          <ul>
            <li>View and manage students</li>
            <li>View and manage batches</li>
            <li>Mark daily attendance</li>
            <li>Generate attendance reports</li>
          </ul>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
