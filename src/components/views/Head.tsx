import React from "react"
import './Head.css'
import {HomePage} from "../../pages/HomePage.tsx";
import {ROUTES} from "../../Routes.tsx";



// const Head = () => {
//   return (
//     <div>
//       <Navbar />
//     </div>
//   )
// }

const Head = () => {
  return (
    <div className={'header'}>
      <nav>
        <a href={ROUTES.HOME}>Главная</a>
      </nav>
    </div>
  )
}

export default Head