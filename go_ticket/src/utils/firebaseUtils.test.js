import { getRecordCount, getColumnSum } from './firebaseUtils'; 
import fireDb from '../config/firebase';

// Mock the firebase module
jest.mock('../config/firebase', () => ({
  child: jest.fn(() => ({
    once: jest.fn(() => Promise.resolve({ val: jest.fn(() => 'someValue'), numChildren: () => 5 })),
  })),
}));

describe('Firebase Utility Functions', () => {
  // Test suite for getRecordCount function
  describe('getRecordCount', () => {
    it('should fetch record count correctly', async () => {
      const tableName = 'routes';  
      const callback = jest.fn();

      await getRecordCount(tableName, callback);

      // Asserts that the Firebase methods are called
      expect(fireDb.child).toHaveBeenCalledWith(tableName);
      expect(fireDb.child().once).toHaveBeenCalledWith('value');
      expect(callback).toHaveBeenCalledWith(5); 
    });

    it('should handle errors when fetching record count', async () => {
      const tableName = 'routes';
      const callback = jest.fn();
      
      // Mock the once method to simulate an error
      fireDb.child().once.mockImplementation(() => Promise.reject('Error'));

      await getRecordCount(tableName, callback);

      // Verifying that the callback is called with null when an error occurs
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

      await getColumnSum('routes', columnName, callback);

      // Verifying that the callback is called with the expected value
      expect(callback).toHaveBeenCalledWith(5);
    });

    it('handles non-numeric values gracefully', async () => {
      const columnName = 'NoOfBus'; 
      const callback = jest.fn();

      // Mocking Firebase child and once methods
      jest.spyOn(global, 'parseFloat').mockReturnValue(NaN);

      await getColumnSum('routes', columnName, callback);

      // Verifying that the callback is called with 0 for non-numeric values
      expect(callback).toHaveBeenCalledWith(0);
    });

    it('should handle errors when calculating column sum', async () => {
      const columnName = 'NoOfBus'; 
      const callback = jest.fn();
      
      // Mocking the once method to simulate an error
      fireDb.child().once.mockImplementation(() => Promise.reject('Error'));

      await getColumnSum('routes', columnName, callback);

      // Verifying that the callback is called with 0 when an error occurs
      expect(callback).toHaveBeenCalledWith(0);
    });
  });
});
