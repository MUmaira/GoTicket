/**container - presentation design pattern */
/**presentation component for bus route */
import Button from 'react-bootstrap/Button';
import DisplayRoute from '../components/DisplayRoute';
import React from 'react';
import RouteAdder from '../components/RouteAdder';


const BusRoutesPresentation = ({ showForm, openForm, closeForm }) => {
  return (
    <div>
      <br /><br />
      <h2 style={{
        marginTop: "0px",
        color: "#5A5A5A",
        textAlign: "left",
        marginLeft: "280px"
      }}>
        Available Routes
      </h2>

      <div>
        <Button onClick={openForm} style={{ marginRight: "60px", float: "right", marginBottom: "20px", backgroundColor: "#429e7f" }}>
          Add new Route
        </Button>
        {showForm && <RouteAdder onClose={closeForm} />}
      </div>
      <div>
        <DisplayRoute />
      </div>
    </div>
  );
};

export default BusRoutesPresentation;
