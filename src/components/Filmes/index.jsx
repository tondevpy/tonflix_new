import style from './index.module.css';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Filmes() {
  const [filmes, setFilme] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem('@tonFlix');
    setFilme(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFilme(index){
    const novaLista = [...filmes]
    novaLista.splice(index, 1)
    setFilme(novaLista)
    localStorage.setItem("@tonFlix", JSON.stringify(novaLista))
    toast.info("Filme excluido...");
  }
  return (
    <div className={style.container}>
      <ToastContainer />
      <div className={style.content}>
        <h1>Filmes Favoritos</h1>
        {filmes.map((filme, index)=> {
          return (
            <div className={style.card} key={index}>
          <div className={style.img}>
          <img
          src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
          alt="Foto Filme"
        />
          </div>
          <div className={style.nameFilme}>{filme.title}</div>
          <div className="acao">
            <button onClick={()=> excluirFilme(index)}>Excluir</button>
            
          </div>
        </div>
          )
        })}
      </div>
    </div>
  );
}

export default Filmes;
