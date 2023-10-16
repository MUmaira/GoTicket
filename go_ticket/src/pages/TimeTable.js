/**container=presentation design pattern */
/**container component for bsu time table*/ 
import React, { useState } from 'react';
import TimeTablePresentation from '../presnetations/TimeTablePresentation';

const TimeTableContainer = () => {
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <TimeTablePresentation
      showForm={showForm}
      openForm={openForm}
      closeForm={closeForm}
    />
  );
};

export default TimeTableContainer;

