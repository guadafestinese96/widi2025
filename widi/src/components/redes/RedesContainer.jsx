import './RedesContainer.css'
import { NavLink } from 'react-router-dom'
import { Instagram, WhatsApp } from '@mui/icons-material'

export default function RedesContainer(){
    return(
        <div className="redesContainer">
        <NavLink to="https://www.instagram.com/widistoreok__" target="_blank">
          <div className="instagramContainer">
            <div className="instagram">
              <Instagram />
            </div>
            <p>@widistoreok__</p>
          </div>
        </NavLink>

        <NavLink>
          <div className="whatsappContainer">
            <div className="whatsapp">
              <WhatsApp />
            </div>
            <p>+549 1161950112</p>
          </div>
        </NavLink>
      </div>
    )
}