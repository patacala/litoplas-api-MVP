SELECT 'CREATE DATABASE postgres'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE dataname = 'postgres');