import pdfToText from 'react-pdftotext'

function Dropzone({ onContentExtracted }) {
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return;

        pdfToText(file)
            .then(text => onContentExtracted(text))
            .catch(err => console.error("Extraction failed", err))
    }

    return (
        <div className="dropzone-container">
            <p>Upload your CV PDF below</p>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
        </div>
    )
}
export default Dropzone
