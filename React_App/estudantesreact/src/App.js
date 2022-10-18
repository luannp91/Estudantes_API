import React, { useState, useEffect } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import logoCadastro from './assets/cadastro.png';

function App() {

  const baseUrl = "https://localhost:44354/api/Estudante";

  const [data, setData] = useState([]);

  const pedidoGet = async () => {
    await axios.get(baseUrl).then(response => {
      setData(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    pedidoGet();
  })

  return (
    <div className="App">
      <br>
        <h3>Cadastro de Estudantes</h3>
      </br>
      <header>
        <img src={logoCadastro} alt='Cadastro' />
        <button className="btn btn-sucess">Incluir Novo Estudante</button>
      </header>
      <Table className="table table-bordered" >
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(estudante => (
            <tr key={estudante.id}>
              <td>{estudante.id}</td>
              <td>{estudante.nome}</td>
              <td>{estudante.email}</td>
              <td>{estudante.idade}</td>
              <td>
                <button className="btn btn-primary">Editar</button> {" "}
                <button className="btn btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
