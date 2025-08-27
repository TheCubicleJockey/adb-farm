#!/usr/bin/node

const r = require('rethinkdb');

async function cleanOfflineX86Devices() {
  let conn;
  try {
    conn = await r.connect({
      host: 'localhost',
      port: 28015,
      db: 'stf',
      authKey: 'rethinkdb'
    });

    const result = await r.table('devices')
      .filter({
        abi: 'x86',
        present: false
      })
      .delete()
      .run(conn);

    console.log('cleaned devices: ' + result.deleted);
  } catch (err) {
    console.error('Error cleaning devices:', err);
    process.exit(1);
  } finally {
    if (conn) {
      conn.close();
    }
  }
}

cleanOfflineX86Devices();
