    import { useState } from 'react'
    import { useNavigate } from 'react-router-dom'
    import jobImg from './assets/promotion.png'
    import './App.css'
    import Dropzone from './Dropzone.jsx'
    import {GoogleGenAI} from "@google/genai"
    const genAI = new GoogleGenAI({apiKey : import.meta.env.VITE_GEMINI_KEY});
    function App() {
        const [rawText, setRawText] = useState('')
        const [analysis, setAnalysis] = useState(null);
        const [isAnalysing, setIsAnalysing] = useState(false);
        const navigate = useNavigate();
        const [previewUrl, setPreviewUrl] = useState('');
        const [error, setError] = useState(null);
        const startOver = () =>{
            if(previewUrl) URL.revokeObjectURL(previewUrl);
            setRawText('');
            setPreviewUrl('')
            setAnalysis(null);
            setIsAnalysing(false);
        }
        const handleAnalysis = async () => {
            setIsAnalysing(true);
            setError(null);
            try{
                const prompt = `
                Analyse this CV text and suggest realistic career pivots.
                Return the result ONLY as a JSON array of objects with "title" and "desc" keys.
                CV Text: ${rawText}
                `;

                const response = await genAI.models.generateContent({model : 'gemini-2.5-flash',
                                                                                            contents: [{ role: 'user',
                                                                                                         parts: [{ text: prompt }]
                                                                                            }]
                });
                const text = response.candidates[0]?.content?.parts[0]?.text || "";
                const cleanJson = text.replace(/```json|```/gi, "").trim();
                const parsedData = JSON.parse(cleanJson);
                setAnalysis(parsedData);
            } catch (error){
                if(error.message.includes("503") || error.status === 503){
                    setError("Servers are busy. Please wait a moment and try again.");
                } else{
                    setError("Something went wrong. Please try again later.");
                }
                console.log(error)
            } finally {
                setIsAnalysing(false);
            }
        }

        const handleFileProcessed = (text, file) =>{
            setRawText(text);
            const blob = new Blob([file], { type: "application/pdf" });
            const url= URL.createObjectURL(blob);
            setPreviewUrl(url);
        }

        function uploadCV(){
            if(!analysis && !isAnalysing){
                return (
                    <>
                        <p>Upload your CV PDF below</p>
                        <Dropzone onParsedFile={handleFileProcessed} previewUrl={previewUrl}/>
                    </>
                )
            }
        }
        function title(){
            if(!analysis && !isAnalysing){
                return (
                    <h1>Find Your Pivot</h1>
                )
            }
        }

        function jobFetch(){
            if( isAnalysing ){
                return (
                <>
                    <p className="loading-text">Fetching Jobs...</p>
                </>
                )
            }
            if (rawText && !analysis && !isAnalysing) {
                return (
                    <div>
                        <p> CV Parsed - {rawText.length} characters</p>
                        <div className="btn-container">
                            <button onClick={handleAnalysis} className="analyse-btn" disabled={isAnalysing}>
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
                                    <a href={`https://google.com/search?q=${encodeURIComponent(job.title + " career outlook 2030")}`}
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

        function showError() {
            if (error) {
                return (
                    <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
                        <p>{error}</p>
                    </div>
                )
            }
        }

        const OpenCredits = () =>{
            navigate('/credits');
        }

        return (
            <>
                <section id="center">
                    <div className="hero">
                        <img src={jobImg} className="base" width="170" height="179" alt="https://www.flaticon.com/free-icon/promotion_1589592?term=career+growth&page=1&position=3&origin=search&related_id=1589592" />
                    </div>
                    <div>
                    {title()}
                    {uploadCV()}
                    {jobFetch()}
                    {showError()}
                    {careerPivot()}
                    </div>
                </section>

                <section id="info">
                    <button className="reset-btn" onClick={OpenCredits} > Credits </button>
                </section>
            </>
          )
    }

    export default App
