import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../services/Api';
import style from './index.module.css';
import Estrela from '../../assets/star.png';
import Votos from '../../assets/analysis.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PageFilme() {
  const { id } = useParams();
  const [naoEncontrado, setNaoEncontrado] = useState(false);
  const [filme, setFilme] = useState({});

  useEffect(() => {
    async function loadFilme() {
      await Api.get(`/movie/${id}`, {
        params: {
          api_key: '49f77d92e98ae46cc56542a903ab68ad',
          language: 'pt-BR',
        },
      })
        .then((response) => {
          setFilme(response.data);
          setNaoEncontrado(true);
        })
        .catch(() => {
          console.log('Filme não encontrado');
        });
    }
    loadFilme();

    return () => {
      console.log('Componente desmontado');
    };
  }, []);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@tonFlix");

    let filmesSalvos = JSON.parse(minhaLista) || []

    const hasFilme = filmesSalvos.some( (filmesSalvo)=> filmesSalvo.id === filme.id)

    if (hasFilme) {
      toast.warning("Esse filme já esta na sua lista...");
      return;
    }
    filmesSalvos.push(filme)
    localStorage.setItem('@tonFlix', JSON.stringify(filmesSalvos))
    toast.success("Filme salvo com sucesso...");
  }

  console.log(naoEncontrado);
  return (
    <div className={style.filme}>
      <ToastContainer/>
      <div className={style.filmeContent}>
        <img
          src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
          alt="Foto Filme"
        />
        <h1>{filme.title}</h1>
        <p>{filme.overview}</p>

        <div className={style.stars}>
          <img src={Estrela} alt="" title="Pontuação" />
          <span>{filme.vote_average}</span>
          <img src={Votos} alt="" title="Votos" />
          <span>{filme.vote_count}</span>
        </div>
        <div className={style.trailer}>
          <a
            href={`https://www.youtube.com/results?search_query=trailer+${filme.title}`}
            target="_blank"
          >
            Trailer
          </a>
        </div>
        <div className={style.favorito} onClick={salvarFilme}>
          Adicionar aos favoritos
        </div>
      </div>
    </div>
  );
}

export default PageFilme;
