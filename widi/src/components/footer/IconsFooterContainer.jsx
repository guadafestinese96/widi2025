import { NavLink } from 'react-router-dom'
import './Footer.css'

export default function IconsFooterContainer({link, icon}){
    return(
        <li>
            <NavLink to={link}>
                <span className="spanIcon">{icon}</span>
            </NavLink>
        </li>
    )
}