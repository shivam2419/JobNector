import React from 'react'
import { Link } from 'react-router-dom'
import "../style/Footer.css"
import Logo from "../assets/JobNector.png"
export const Footer = () => {
  return (
    <footer className='home-footer'>
        <div className="footer-first">
            <span>
                <img src={Logo} alt="" />
                <h1>JobNector</h1>
            </span>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae a necessitatibus dolorem nulla? Ea accusamus alias aut tenetur, quaerat magni!
            </p>
            <span>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
            </span>
        </div>
        <div className="footer-second">
            <h2>Company</h2>
            <p><Link>About</Link></p>
            <p><Link>FAQ</Link></p>
            <p><Link>Careers</Link></p>
            <p><Link>Media Kit</Link></p>
        </div>
        <div className="footer-third">
            <h2>Industries</h2>
            <p><Link>Organisation</Link></p>
            <p><Link>Newsletter</Link></p>
            <p><Link>Impression</Link></p>
            <p><Link>Expansion</Link></p>
        </div>
        <div className="footer-fourth">
            <h3>Contact</h3>
            <i>+91-9953218840</i>
            <br />
            <i>csdslt2309@gltibm.ac.in</i>
            <br />
            <i>414-A, New Complex hub, Ostresian-24, Banglore, Karnatka</i>
        </div>
    </footer>
  )
}
