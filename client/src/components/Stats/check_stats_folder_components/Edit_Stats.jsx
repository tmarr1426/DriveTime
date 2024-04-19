import React, { useState } from "react";
import Modal from "react-modal";
import "../ToggleSwitch.css";
Modal.setAppElement("#root");

const Edit_Stats = ({ stats, setShowEdit, setReFetch, showEdit }) => {
  const [hoursResults, setHoursResults] = useState(stats.hours);
  const [vehicle, setVehicle] = useState(stats.vehicle_type);
  const [weatherResults, setWeatherResults] = useState(stats.weather);
  const [from, setFrom] = useState(stats.from);
  const [to, setTo] = useState(stats.to);
  const [day, setDay] = useState(stats.day);
  const [notes, setNotes] = useState(stats.notes);
  const [practiced, setPracticed] = useState(stats.practiced);

  const weatherOptions = ["Rainy", "Snowy", "Clear"];

  const vehicleTypes = ["Sedan", "Truck", "Van", "SUV", "Motorcycle"];

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
            practiced: practiced,
            notes: notes,
          }),
        }
      );

      const json = await response.json();

      setReFetch((prev) => !prev);

      console.log(json);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(stats);
  return (
    <Modal
      className="modal"
      isOpen={showEdit}
      onRequestClose={closeModal}
      contentLabel="Edit Stats Modal"
      appElement={document.getElementById("root")}
    >
      <div>
        <form onSubmit={(e) => editPost(e)}>
          <label htmlFor="hoursInput">Hours</label>
          <input
            id="hoursInput"
            value={hoursResults}
            onChange={(e) => setHoursResults(e.target.value)}
          ></input>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="daySlider">
              {day === false ? "Night" : "Day"}
            </label>
            <label className="switch">
              <input
                id="daySlider"
                type="checkbox"
                checked={day}
                onChange={(e) => setDay(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <label htmlFor="vehicleSlider">Vehicle Type</label>
          <select
            id="vehicleSlider"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
          >
            <option value="">Select Vehicle Type</option>
            {vehicleTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <label htmlFor="weatherSlider">Weather</label>
          <select
            id="weatherSlider"
            value={weatherResults}
            onChange={(e) => setWeatherResults(e.target.value)}
          >
            <option value="">Select Weather</option>
            {weatherOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label htmlFor="fromInput">From</label>
          <input value={from} onChange={(e) => setFrom(e.target.value)}></input>

          <label htmlFor="toInput">To</label>
          <input value={to} onChange={(e) => setTo(e.target.value)}></input>

          <label htmlFor="practicedInput">Practiced</label>
          <input
            value={practiced}
            onChange={(e) => setPracticed(e.target.value)}
          ></input>

          <label htmlFor="notesInput">Notes</label>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></input>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button>Edit</button>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={() => setShowEdit(false)} type="button">
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Edit_Stats;
