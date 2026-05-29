#!/usr/bin/env sh
set -eu
node <<'NODE'
const { Client } = require('pg');
const url = process.env.DATABASE_URL;
const max = 60;
(async () => {
  for (let i = 1; i <= max; i++) {
    const client = new Client({ connectionString: url });
    try { await client.connect(); await client.end(); console.log('PostgreSQL disponível.'); return; }
    catch (err) { console.log(`Aguardando PostgreSQL... tentativa ${i}/${max}`); await new Promise(r => setTimeout(r, 2000)); }
  }
  console.error('PostgreSQL não ficou disponível a tempo.'); process.exit(1);
})();
NODE
