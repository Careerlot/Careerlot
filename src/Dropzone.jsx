import pdfToText from 'react-pdftotext';

function Dropzone({ onParsedFile, previewUrl }) {
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
            .then(text => onParsedFile(text, file))
            .catch(err => console.error("Extraction failed", err));

    }

    return (
        <div className="dropzone-container">
            {!previewUrl && <input type="file" accept="application/pdf" onChange={handleFileChange} />}

            {previewUrl && (
                <div className="pdf-preview">
                    <h3>Document Preview:</h3>
                    <iframe
                        key={previewUrl}
                        src={previewUrl}
                        className="pdf-preview-embed"
                    />
                </div>
            )}
        </div>
    );
}

export default Dropzone;
