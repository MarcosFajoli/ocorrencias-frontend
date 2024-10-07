import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const DashboardWrapper = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  height: 100vh;
`;

const OcorrenciaList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const OcorrenciaItem = styled.li`
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Dashboard = () => {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOcorrencias = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/ocorrencias', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOcorrencias(response.data);
      } catch (err) {
        setError('Você não tem permissão para ver as ocorrências.');
      }
    };

    fetchOcorrencias();
  }, []);

  return (
    <DashboardWrapper>
      <h2>Dashboard de Ocorrências</h2>
      {error && <p>{error}</p>}
      <OcorrenciaList>
        {ocorrencias.map((ocorrencia) => (
          <OcorrenciaItem key={ocorrencia.id}>
            <p>{ocorrencia.descricao}</p>
          </OcorrenciaItem>
        ))}
      </OcorrenciaList>
    </DashboardWrapper>
  );
};

export default Dashboard;
