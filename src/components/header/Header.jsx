import logo from '../../assets/logo.png'
import './header.css'

function Header() {
    return (
        <>
        <header>
            <div className='container-logo'>
                <img src={logo} alt="Logo de Sportsee"  />
            </div>

            <nav className='menu-header'>
                <div className="navText">Accueil</div>
                <div className="navText">Profil</div>
                <div className="navText">Réglage</div>
                <div className="navText">Communauté</div>
            </nav>

        </header>
        
        </>
    )
}

export default Header;
