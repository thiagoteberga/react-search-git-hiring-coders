//import logo from './logo.svg';
import React, {useState} from 'react';
import axios from 'axios';
import * as S from './styled';
import { useHistory } from 'react-router-dom';

function App(props) { //<> são fragments - TAGS VAZIAS
  const history = useHistory();
  const [usuario, setUsuario] = useState('');
  const [erro, setErro] = useState(false);
  //useState é um Array com 2 posições [usuario, setUsuario] - (1) Valor do Estado / (2) Funcao para Setar o Valor
 
  function handlePesquisa() {
    axios.get(`https://api.github.com/users/${usuario}/repos`)
    .then(response => {
      const repositories = response.data;
      const repositoriesName = [];
      repositories.map((repositoty) => {
        repositoriesName.push(repositoty.name);
      });
      localStorage.setItem('repositoriesName',JSON.stringify(repositoriesName));
      setErro(false);
      history.push('/repositories')
      //console.log(repositoriesName);
      //console.log(JSON.stringify(repositoriesName));
      //console.log(JSON.stringify(repositories));
  })
  .catch(err => {
    setErro(true);
  });
  }

  return (
    <S.HomeContainer>
      <S.Content>
        <S.Input className="usuario" placeholder="Usuário" value={usuario} onChange={e => setUsuario(e.target.value)} />
        <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button>
      </S.Content>

      {erro ? <S.ErrorMsg>Usuário não encontrado no GitHub!</S.ErrorMsg> : ''}
      
    </S.HomeContainer>
  );
}

export default App;
