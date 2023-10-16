/** Container - presentation design pattern */
/**presentation component for bus time table */
import BusTimeAdder from '../components/BusTimeAdder';
import Button from 'react-bootstrap/Button';
import DisplayBusTime from '../components/DisplayBusTime';
import React from 'react';

const TimeTablePresentation = ({ showForm, openForm, closeForm }) => {
  return (
    <div>
      <br /><br />
      <h2 style={{
        marginTop: "0px",
        color: "#5A5A5A",
        textAlign: "left",
        marginLeft: "280px"
      }}>Bus Time Table</h2>

      <div>
        <Button onClick={openForm} style={{ marginRight: "60px", float: "right", marginBottom: "20px", backgroundColor: "#429e7f", border: "#429e7f" }}>New Time Info</Button>
        {showForm && <BusTimeAdder onClose={closeForm} />}
      </div>
      <DisplayBusTime />
    </div>
  );
};

export default TimeTablePresentation;
