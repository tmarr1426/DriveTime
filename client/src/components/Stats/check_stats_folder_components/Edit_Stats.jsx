import React, { useEffect, useState } from "react";

const Edit_Stats = ({ stats, setShowEdit }) => {
  const [hoursResults, setHoursResults] = useState(stats.hours);
  const [vehicle, setVehicle] = useState(stats.vehicle_type);
  const [weatherResults, setWeatherResults] = useState(stats.weather);
  const [from, setFrom] = useState(stats.from);
  const [to, setTo] = useState(stats.to);
  const [day, setDay] = useState(stats.day);

  const editPost = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8081/stats/edit/${stats.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("MyToken"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hours: parseInt(hoursResults),
            vehicle_type: vehicle,
            weather: weatherResults,
            day: day,
            from: from,
            to: to,
            practiced: "practiced",
          }),
        }
      );

      const json = await response.json();

      console.log(json);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(stats);
  return (
    <div
      style={{
        backgroundColor: "yellow",
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "20px",
        height: "20px",
        transform: "translate(-50%, -50%)",
        zIndex: 5,
      }}
    >
      <form onSubmit={(e) => editPost(e)}>
        <input
          value={hoursResults}
          onChange={(e) => setHoursResults(e.target.value)}
        ></input>
        <input value={day === false ? "Night" : "Day"}></input>
        <input value={vehicle}></input>
        <input value={weatherResults}></input>
        <input value={from}></input>
        <input value={to}></input>
        <input value="practiced"></input>
        <button>Edit</button>
        <button onClick={() => setShowEdit(false)} type="button">
          Close
        </button>
      </form>
    </div>
  );
};

export default Edit_Stats;
