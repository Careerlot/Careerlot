import pdfToText from 'react-pdftotext';

function Dropzone({ onParsedFile }) {
    const runExtraction = typeof pdfToText === 'function'
        ? pdfToText
        : (pdfToText.default || Object.values(pdfToText).find(v => typeof v === 'function'));

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file || !runExtraction) {
            console.error("Extraction function not found or file missing.");
            return;
        }

        // Use the resolved function
        runExtraction(file)
            .then(text => onParsedFile(text))
            .catch(err => console.error("Extraction failed", err));

        // Fixed: .size is a property, not a function
        console.log('file size (bytes):', file.size);
        console.log('file metadata:', file);
    }

    return (
        <div className="dropzone-container">
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
        </div>
    );
}

export default Dropzone;
