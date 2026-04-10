import { useNavigate } from 'react-router-dom';

function Credits() {
    const navigate = useNavigate();

    return (
        <section id="credits-page">
            <h1>Credits</h1>
            <ul>
            <a href="https://www.flaticon.com/free-icons/career" title="career icons">Career icons created by Freepik - Flaticon</a> <br/>
            Powered by Google Gemini AI <br/>
            Built with React + Vite <br />
            Hosted on Vercel and Azure <br />
            OpenRouter API
            </ul>
            <button onClick={() => navigate('/')} className="reset-btn">
                ← Back to App
            </button>
        </section>
    );
}

export default Credits;
