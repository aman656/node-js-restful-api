import { Link } from "react-router-dom";
import './MainNavigation.css'

const MainNavigation = ()=>{
    return (
        <header className="header">
            <Link to="/">
            <div className="logo">VERIFY</div>
            </Link>
            <nav >
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                </ul>
            </nav>
        </header>
    )

}
export default MainNavigation