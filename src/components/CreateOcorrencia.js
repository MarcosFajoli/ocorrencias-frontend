import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const OcorrenciaWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const OcorrenciaForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const TextArea = styled.textarea`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const CreateOcorrencia = () => {
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Assume que o token foi armazenado no login
    try {
        axios.post(
            'http://localhost:3000/ocorrencias',
            {
              descricao: 'Descrição da ocorrência',
              isAnonima: false,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Envia o token JWT no cabeçalho
              },
            }
          )
            .then(response => {
              console.log('Ocorrência criada com sucesso', response.data);
            })
            .catch(error => {
              console.error('Erro ao criar ocorrência:', error);
            });
      alert('Ocorrência registrada com sucesso!');
      navigate('/dashboard'); // Redireciona para o dashboard
    } catch (error) {
      console.error('Erro ao registrar ocorrência:', error);
      alert('Falha ao registrar ocorrência.');
    }
  };

  return (
    <OcorrenciaWrapper>
      <OcorrenciaForm onSubmit={handleSubmit}>
        <h2>Registrar Ocorrência</h2>
        <TextArea
          rows="5"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button type="submit">Registrar</Button>
      </OcorrenciaForm>
    </OcorrenciaWrapper>
  );
};

export default CreateOcorrencia;
