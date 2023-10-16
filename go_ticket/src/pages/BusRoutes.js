/**container - presentation design pattern */
/*container component for bus route*/
import BusRoutesPresentation from '../presnetations/BusRoutesPresentation';
import React, { useState } from 'react';

const BusRoutesContainer = () => {
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <BusRoutesPresentation
      showForm={showForm}
      openForm={openForm}
      closeForm={closeForm}
    />
  );
};

export default BusRoutesContainer;

