import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Dropzone from './Dropzone.jsx'

function App() {
    const [analysis, setAnalysis] = useState([]);
    const [isAnalysing, setIsAnalysing] = useState(false);
    const [count, setCount] = useState(0);

    const handleAnalysis = async (cvText) => {
        setAnalysis(true);

        console.log('cv sent for analysis:' , cvText.substring(0,100))
        //mock trial-out
        setTimeout(() => { setAnalysis([
            {title: 'AI Consultant', desc: 'helping companies align AI tools to their business workflows'},
            {title: 'Synthetic Data Manager', desc: 'Overseeing training data for new model datasets'}
        ])
        setIsAnalysing(false)}, 2000)
queueMicrotask()
    }

        return (
        <>
          <section id="center">
            <div className="hero">
              <img src={heroImg} className="base" width="170" height="179" alt="" />
              <img src={reactLogo} className="framework" alt="React logo" />
              <img src={viteLogo} className="vite" alt="Vite logo" />
            </div>
            <div>
              <h1>Find your Pivot</h1>
               <Dropzone/>
            </div>
            <button
              className="counter"
              onClick={() => setCount((count) => count + 1)}
            >
              Count is {count}
            </button>
          </section>

          <div className="ticks"></div>

          <div className="ticks"></div>
          <section id="spacer"></section>
        </>
      )
}

export default App
