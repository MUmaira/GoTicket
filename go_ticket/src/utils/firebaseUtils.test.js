// Import necessary modules
import { getRecordCount, getColumnSum } from './firebaseUtils'; 
import fireDb from '../config/firebase';

// Mock the firebase module
jest.mock('../config/firebase', () => ({
  child: jest.fn(() => ({
    once: jest.fn(() => Promise.resolve({ val: jest.fn(() => 'someValue') })),
  })),
}));

describe('Firebase Utility Functions', () => {
  // Test suite for getRecordCount function
  describe('getRecordCount', () => {
    it('should fetch record count correctly', async () => {
      const tableName = 'routes';  
      const callback = jest.fn();

      await getRecordCount(tableName, callback);

      expect(fireDb.child).toHaveBeenCalledWith(tableName);
      expect(fireDb.child().once).toHaveBeenCalledWith('value');
      expect(callback).toHaveBeenCalledWith('someValue');
    });

    it('should handle errors when fetching record count', async () => {
      const tableName = 'routes';
      const callback = jest.fn();
      fireDb.child().once.mockImplementation(() => Promise.reject('Error'));

      await getRecordCount(tableName, callback);

      expect(callback).toHaveBeenCalledWith(null);
    });
  });

  // Test suite for getColumnSum function
  describe('getColumnSum', () => {
    it('should calculate column sum correctly', async () => {
        const columnName = 'NoOfBus'; 
    const callback = jest.fn();

    // Mocking Firebase child and once methods
    jest.spyOn(global, 'parseFloat').mockReturnValue(5); 

    await getColumnSum('routes', columnName, callback, mockDatabaseRef);

    expect(callback).toHaveBeenCalledWith(219);
  });

  it('handles non-numeric values gracefully', async () => {
    const columnName = 'NoOfBus'; 
    const callback = jest.fn();

    // Mocking Firebase child and once methods
    jest.spyOn(global, 'parseFloat').mockReturnValue(NaN);

    await getColumnSum('routes', columnName, callback, mockDatabaseRef);

    expect(callback).toHaveBeenCalledWith(0);
  });
});
    });

    it('should handle errors when calculating column sum', async () => {
      // TODO: Write your error handling test case for getColumnSum
    });

