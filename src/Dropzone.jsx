import pdfToText from 'react-pdftotext';

function Dropzone({ onParsedFile }) {
    const runParse = typeof pdfToText === 'function'
        ? pdfToText
        : (pdfToText.default || Object.values(pdfToText).find(v => typeof v === 'function'));

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file || !runParse) {
            console.error("Extraction function not found or file missing.");
            return;
        }

        runParse(file)
            .then(text => onParsedFile(text))
            .catch(err => console.error("Extraction failed", err));

    }

    return (
        <div className="dropzone-container">
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
        </div>
    );
}

export default Dropzone;
