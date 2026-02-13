const calculadora = require("../../models/calculadora");

test("soma dois números corretamente", () => {
  const resultado = calculadora.somar(2, 3);
  expect(resultado).toBe(5);
});

test("somar 5 + 100 deveria retornar 105 números corretamente", () => {
  const resultado = calculadora.somar(5, 100);
  expect(resultado).toBe(105);
});

test("somar string deveria retornar erro", () => {
  const resultado = calculadora.somar("5", 100);
  expect(resultado).toBeNaN();
});
