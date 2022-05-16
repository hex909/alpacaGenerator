import domtoimage from "dom-to-image";
import { saveAs } from 'file-saver'
import { FaRandom } from 'react-icons/fa'
import { HiOutlineDocumentDownload } from 'react-icons/hi'

function DownloadRandom({ randomAlpaca }) {
    return (
        <section className="download-random">
            <button className="btn-random" onClick={randomAlpaca} ><FaRandom className="btn-icon" /> Random</button>
            <button className="btn-download" onClick={() => {
                domtoimage.toBlob(alpacaRef.current, { width: alpacaRef.current.offsetWidth })
                    .then(function (blob) {
                        saveAs(blob, 'alpaca.png');
                    });
            }}> <HiOutlineDocumentDownload className="btn-icon" /> Download</button>
        </section>
    )
}

export default DownloadRandom