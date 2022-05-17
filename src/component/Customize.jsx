import React from "react";

function Customize({ img, activeBtn, data, setActiveBtn, setOptionBtn }) {
  return (
    <div className='customize'>
      <h3 className='customize--title'>Accessorize the alpaca's</h3>
      <div className='btns-main'>
        {Object.entries(data).map((key, index) => {
          if (key[0] === "nose") return;
          return (
            <button
              key={index}
              className={`btn ${activeBtn === key[0] && "active"}`}
              data-btn={key[0]}
              onClick={(e) => setActiveBtn(e.target.dataset.btn)}>
              {key[0]}
            </button>
          );
        })}
      </div>

      <div className='option'>
        <h3 className='customize--title'>style</h3>
        {img[activeBtn] && (
          <div className='btns-option'>
            {data[activeBtn].photos.map((e, i) => {
              if (activeBtn === 'backgrounds') {
                return (
                  <button
                    key={i}
                    data-option={`${e}`}
                    className={`btn background ${img[activeBtn] === e && "active"
                      }`}
                    style={{ backgroundColor: e, width: '40px', height: '40px', }}
                    onClick={(e) => setOptionBtn(e.target.dataset.option)}>
                  </button>
                );
              } else {
                return (
                  <button
                    key={i}
                    data-option={`${e}`}
                    className={`btn ${img[activeBtn].split("/")[4].split(".")[0] === e && "active"
                      }`}
                    onClick={(e) => setOptionBtn(e.target.dataset.option)}>
                    {e}
                  </button>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Customize;
