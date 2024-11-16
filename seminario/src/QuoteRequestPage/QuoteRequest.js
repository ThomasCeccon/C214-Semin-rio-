import React, { useState } from 'react';
import './styles.css';

function QuoteRequest() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    details: '',
    urgency: 'low',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Solicitação de orçamento enviada:\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <div className="card-container">
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
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Solicitar Orçamento</button>
      </form>
    </div>
  );
}

export default QuoteRequest;
