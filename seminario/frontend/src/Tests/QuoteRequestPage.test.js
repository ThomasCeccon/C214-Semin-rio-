import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import QuoteRequest from "../QuoteRequestPage/QuoteRequest";

describe("Testes da tela 'QuoteRequest'", () => {
  test("renderizar o componente corretamente", () => {
    render(<QuoteRequest />);
    expect(screen.getByPlaceholderText(/Digite seu nome/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Digite seu e-mail/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Digite seu telefone/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Serviço desejado/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Descreva os detalhes do serviço/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Solicitar Orçamento/i)).toBeInTheDocument();
  });

  test("mostrar mensagem padrão quando não há nenhuma solicitação na tabela", () => {
    render(<QuoteRequest />);
    expect(
      screen.getByText(/Nenhuma solicitação de orçamento cadastrada./i)
    ).toBeInTheDocument();
  });

  test("não exibe a mensagem padrão quando há solicitações cadastradas", async () => {
    const mockQuoteRequests = [
      {
        name: "João Silva",
        email: "joao@email.com",
        phone: "99999-9999",
        service: "Manutenção",
        urgency: "alta",
      },
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockQuoteRequests),
      })
    );

    render(<QuoteRequest />);
    await waitFor(() =>
      expect(
        screen.queryByText(/Nenhuma solicitação de orçamento cadastrada./i)
      ).not.toBeInTheDocument()
    );
  });

  test("adiciona uma nova solicitação e exibe na tabela", async () => {
    const mockQuoteRequests = [
      {
        name: "João Silva",
        email: "joao@email.com",
        phone: "99999-9999",
        service: "Manutenção",
        urgency: "alta",
      },
    ];

    global.fetch = jest.fn((url, options) => {
      if (url.includes("quote-requests") && !options) {
        return Promise.resolve({
          json: () => Promise.resolve(mockQuoteRequests),
        });
      }

      if (
        url.includes("quote-requests") &&
        options &&
        options.method === "POST"
      ) {
        return Promise.resolve({
          json: () => Promise.resolve({ success: true }),
        });
      }

      return Promise.reject(new Error("Endpoint não mapeado no mock"));
    });

    render(<QuoteRequest />);

    fireEvent.change(screen.getByPlaceholderText(/Digite seu nome/i), {
      target: { value: "João Silva" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Digite seu e-mail/i), {
      target: { value: "joao@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Digite seu telefone/i), {
      target: { value: "99999-9999" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Serviço desejado/i), {
      target: { value: "Manutenção" },
    });
    fireEvent.change(
      screen.getByPlaceholderText(/Descreva os detalhes do serviço/i),
      {
        target: { value: "Conserto de vazamento" },
      }
    );
    fireEvent.change(screen.getByLabelText(/Urgência/i), {
      target: { value: "alta" },
    });

    fireEvent.click(screen.getByText(/Solicitar Orçamento/i));

    await waitFor(() => {
      expect(screen.getByText("João Silva")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Manutenção")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("joao@email.com")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("99999-9999")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("alta")).toBeInTheDocument();
    });
  });

  test("resetar o formulário depois da submissão", async () => {
    global.fetch = jest.fn((url, options) => {
      if (
        url.includes("quote-requests") &&
        options &&
        options.method === "POST"
      ) {
        return Promise.resolve({
          json: () => Promise.resolve({ success: true }),
        });
      }

      return Promise.reject(new Error("Endpoint não mapeado no mock"));
    });

    render(<QuoteRequest />);

    const nameInput = screen.getByPlaceholderText(/Digite seu nome/i);
    const emailInput = screen.getByPlaceholderText(/Digite seu e-mail/i);
    const phoneInput = screen.getByPlaceholderText(/Digite seu telefone/i);
    const serviceInput = screen.getByPlaceholderText(/Serviço desejado/i);
    const detailsInput = screen.getByPlaceholderText(
      /Descreva os detalhes do serviço/i
    );
    const urgencyInput = screen.getByLabelText(/Urgência/i);

    fireEvent.change(nameInput, { target: { value: "João Silva" } });
    fireEvent.change(emailInput, { target: { value: "joao@email.com" } });
    fireEvent.change(phoneInput, { target: { value: "99999-9999" } });
    fireEvent.change(serviceInput, { target: { value: "Manutenção" } });
    fireEvent.change(detailsInput, {
      target: { value: "Conserto de vazamento" },
    });
    fireEvent.change(urgencyInput, { target: { value: "alta" } });

    fireEvent.click(screen.getByText(/Solicitar Orçamento/i));

    await waitFor(() => {
      expect(nameInput.value).toBe("");
    });
    await waitFor(() => {
      expect(emailInput.value).toBe("");
    });
    await waitFor(() => {
      expect(phoneInput.value).toBe("");
    });
    await waitFor(() => {
      expect(serviceInput.value).toBe("");
    });
    await waitFor(() => {
      expect(detailsInput.value).toBe("");
    });
    await waitFor(() => {
      expect(urgencyInput.value).toBe("baixa");
    });
  });

  test("exibe mensagem de erro quando o envio falha", async () => {
    const mockError = new Error("Erro de conexão");
    global.fetch = jest.fn(() => Promise.reject(mockError));
  
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();
  
    render(<QuoteRequest />);
  
    fireEvent.change(screen.getByPlaceholderText(/Digite seu nome/i), {
      target: { value: "João Silva" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Digite seu e-mail/i), {
      target: { value: "joao@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Digite seu telefone/i), {
      target: { value: "99999-9999" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Serviço desejado/i), {
      target: { value: "Manutenção" },
    });
    fireEvent.change(
      screen.getByPlaceholderText(/Descreva os detalhes do serviço/i),
      {
        target: { value: "Conserto de vazamento" },
      }
    );
    fireEvent.change(screen.getByLabelText(/Urgência/i), {
      target: { value: "alta" },
    });
  
    fireEvent.click(screen.getByText(/Solicitar Orçamento/i));

    await waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledWith(
        "Erro ao enviar solicitação:",
        mockError
      );
    });
  
    consoleErrorMock.mockRestore();
  });
});
