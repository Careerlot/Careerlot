import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Dropzone from './Dropzone.jsx'

function App() {
    const [rawText, setRawText] = useState('')
    const [analysis, setAnalysis] = useState(null);
    const [isAnalysing, setIsAnalysing] = useState(false);

    const startOver = () =>{
        setRawText('');
        setAnalysis(null);
        setIsAnalysing(false);
    }
    const handleAnalysis = async () => {
        setIsAnalysing(true);

        //mock trial-out
        setTimeout(() => { setAnalysis([
            {title: 'AI Consultant', desc: 'helping companies align AI tools to their business workflows'},
            {title: 'Synthetic Data Manager', desc: 'Overseeing training data for new model datasets'}
        ])
        setIsAnalysing(false)}, 2000)
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
                {!rawText && (
                    <>
                        <p>Upload your CV PDF below</p>
                        <Dropzone onParsedFile={(text) => setRawText(text)} />
                    </>
                )}
                {rawText && !analysis && !isAnalysing && (
                    <div>
                        <p> CV Parsed - {rawText.length} characters</p>
                        <div className="btn-container">
                            <button onClick={handleAnalysis} className="analyse-btn">
                                Generate Pivot
                            </button>
                            <button className="reset-btn" onClick={startOver}>
                                Clear File
                            </button>
                        </div>
                    </div>
                )}
                {isAnalysing && (<p className="loading-text">Fetching Results...</p>)}

                {analysis && (
                    <div className="results-container">
                        <div className="results-grid">
                            {analysis.map((job, i) => (
                                <div key={i} className="card">
                                    <h3>{job.title}</h3>
                                    <p>{job.desc}</p>
                                    <a href={`https://google.com/{encodeURIComponent(job.title + "career outlook 2030")}`}
                                       target="_blank"
                                        rel="noopener noreferrer">
                                        Research Role →
                                    </a>
                                </div>
                            ))}
                        </div>
                        <button className="reset-btn" onClick={startOver}>
                            Clear File
                        </button>
                    </div>
              )}
            </div>
          </section>

          <section id="spacer"></section>
        </>
      )
}

export default App
