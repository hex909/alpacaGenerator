import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from 'file-saver'
import { FaRandom } from 'react-icons/fa'
import { HiOutlineDocumentDownload } from 'react-icons/hi'

import nose from '/assets/alpaca/nose.png';

import "./App.css";
import data from "./imgData";

function App() {
  const [img, setImg] = useState(false);
  const [activeBtn, setActiveBtn] = useState('hair')
  const [optionBtn, setOptionBtn] = useState('default')
  const [optionItems, setOptionItems] = useState([])
  const alpacaRef = useRef(null)

  useLayoutEffect(() => {

    for (let i in data) {
      if (i === 'nose') {
        setImg((oldD) => ({ ...oldD, [i]: '/assets/alpaca/nose.png' }));
      } else {
        setImg((oldD) => ({ ...oldD, [i]: `/assets/${data[i]['path']}/${data[i]['photos'][0]}.png` }));
      }
    }
  }, []);

  useEffect(() => {
    optionItems.forEach(() => {
      setImg((oldD) => ({ ...oldD, [activeBtn]: `/assets/${data[activeBtn]['path']}/${optionBtn || 'default'}.png` }));
    })
  }, [optionItems])

  useEffect(() => {
    Object.entries(data).forEach((value) => {
      if (value[0] === activeBtn) {
        setOptionItems([...value[1].photos])
      }
    })
  }, [optionBtn])


  function randomAlpaca() {
    for (let d in data) {
      let photos = data[d].photos
      let random = Math.floor(Math.random() * photos.length)

      if (d === 'nose') continue
      setImg((oldD) => ({ ...oldD, [d]: `/assets/${data[d]['path']}/${photos[random]}.png` }));

    }
  }

  return (
    <main>
      <h1 className="main-title">Alpaca Generator</h1>
      <section className='container' style={{ '--bgColor': 'blue' }}>
        <div className="optionsForDown">

          {img ?
            <div
              className='alpaca'
              ref={alpacaRef}
              style={{ backgroundImage: `url(${img.backgrounds})` }}>
              <img className='ears' src={img.ears} alt='ear' />
              <img className='neck' src={img.neck} alt='neck' />
              <img className='nose' src={nose} alt='nose' />
              <img className='mouth' src={img.mouth} alt='mouth' />
              <img className='leg' src={img.leg} alt='leg' />
              <img className='eyes' src={img.eyes} alt='eyes' />
              <img className='hair' src={img.hair} alt='hair' />
              <img className='accessories' src={img.accessories} alt='accessories' />
            </div> :
            <div className="err--alpaca">
            </div>

          }

          <section className="download-random">
            <button className="btn-random" onClick={randomAlpaca} ><FaRandom className="btn-icon" /> Random</button>
            <button className="btn-download" onClick={() => {
              domtoimage.toBlob(alpacaRef.current, { width: alpacaRef.current.offsetWidth })
                .then(function (blob) {
                  saveAs(blob, 'alpaca.png');
                });
            }}> <HiOutlineDocumentDownload className="btn-icon" /> Download</button>
          </section>

        </div>

        <div className='customize'>
          <h3 className="customize--title">Accessorize the alpaca's</h3>
          <div className='btns-main'>
            {Object.entries(data).map((key, index) => {
              if (key[0] === 'nose') return
              return <button key={index} className={`btn ${activeBtn === key[0] && 'active'}`} data-btn={key[0]} onClick={(e) => setActiveBtn(e.target.dataset.btn)}>{key[0]}</button>
            })}
          </div>
          <div className="option">
            <h3 className="customize--title">style</h3>
            {img[activeBtn] && <div className="btns-option">
              {data[activeBtn].photos.map((e, i) => {
                return <button key={i} data-option={`${e}`} className={`btn ${img[activeBtn].split('/')[4].split('.')[0] === e && 'active'}`} onClick={(e) => setOptionBtn(e.target.dataset.option)} >{e}</button>
              })}
            </div>}
          </div>
        </div>

      </section>

    </main >
  );
}

export default App;
