import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import Foot from "./components/views/Foot"
import NavBar from "./components/views/NavBar.tsx";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}> {/* 3. Оборачиваем всё в Provider */}
        <NavBar />
        <App />
        <Foot />
      </Provider>
    </StrictMode>,
)


// import './index.css'
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { Provider } from 'react-redux' // 1. Импортируем Provider
// import App from './App.tsx'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import Foot from "./components/views/Foot"
// import NavBar from "./components/views/NavBar.tsx"
// import { store } from './store' // 2. Импортируем хранилище

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then(registration => {
//         console.log('SW registered:', registration);
//       })
//       .catch(error => {
//         console.log('SW registration failed:', error);
//       });
//   });
// }

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <Provider store={store}> {/* 3. Оборачиваем всё в Provider */}
//       <NavBar />
//       <App />
//       <Foot />
//     </Provider>
//   </StrictMode>,
// )


