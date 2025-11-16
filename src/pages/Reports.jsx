// import { useState } from "react";
// import { Container, Typography, TextField, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
// import axiosInstance from "../api/Api";
// import Loader from "../component/Loader";

// const Reports = () => {
//   const [studentId, setStudentId] = useState("");
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const [report, setReport] = useState([]);

//   const fetchReport = async () => {
//     const { data } = await axiosInstance.get(`/reports/student/${studentId}?month=${month}&year=${year}`);
//     setReport(data);
//   };

//   return (
//     <Container sx={{ mt: 5 }}>
//       <Typography variant="h4" gutterBottom>Student Attendance Report</Typography>
//       <TextField label="Student ID" type="number" value={studentId} onChange={e => setStudentId(e.target.value)} sx={{ mr: 2 }} />
//       <TextField label="Month" type="number" value={month} onChange={e => setMonth(e.target.value)} sx={{ mr: 2 }} />
//       <TextField label="Year" type="number" value={year} onChange={e => setYear(e.target.value)} sx={{ mr: 2 }} />
//       <Button variant="contained" onClick={fetchReport}>Get Report</Button>

//       {report.length === 0 ? null :
//         <TableContainer component={Paper} sx={{ mt: 3 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {report.map(r => (
//                 <TableRow key={r.date}>
//                   <TableCell>{r.date}</TableCell>
//                   <TableCell>{r.status}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       }
//     </Container>
//   );
// };

// export default Reports;
