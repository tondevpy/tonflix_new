import { Link } from 'react-router-dom';
import style from './index.module.css'
function NotFoundPage() {
  return (
    <div className={style.container_not_found}>
      <p>Error 404</p>
      <Link to="/">Voltar a pagina principal</Link>
    </div>
  );
}

export default NotFoundPage;
