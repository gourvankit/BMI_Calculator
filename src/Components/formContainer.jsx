import React, { useState } from "react";
import styles from "./form.module.css";
import { useForm } from "react-hook-form";
const FormContainer = ({ onBMICalculate, onButtonClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [unit, setUnit] = useState("cm");
  const [option, setOption] = useState("Adult");
  const [buttonPressed, setButtonPressed] = useState(false);
  const unitChangeHandler = (e) => {
    setUnit(e.target.value);
  };
  const optionSelector = (e) => {
    setOption(e.target.value);
  };
  const submitHandler = async (e) => {
    // e.preventDefault();
    // console.log(e.cmHeight);
    setButtonPressed(true);
    const weight = e.weightInput;
    const height = unit === "cm" ? e.cmHeight : calculateCmHeight(e);

    try {
      const response = await fetch(
        "/api/calculate?weight=" + weight + "&height=" + height
      );
      const data = await response.json();
      onBMICalculate(data);
      onButtonClick();
    } catch (error) {
      console.error("Error calculating BMI:", error);
    }
  };
  const validateAge = (value) => {
    if (option === "Child") {
      const age = parseInt(value);
      return age >= 5 && age <= 19;
    } else {
      const age = parseInt(value);
      return age >= 20;
    }
  };

  const validateHeight = (value) => {
    return !isNaN(value) && value > 0;
  };

  const validateWeight = (value) => {
    return !isNaN(value) && value > 0;
  };

  const calculateCmHeight = (formData) => {
    const ft = parseFloat(e.get("ftHeight"));
    const inches = parseFloat(e.get("inchHeight"));
    const totalInches = ft * 12 + inches;
    return totalInches * 2.54; // Convert inches to centimeters
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className={styles.formTop}>
        <div className={styles.selectOption}>
          <p>Select</p>
          <select
            {...register("ageSelector")}
            name="ageSelector"
            defaultValue="Adult"
            onChange={optionSelector}
          >
            <option value="Adult">Adult(Age 20+)</option>
            <option value="Child">Child(Age 5-19)</option>
          </select>
        </div>
        {option === "Child" && (
          <div className={styles.errorAgeSelector}>
            <div className={styles.ageSelector}>
              <div className={styles.years}>
                <input
                  {...register("years", {
                    required: true,
                    validate: validateAge,
                  })}
                  type="number"
                  placeholder="Years"
                  name="years"
                />
              </div>
              <div className={styles.months}>
                <input
                  {...register("months", { required: true })}
                  type="number"
                  placeholder="months"
                  name="months"
                />
              </div>
            </div>
            {errors.years && (
              <span>
                <sup>*</sup>This field is required and should be between 5 and
                19
              </span>
            )}
          </div>
        )}
        <div className={styles.selectHeight}>
          <p>Height</p>
          <div className={styles.heightOptions}>
            <label>
              <input
                type="radio"
                name="unit"
                id="u1"
                value="cm"
                defaultChecked
                onChange={unitChangeHandler}
              />
              Centimeters
            </label>
            <label>
              <input
                type="radio"
                name="unit"
                id="u2"
                value="ft"
                onChange={unitChangeHandler}
              />
              Feets and inches
            </label>
          </div>
        </div>
        {unit === "cm" ? (
          <div className={styles.errorCmHeight}>
            <div className={styles.cmHeight}>
              <input
                {...register("cmHeight", {
                  required: true,
                  validate: validateHeight,
                })}
                type="number"
                placeholder="cm"
                name="cmHeight"
              />
            </div>
            {errors.cmHeight && (
              <span>
                <sup>*</sup> This field is required and should be valid
              </span>
            )}
          </div>
        ) : (
          <div className={styles.errorHeight}>
            <div className={styles.ftHeight}>
              <div className="ft">
                <input
                  {...register("ftHeight", {
                    required: true,
                    validate: validateHeight,
                  })}
                  type="number"
                  placeholder="ft"
                  name="ftHeight"
                />
              </div>
              <div className="inches">
                <input
                  {...register("inchHeight")}
                  type="number"
                  placeholder="inches"
                  name="inchHeight"
                />
              </div>
            </div>
            {errors.ftHeight && (
              <span className={styles.errorHeightSpan}>
                <sup>*</sup>This field is required and should be valid
              </span>
            )}
          </div>
        )}
        <div className={styles.selectWeight}>
          <p>Weight</p>
          <div className={styles.weightOptions}>
            <label>
              <input
                type="radio"
                name="weightUnit"
                id="kg"
                value="kg"
                defaultChecked
              />
              Kilograms
            </label>
            <label>
              <input
                type="radio"
                name="weightUnit"
                id="pounds"
                value="pounds"
              />
              Pounds
            </label>
          </div>
        </div>
        <div className={styles.errorWeight}>
          <div className={styles.weightInput}>
            <input
              {...register("weightInput", {
                required: true,
                validate: validateWeight,
              })}
              type="number"
              name="weightInput"
            />
          </div>
          {errors.weightInput && (
            <span>
              <sup>*</sup>This field is required and should be valid
            </span>
          )}
        </div>
        <div className={styles.selectWeight}>
          <p>Gender</p>
          <div className={styles.weightOptions}>
            <label>
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                defaultChecked
              />
              Male
            </label>
            <label>
              <input type="radio" name="gender" id="female" value="female" />
              Female
            </label>
          </div>
        </div>
        <button className={styles.calculate}>
          {buttonPressed ? "Recalculate" : "Calculate"}
        </button>
      </div>
    </form>
  );
};

export default FormContainer;
