test("get para /api/v1/status deveria retornar status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.atualizado_em).toBeDefined();
  expect(responseBody.dependencies.database.versao).toBeDefined();
  expect(responseBody.dependencies.database.conexao_maxima).toBeDefined();
  expect(responseBody.dependencies.database.conexao_ativa).toEqual(1);

  expect(responseBody.dependencies.database.versao).toEqual("16.12")
});
