import fireDb from '../config/firebase';

const getRecordCount =(tableName, callback) =>{

const databaseRef = fireDb.child(tableName);

databaseRef.once('value')
  .then(snapshot => {
    const count = snapshot.numChildren();
    callback(count);
  })
  .catch(error =>{
    console.error("Error fetching Record Count: ", error);
    callback(null);
  })
}

const getColumnSum = (tableName, columnName, callback) =>{
    const databaseRef = fireDb.child(tableName);

    databaseRef.once('value')
    .then(snapshot => {
        let sum = 0;
        snapshot.forEach(childSnapshot => {
            const columnValue = childSnapshot.child(columnName).val();
            console.log('Column Value: ', columnValue)

             const numericValue = parseFloat(columnValue);
            if (!isNaN(numericValue)) {
              sum += numericValue;
              console.log('Current Sum:', sum);
            } else {
              console.warn('Skipping non-numeric value:', columnValue);
            }
        });
      console.log('Final sum: ',sum)
      callback(sum);
    })
    .catch(error =>{
        console.error('Error calculating Sum: ', error);
        callback(null);
    })
}

export {getRecordCount, getColumnSum};