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
  const [optionItems, setOptionItems] = useState([]);
  const alpacaRef = useRef(null);

  useLayoutEffect(() => {
    for (let i in data) {
      if (i === "nose") {
        setImg((oldD) => ({ ...oldD, [i]: "/assets/alpaca/nose.png" }));
      } else {
        setImg((oldD) => ({
          ...oldD,
          [i]: `/assets/${data[i]["path"]}/${data[i]["photos"][0]}.png`,
        }));
      }
    }
  }, []);

  useEffect(() => {
    optionItems.forEach(() => {
      setImg((oldD) => ({
        ...oldD,
        [activeBtn]: `/assets/${data[activeBtn]["path"]}/${optionBtn || "default"
          }.png`,
      }));
    });
  }, [optionItems]);

  useEffect(() => {
    Object.entries(data).forEach((value) => {
      if (value[0] === activeBtn) {
        setOptionItems([...value[1].photos]);
      }
    });
  }, [optionBtn]);

  function randomAlpaca() {
    for (let d in data) {
      let photos = data[d].photos;
      let random = Math.floor(Math.random() * photos.length);

      if (d === "nose") continue;
      setImg((oldD) => ({
        ...oldD,
        [d]: `/assets/${data[d]["path"]}/${photos[random]}.png`,
      }));
    }
  }

  return (
    <main>
      <h1 className='main-title'>Alpaca Generator</h1>
      <section className='container' style={{ "--bgColor": "blue" }}>
        <div className='optionsForDown'>
          {img ? <Alpaca img={img} alpacaRef={alpacaRef} /> : <Loading />}
          <DownloadRandom randomAlpaca={randomAlpaca} />
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
