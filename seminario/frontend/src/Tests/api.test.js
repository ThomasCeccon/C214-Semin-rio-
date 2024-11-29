import { render, screen, waitFor } from "@testing-library/react";
import QuoteRequest from "../QuoteRequestPage/QuoteRequest";
import "@testing-library/jest-dom";

describe("mock de API e renderização", () => {
  beforeEach(() => {
    // Limpa o mock do fetch antes de cada teste
    global.fetch = jest.fn();
  });

  test("deve exibir uma solicitação de orçamento na tabela", async () => {
    // Mock da função fetch dentro do teste
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue([
        {
          name: "João",
          email: "joao@example.com",
          phone: "123456789",
          service: "Web Design",
          urgency: "alta",
        },
      ]),
    });

    // Renderiza o componente
    render(<QuoteRequest />);

    // Espera que o componente renderize os dados após a chamada da API
    // Verifica se os dados mockados estão na tela
    await waitFor(() => {
      expect(screen.getByText(/João/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/Web Design/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/joao@example.com/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/123456789/i)).toBeInTheDocument();
    });
  });

  test("deve exibir um texto de 'nenhuma solicitação' quando não houver dados", async () => {
    // Mock da resposta para nenhum dado
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue([]), // Nenhum dado retornado
    });

    render(<QuoteRequest />);

    // Espera que o fetch tenha sido chamado
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Verifica se o texto 'Nenhuma solicitação de orçamento cadastrada' é exibido
    expect(
      screen.getByRole("cell", {
        name: /Nenhuma solicitação de orçamento cadastrada/i,
      })
    ).toBeInTheDocument();
  });
});
