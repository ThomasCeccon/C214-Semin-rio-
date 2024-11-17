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

  test("não mostrar mensagem padrão quando houver solicitação na tabela", () => {
    render(<QuoteRequest />);

    const nameInput = screen.getByPlaceholderText(/Digite seu nome/i);
    fireEvent.change(nameInput, { target: { value: "João Silva" } });

    const submitButton = screen.getByText(/Solicitar Orçamento/i);
    fireEvent.click(submitButton);

    expect(
      screen.queryByText(/Nenhuma solicitação de orçamento cadastrada./i)
    ).not.toBeInTheDocument();
  });

  test("submeter uma nova solicitação e adicioná-la à tabela", async () => {
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
      { target: { value: "Conserto de vazamento" } }
    );
    fireEvent.change(screen.getByLabelText(/Urgência/i), {
      target: { value: "alta" },
    });

    fireEvent.click(screen.getByText(/Solicitar Orçamento/i));

    await screen.findByText("João Silva");
    await screen.findByText("Manutenção");
    await screen.findByText("joao@email.com");
    await screen.findByText("99999-9999");
    await screen.findByText("alta");
  });

  test("resetar o formulário depois da submissão", async () => {
    render(<QuoteRequest />);

    const nameInput = screen.getByPlaceholderText(/Digite seu nome/i);
    fireEvent.change(nameInput, {
      target: { value: "João Silva" },
    });

    const emailInput = screen.getByPlaceholderText(/Digite seu e-mail/i);
    fireEvent.change(emailInput, {
      target: { value: "joao@email.com" },
    });

    const telephoneInput = screen.getByPlaceholderText(/Digite seu telefone/i);
    fireEvent.change(telephoneInput, {
      target: { value: "99999-9999" },
    });

    const serviceInput = screen.getByPlaceholderText(/Serviço desejado/i);
    fireEvent.change(serviceInput, {
      target: { value: "Manutenção" },
    });

    const detailsInput = screen.getByPlaceholderText(
      /Descreva os detalhes do serviço/i
    );
    fireEvent.change(detailsInput, {
      target: { value: "Conserto de vazamento" },
    });

    const urgencyInput = screen.getByLabelText(/Urgência/i);
    fireEvent.change(urgencyInput, {
      target: { value: "alta" },
    });

    fireEvent.click(screen.getByText(/Solicitar Orçamento/i));

    await waitFor(() => expect(nameInput.value).toBe(""));
    await waitFor(() => expect(emailInput.value).toBe(""));
    await waitFor(() => expect(telephoneInput.value).toBe(""));
    await waitFor(() => expect(serviceInput.value).toBe(""));
    await waitFor(() => expect(detailsInput.value).toBe(""));
    await waitFor(() => expect(urgencyInput.value).toBe("baixa"));
  });
});