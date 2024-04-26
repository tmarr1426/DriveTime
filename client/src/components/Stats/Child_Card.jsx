import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Child_Card = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/stats/child_card_stats",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("MyToken")}`,
            },
          }
        );
        const json = await response.json();
        console.log("jsonn", json);

        setResults(json.newUserStats);
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, []);

  return (
    <div>
      {results.map((obj) => {
        return (
          <Card key={obj.id} style={{ width: "40em", margin: "1em" }}>
            <CardContent>
              <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
                {obj.FirstName}
              </Typography>
              <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
                Total Hours Driven: {obj.totalHours}
              </Typography>
              <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
                Total Day Hours Driven: {obj.totalDayHours}
              </Typography>
              <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
                Total Night Hours Driven: {obj.totalNightHours}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Child_Card;