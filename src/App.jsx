import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Dropzone from './Dropzone.jsx'
import {GoogleGenAI} from "@google/genai"
const genAI = new GoogleGenAI({apiKey : import.meta.env.VITE_GEMINI_KEY});
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

        try{
            const prompt = `
            Analyze this CV text and suggest 2 realistic career pivots.
            Return the result ONLY as a JSON array of objects with "title" and "desc" keys.
            CV Text: ${rawText}
            `;

            const response = await genAI.models.generateContent({model : 'gemini-2.5-flash',
                                                                                        contents: [{ role: 'user',
                                                                                                     parts: [{ text: prompt }]
                                                                                        }]
            });
            const text = response.candidates[0].content.parts[0].text;
            console.log('Response text:', text);
            const cleanJson = text.replace(/```json|```/gi, "").trim();
            const parsedData = JSON.parse(cleanJson);
            setAnalysis(parsedData);
        } catch (error){
            console.log(error)
        } finally {
            setIsAnalysing(false);
        }
    }

    function title(){
        if(!rawText){
            return (
                <>
                    <h1>Find your Pivot</h1>
                    <p>Upload your CV PDF below</p>
                    <Dropzone onParsedFile={(text) => setRawText(text)} />
                </>
            )
        }
    }

    function uploadedCV(){
        if( isAnalysing ){
            return (
                <p className="loading-text">Fetching Results...</p>
            )
        }
        if (rawText && !analysis && !isAnalysing) {
            return (
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
                )
        }
    }

    function careerPivot(){
        if(analysis){
            return (
                <div className="results-container">
                    <div className="results-grid">
                        {analysis.map((job, i) => (
                            <div key={i} className="card">
                                <h3>{job.title}</h3>
                                <p>{job.desc}</p>
                                <a href={`https://google.com{encodeURIComponent(job.title + "career outlook 2030")}`}
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
            )
        }
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
                {title()}
                {uploadedCV()}
                {careerPivot()}
            </div>
          </section>
        </>
      )
}

export default App
