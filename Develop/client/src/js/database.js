// database.js

import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('Post to the database');
  //Trying await initdb to see if that fixes error
  try {
    const jateDb = await initdb();
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.add({ value: content });
    const result = await request;
    console.log('Data saved to the database', result);
  } catch (error) {
    console.error('Error adding data to the database:', error);
    throw error;
  }
};

// Get All Entries From DB
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log('Content from DB', result);
  return result?.value;
};

initdb();