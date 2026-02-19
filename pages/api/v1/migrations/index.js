import migrationRunner from 'node-pg-migrate'
import { join } from 'node:path'
import database from 'infra/database';
import db from 'node-pg-migrate/dist/db';

export default async function migrations(req, res) {

    const dbClient = await database.getNewClient();

    const defaultMigrationOptions = {
        dbClient: dbClient,
        dryRun: true,
        dir: join("infra", "migrations"),
        direction: 'up',
        verbose: true,
        migrationsTable: "pgmigrations",
    }

    if (req.method === 'GET') {
        const migrationsPendentes = await migrationRunner(defaultMigrationOptions);
        await dbClient.end();
        res.status(200).json(migrationsPendentes);
    }

    if (req.method === 'POST') {
        const migrationMigrada = await migrationRunner({
            ...defaultMigrationOptions,
            dryRun: false,
        });
        await dbClient.end();

        if (migrationMigrada.length > 0) {
            return res.status(201).json(migrationMigrada);
        }

        res.status(200).json(migrationMigrada);
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
