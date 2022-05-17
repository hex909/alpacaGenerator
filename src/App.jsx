import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import "./App.css";
import data from "./imgData";

// Component
import Alpaca from "./component/Alpaca";
import Loading from "./component/Loading";
import Customize from "./component/Customize";
import DownloadRandom from "./component/DownloadRandom";

function App() {
  const [img, setImg] = useState({});
  const [activeBtn, setActiveBtn] = useState("hair");
  const [optionBtn, setOptionBtn] = useState("default");
  const alpacaRef = useRef(null);

  useLayoutEffect(() => {
    for (let i in data) {
      if (i === "nose") {
        setImg((oldD) => ({ ...oldD, [i]: "/assets/alpaca/nose.png" }));
      } else if (i === 'backgrounds') {
        setImg((oldD) => ({
          ...oldD,
          [i]: `${data[i]['photos'][0]}`,
        }));
      } else {
        setImg((oldD) => ({
          ...oldD,
          [i]: `/assets/${data[i]["path"]}/${data[i]["photos"][0]}.png`,
        }));
      }
    }
  }, []);

  useEffect(() => {

    if (activeBtn === 'backgrounds') {
      let colorIndex = data[activeBtn]['photos'].indexOf(optionBtn)
      setImg((oldD) => ({
        ...oldD,
        [activeBtn]: `${data[activeBtn]['photos'][colorIndex]}`,
      }));
    } else {


      setImg((oldD) => ({
        ...oldD,
        [activeBtn]: `/assets/${data[activeBtn]["path"]}/${optionBtn || "default"
          }.png`,
      }));
    }

  }, [optionBtn]);

  function randomAlpaca() {
    for (let d in data) {
      let photos = data[d].photos;
      let random = Math.floor(Math.random() * photos.length);

      if (d === "nose") continue;

      else if (d === 'backgrounds') {
        setImg((oldD) => ({
          ...oldD,
          [d]: `${data[d]["photos"][random]}`,
        }));
      }
      else {

        setImg((oldD) => ({
          ...oldD,
          [d]: `/assets/${data[d]["path"]}/${photos[random]}.png`,
        }));
      }
    }
  }

  return (
    <main>
      <h1 className='main-title'>Alpaca Generator</h1>
      <section className='container' style={{ "--bgColor": img.backgrounds }}>
        <div className='optionsForDown'>
          {img ? <Alpaca img={img} alpacaRef={alpacaRef} /> : <Loading />}
          <DownloadRandom randomAlpaca={randomAlpaca} alpacaRef={alpacaRef} />
        </div>

        <Customize
          img={img}
          activeBtn={activeBtn}
          data={data}
          setActiveBtn={setActiveBtn}
          setOptionBtn={setOptionBtn}
        />
      </section>
    </main>
  );
}

export default App;
