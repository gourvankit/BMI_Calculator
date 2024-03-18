"use client";
import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import FormContainer from "../Components/formContainer";
import { SyncLoader } from "react-spinners";
const Page = () => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [healthStatus, setHealthStatus] = useState("");
  const [loading, setLoading] = useState("false");
  const [suggestedWeightRange, setSuggestedWeightRange] = useState("");
  const [bmi, setBMI] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  // const bmi = useSelector((state) => state.bmiReducer.value.bmi);
  // const isClicked = useSelector((state) => state.bmiReducer.value.isClicked);
  const handleBMICalculation = (calculatedBMI) => {
    const bmiUpdated = Math.round(calculatedBMI * 10) / 10;
    setBMI(bmiUpdated);
  };
  const handleClick = () => {
    setIsClicked(true);
  };
  useEffect(() => {
    if (isClicked) {
      setLoading(true);
      setTimeout(() => {
        movePoint(bmi);
        updateHealthStatus(bmi);
        setLoading(false);
      }, 2000);
    }
  }, [bmi, isClicked]);

  const movePoint = (bmi) => {
    if (!isNaN(bmi) && bmi >= 0 && bmi <= 100) {
      if (bmi < 18.5) {
        setSliderPosition(bmi % 25);
      } else if (bmi < 24.9 && bmi > 18.5) {
        setSliderPosition(34 + (bmi - 18.5));
      } else if (bmi > 24.9 && bmi < 29) {
        setSliderPosition(65 + (bmi - 25));
      } else {
        setSliderPosition(85 + ((bmi - 25) % 25));
      }
    } else {
      alert("Please enter valid values between 0 and 100.");
    }
  };
  const updateHealthStatus = (bmi) => {
    if (bmi <= 18.5) {
      setHealthStatus("Underweight");
      setSuggestedWeightRange("40 & 51");
    } else if (bmi <= 24.9) {
      setHealthStatus("Healthy");
      setSuggestedWeightRange("51 & 68");
    } else if (bmi >= 25 && bmi <= 29.9) {
      setHealthStatus("Overweight");
      setSuggestedWeightRange("68 & 80");
    } else {
      setHealthStatus("Obese");
      setSuggestedWeightRange("80 & 100");
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.pageContainer}>
          <div className={styles.form}>
            <FormContainer
              onBMICalculate={handleBMICalculation}
              onButtonClick={handleClick}
            />
          </div>
          <div
            className={`${styles.result} ${!isClicked ? styles.result2 : " "}`}
          >
            {!isClicked ? (
              <p className={styles.introPara}>
                Use this calculator to check your body mass index (BMI), which
                can be a helpful tool in determining your weight category. Or,
                use it to calculate your child’s BMI.
              </p>
            ) : (
              <>
                {loading && (
                  <SyncLoader
                    color="#657e79"
                    size={30}
                    className={styles.loader}
                  />
                )}
                {!loading && (
                  <>
                    <p className={styles.bmiLine}>
                      Your Body Mass Index (BMI) is{" "}
                      <span className={styles.bmiNumber}>{bmi}</span>
                    </p>
                    <hr className={styles.horizontalLine} />
                    <p className={styles.concludeLine}>
                      According to your height, your weight is in the <br />
                      <span className={styles.concludeWord}>
                        {healthStatus}
                      </span>{" "}
                      category
                    </p>
                    <div className={styles.dialogImage}>
                      <div className={styles.oneComp}>
                        <div className={styles.section1}></div>
                        <p>UnderWeight</p>
                      </div>
                      <div className={styles.oneComp}>
                        <div className={styles.section2}></div>
                        <p>Healthy</p>
                      </div>
                      <div className={styles.oneComp}>
                        <div className={styles.section3}></div>
                        <p>Overweight</p>
                      </div>
                      <div className={styles.oneComp}>
                        <div className={styles.section4}></div>
                        <p>Obese</p>
                      </div>

                      <div
                        className={styles.pointer}
                        id="point"
                        style={{ left: `${sliderPosition}%` }}
                      ></div>
                    </div>
                    <hr className={styles.horizontalLine} />
                    <p className={styles.concludeLine2}>
                      For your height, a healthy weight would be between <br />{" "}
                      <span className={styles.concludeWord2}>
                        {suggestedWeightRange}
                      </span>{" "}
                      kilograms
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
