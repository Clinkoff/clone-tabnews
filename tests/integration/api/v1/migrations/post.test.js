import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
    await database.query("drop schema public cascade; create schema public;");
}

test("POST para /api/v1/migrations deve retornar 200 e rodar as migrations", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST",
    });

    expect(response.status).toBe(201);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    for (const migration of responseBody) {
        expect(migration.name).toBeTruthy();
    }

});

test("POST para /api/v1/migrations deve retornar 200 e NÃO rodar migrations já aplicadas", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST",
    });

    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBe(0);
});