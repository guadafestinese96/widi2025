import './Footer.css'

export default function IconsFooterContainer({link, icon}){
    return(
        <li>
            <a href={link}>
                <span className="spanIcon">{icon}</span>
            </a>
        </li>
    )
}