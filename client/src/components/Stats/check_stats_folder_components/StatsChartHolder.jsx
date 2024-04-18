import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Edit_Stats from "./Edit_Stats";
import Delete_Stats from "./Delete_Stats";

const StatsList = ({ results, setReFetch }) => {
  // prop results passed from check_stats

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [statsObj, setStatsObj] = useState({});

  return (
    <div style={{ position: "relative" }}>
      {showEdit ? (
        <Edit_Stats
          stats={statsObj}
          setShowEdit={setShowEdit}
          showEdit={showEdit}
          setReFetch={setReFetch}
        />
      ) : null}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Hours</TableCell>
              <TableCell align="center">Date Posted</TableCell>
              <TableCell align="center">Vehicle</TableCell>
              <TableCell align="center">Weather</TableCell>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
              <TableCell align="center">Day/Night</TableCell>
              <TableCell align="center">Practiced</TableCell>
              <TableCell align="center">Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((obj, index) => {
              return (
                <>
                  <TableRow
                    style={{ backgroundColor: index % 2 == 0 ? "red" : "blue" }}
                    // if row is even, color background red, if odd, color background blue
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {obj.hours}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(obj.timestamp).toDateString()}
                    </TableCell>
                    <TableCell align="center">{obj.vehicle_type}</TableCell>
                    <TableCell align="center">{obj.weather}</TableCell>
                    <TableCell align="center">{obj.from}</TableCell>
                    <TableCell align="center">{obj.to}</TableCell>
                    <TableCell align="center">
                      {obj.day === false ? "Night" : "Day"}
                    </TableCell>
                    <TableCell align="center">{obj.practiced}</TableCell>
                    <TableCell align="center">{obj.notes}</TableCell>
                    <TableCell
                      align="center"
                      onClick={() => {
                        setShowEdit((p) => !p);
                        setStatsObj(obj);
                      }}
                    >
                      <button> Edit </button>
                    </TableCell>
                    <TableCell align="center">
                      <Delete_Stats stats={obj} setReFetch={setReFetch} />
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StatsList;
