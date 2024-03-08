import style from './index.module.css'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <div className={style.header}>
      <div className={style.logo}>
        <Link to='/'>Ton Flix</Link>
      </div>
      <div className={style.btn}>
        <Link to='/filmes'>Filmes</Link>
      </div>
    </div>
  )
}

export default Header