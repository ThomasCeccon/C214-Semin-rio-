import React, { useState, useEffect } from "react";
import "./styles.css";

function QuoteRequest() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    details: "",
    urgency: "baixa",
  });

  const [quoteRequests, setQuoteRequests] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/quote-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Solicitação enviada com sucesso:", data);
        
        fetchQuoteRequests();
      })
      .catch((error) => {
        console.error("Erro ao enviar solicitação:", error);
      });

    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      details: "",
      urgency: "baixa",
    });
  };

  const fetchQuoteRequests = () => {
    fetch("http://localhost:3000/api/quote-requests")
      .then((response) => response.json())
      .then((data) => {
        setQuoteRequests(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar as solicitações:", error);
      });
  };

  useEffect(() => {
    fetchQuoteRequests();
  }, []);

  return (
    <div className="main-container">
      <div className="form-section">
        <form onSubmit={handleSubmit} className="card">
          <h1>Solicitação de Orçamento</h1>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite seu nome"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Digite seu telefone"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="service">Serviço</label>
            <input
              type="text"
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              placeholder="Serviço desejado"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="details">Detalhes</label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Descreva os detalhes do serviço"
            />
          </div>
          <div className="form-group">
            <label htmlFor="urgency">Urgência</label>
            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              required
            >
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">
            Solicitar Orçamento
          </button>
        </form>
      </div>

      <div className="table-section">
        <h2>Tabela de Solicitações de Orçamento</h2>
        <table className="quote-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Serviço</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Urgência</th>
            </tr>
          </thead>
          <tbody>
            {quoteRequests.length === 0 ? (
              <tr className="no-data">
                <td colSpan="5">
                  Nenhuma solicitação de orçamento cadastrada.
                </td>
              </tr>
            ) : (
              quoteRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.name}</td>
                  <td>{request.service}</td>
                  <td>{request.email}</td>
                  <td>{request.phone}</td>
                  <td>{request.urgency}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuoteRequest;
