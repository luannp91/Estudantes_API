import React, { useState, useEffect } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import logoCadastro from './assets/cadastro.png';

function App() {

  const baseUrl = "https://localhost:44354/api/Estudante";

  const [data, setData] = useState([]);

  const [modalIncluir, setModalIncluir] = useState(false);

  const [modalEditar, setModalEditar] = useState(false);

  const [estudanteSelecionado, setEstudanteSelecionado] = useState({
    id: '',
    nome: '',
    email: '',
    idade: ''
  })

  const selecionarEstudante = (estudante, opcao) => {
    setEstudanteSelecionado(estudante);
    (opcao === 'Editar') && abrirFecharModalEditar()
  }

  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  }

  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setEstudanteSelecionado({
      ...estudanteSelecionado, [name]: value
    });
    console.log(estudanteSelecionado);
  }

  const pedidoGet = async () => {
    await axios.get(baseUrl).then(response => {
      setData(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  const pedidoPost = async () => {
    delete estudanteSelecionado.id;
    estudanteSelecionado.idade = parseInt(estudanteSelecionado.idade);
    await axios.post(baseUrl, estudanteSelecionado).then(response => {
      setData(data.concat(response.data));
      abrirFecharModalIncluir();
    }).catch(error => {
      console.log(error);
    })
  }

  const pedidoPut = async () => {
    estudanteSelecionado.idade = parseInt(estudanteSelecionado.idade);
    await axios.put(baseUrl + " / " + estudanteSelecionado.id, estudanteSelecionado).then(response => {
      var resposta = response.data;
      var dadosAuxiliar = data;
      dadosAuxiliar.map(estudante => {
        if (estudante.id === estudanteSelecionado.id) {
          estudante.nome = resposta.nome;
          estudante.email = resposta.email;
          estudante.idade = resposta.idade;
        }
      });
      abrirFecharModalEditar();
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    pedidoGet();
  })

  return (
    <div className="aluno-container">
      <br />
      <h3>Cadastro de Estudantes</h3>
      <header>
        <img src={logoCadastro} alt='Cadastro' />
        <button className="btn btn-sucess" onClick={() => abrirFecharModalIncluir()}>Incluir Novo Estudante</button>
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
                <button className="btn btn-primary" onClick={() => selecionarEstudante(estudante, 'Editar')}>Editar</button> {" "}
                <button className="btn btn-danger" onClick={() => selecionarEstudante(estudante, 'Excluir')}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modalIncluir}>
        <ModalHeader>
          Incluir Estudantes
        </ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Nome: </label>
            <br />
            <input type="text" className="form-control" name='nome' onChange={handleChange} />
            <br />
            <label>Email: </label>
            <br />
            <input type="text" className="form-control" name='email' onChange={handleChange} />
            <br />
            <label>Idade: </label>
            <br />
            <input type="text" className="form-control" name='idade' onChange={handleChange} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => pedidoPost()} >Incluir</button> {" "}
          <button className='btn btn-danger' onClick={() => abrirFecharModalIncluir()} >Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar} >
        <ModalHeader>Editar Estudante</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>ID: </label>
            <br />
            <input type='text' className='form-control' readOnly value={estudanteSelecionado && estudanteSelecionado.id} />
            <br />
            <label>Nome: </label>
            <br />
            <input type='text' className='form-control' name='nome' onChange={handleChange} value={estudanteSelecionado && estudanteSelecionado.nome} />
            <br />
            <label>Email: </label>
            <br />
            <input type='text' className='form-control' name='email' onChange={handleChange} value={estudanteSelecionado && estudanteSelecionado.email} />
            <br />
            <label>Idade: </label>
            <br />
            <input type='text' className='form-control' name='idade' onChange={handleChange} value={estudanteSelecionado && estudanteSelecionado.idade} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => pedidoPut()} >Editar</button> {" "}
          <button className='btn btn-danger' onClick={() => abrirFecharModalEditar()} >Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
