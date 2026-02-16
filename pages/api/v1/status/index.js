import database from "infra/database";

async function status(request, response) {
  const atualizadoEm = new Date().toISOString();
  const versaoPostgresResult = await database.query("Show server_version;");
  const versaoPostgres = versaoPostgresResult.rows[0].server_version;

  const conexaoMaximasResult = await database.query("SHOW max_connections;");
  const conexaoMaxima = conexaoMaximasResult.rows[0].max_connections;

  const nomeDb = process.env.POSTGRES_DB;

  const conexaoAtivaResult = await database.query({
    text: `
    SELECT count(*)::int AS total
    FROM pg_stat_activity
    WHERE datname = $1;
  `,
    values: [nomeDb],
  });

  const conexaoAtiva = conexaoAtivaResult.rows[0].total

  console.log(conexaoAtiva)
  response.status(200).json({
    atualizado_em: atualizadoEm,
    dependencies: {
      database: {
        versao: versaoPostgres,
        conexao_maxima: parseInt(conexaoMaxima),
        conexao_ativa: conexaoAtiva,
      },
    },
  });
}

export default status;
