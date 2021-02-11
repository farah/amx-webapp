import React from "react";
import Types from "prop-types";
import { Link, useLocation } from "react-router-dom";

function clamp(from, to, value) {
  return Math.max(Math.min(to, value), from);
}

/* eslint-disable react/no-array-index-key */
const Stepper = ({ steps, pathname }) => {
  const location = useLocation();
  if (steps.length === 0) {
    return null;
  }
  let url = location.pathname;
  url = url.substr(0, url.lastIndexOf("/"));
  let activeStep = steps.findIndex(step => step.path.find(s => s === pathname));
  if (url === "/transfer/pay") {
    activeStep = 4;
  }
  const length = steps.filter(step => step.visible).length;
  const activeStepIndex = clamp(0, length - 1, activeStep);
  const stepPercentage = 1 / (length - 1);
  const percentageCompleted = activeStepIndex / (length - 1);
  const filledWidth = Math.max(percentageCompleted - stepPercentage, 0);
  const endingWidth = Math.min(activeStepIndex, 1) * stepPercentage;


  return (
    <div className="tw-stepper">
      <div className="progress">
        <div className="progress-bar-filler" style={{ width: `${filledWidth * 100}%` }} />
        <div className="progress-bar-ending" style={{ width: `${endingWidth * 100}%` }} />
      </div>
      <ul className="tw-stepper-steps p-t-1 m-b-0">
        {steps
          .filter(step => step.visible)
          .map((step, index) => {
            return (

              <Link

                key={index}
                to={steps[index].path[0]}
              >
                <li
                  key={index}
                  style={{ left: `${index * stepPercentage * 100}%`, cursor: "not-allowed" }}
                  className={`
                hidden-xs
                tw-stepper__step
                ${index === activeStepIndex ? "tw-stepper__step--active" : ""}
                ${activeStepIndex > index && !step.disabled ? "tw-stepper__step--clickable" : ""}
              `}
                >
                  <button className={`${`btn-unstyled tw-stepper__step-label ${activeStepIndex === index || activeStepIndex > index && !step.disabled ? '' : 'disabled-link'}`}`} disabled={step.disabled}>
                    <small>{step.label}</small>
                  </button>
                </li>
              </Link>
    
            );
          })}
      </ul>
    </div>
  );
};
/* eslint-enable react/no-array-index-key */

Stepper.propTypes = {
  steps: Types.arrayOf(
    Types.shape({
      label: Types.string.isRequired,
      onClick: Types.func,
      hoverLabel: Types.node
    })
  ).isRequired,
  pathname: Types.string
};

export default Stepper;
