import React, { useState, useEffect } from "react";
import "./../styles/RangeSlider.css"; // Assuming CSS is stored in a separate file

function RangeSlider({minValue, setMinValue, maxValue, setMaxValue, valueGap}) {
  useEffect(() => {
    const minValueCurrant = parseInt(minValue);
    const maxValueCurrant = parseInt(maxValue);

    if (maxValueCurrant - minValueCurrant < valueGap) {
        setMaxValue(minValueCurrant + valueGap);
    }
}, [minValue, maxValue, valueGap]);

  const handleMinInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= maxValue - valueGap) {
      setMinValue(value);
    }
  };

  const handleMaxInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value <= 10000 && value >= minValue + valueGap) {
      setMaxValue(value);
    }
  };

  const handleRangeChange = (e) => {
    const value = parseInt(e.target.value);
    if (e.target.className.includes("range-min") && value <= maxValue - valueGap) {
      setMinValue(value);
    } else if (e.target.className.includes("range-max") && value >= minValue + valueGap) {
      setMaxValue(value);
    }
  };

  return (
    <div className="wrapper">
      <div className="slider">
        <div
          className="progress"
          style={{
            left: `${(minValue / 10000) * 100}%`,
            right: `${100 - (maxValue / 10000) * 100}%`,
          }}
        ></div>
      </div>
      <div className="range-input">
        <input
          type="range"
          className="range-min"
          min="0"
          max="10000"
          value={minValue}
          step="100"
          onChange={handleRangeChange}
        />
        <input
          type="range"
          className="range-max"
          min="0"
          max="10000"
          value={maxValue}
          step="100"
          onChange={handleRangeChange}
        />
      </div>

      <div className="value-input">
        <div className="field">
          <input
            type="number"
            className="input-min"
            value={minValue}
            onChange={handleMinInputChange}
          />
        </div>
        <div className="separator">-</div>
        <div className="field">
          <input
            type="number"
            className="input-max"
            value={maxValue}
            onChange={handleMaxInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export {RangeSlider};
