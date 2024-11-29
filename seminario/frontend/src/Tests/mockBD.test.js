import { render, screen, waitFor } from "@testing-library/react";
import QuoteRequest from "../QuoteRequestPage/QuoteRequest";
import mockBD from "../../../backend/data/mockBD.json"; // dados do banco de dados da aplicação
import "@testing-library/jest-dom";

describe("mock de API e renderização", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test("deve exibir uma solicitação de orçamento na tabela", async () => {
    // Mock da função fetch dentro do teste
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockBD),
    });

    // Renderiza o componente
    render(<QuoteRequest />);

    // Verifica se um dos registros foi renderizado com sucesso, conforme o mock
    await waitFor(() => {
      expect(screen.getByText(/Joana/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/Desenvolvedora/i)).toBeInTheDocument();
    });
  });
});
