const request = require("supertest");
const app = require("../server");

describe("Testando funções de manipulação de dados", () => {
  test("deve retornar uma lista de solicitações de orçamento", async () => {
    const response = await request(app).get("/api/quote-requests");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
