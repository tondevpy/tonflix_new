import style from './index.module.css';
import { useEffect, useState } from 'react';
import api from '../../services/Api';
import Estrela from '../../assets/star.png';
import Votos from '../../assets/analysis.png';

import { Link } from 'react-router-dom';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [totalPage, setotalPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get('movie/now_playing', {
        params: {
          api_key: '49f77d92e98ae46cc56542a903ab68ad',
          language: 'pt-BR',
          page: page,
        },
      });
      setotalPage(response.data.total_pages)
      setFilmes(response.data.results.slice(0, 20));
      setLoading(false)
    }
    loadFilmes();
  }, [page]);

  if(loading) {
    return (
      <div className={style.loading}>
        <h2>Carregando lista de filmes...</h2>
      </div>
    )
  }

  function nextPage() {
    if (page < totalPage) {
      setPage(page + 1);
      setLoading(true); // Defina loading como true para exibir a mensagem de carregamento novamente
    }
    
  }
  function backPage() {
    if (page > 1) { // Alterado para garantir que a página não caia abaixo de 1
      setPage(page - 1);
      setLoading(true); // Defina loading como true para exibir a mensagem de carregamento novamente
    }
  }
  


  return (
    <div className={style.content}>
      <div className={style.pages}>
        <span><button onClick={backPage}>Voltar</button>Pagina: {page}<button onClick={nextPage}>Próxima</button></span>
      </div>
      <div className={style.filmes}>
      <div className={style.filmes_}>
        {filmes.map((filme, index) => (
          <div className={style.container} key={index}>
            <div className={style.filme}>
              <div className={style.img}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                  alt="Foto Filme"
                />
              </div>
              
              <div className={style.stars}>
                <img src={Estrela} alt="" title="Pontuação" />
                <span>{filme.vote_average}</span>
                <img src={Votos} alt="" title="Votos" />
                <span>{filme.vote_count}</span>
              </div>
              <Link to={`/pageFilme/${filme.id}`}><div className={style.acessar}>Acessar</div></Link>
              
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Home;
