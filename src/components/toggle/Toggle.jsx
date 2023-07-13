import React from "react";
import PropTypes from "prop-types";
import ToggleStyle from "./Toggle.module.scss";

const Toggle = ({
  id,
  name,
  checked,
  onChange,
  optionLabels,
  small,
  disabled
}) => {
  function handleKeyPress(e) {
    if (e.keyCode !== 32) return;

    e.preventDefault();
    onChange(!checked);
  }

  return (
    <div className={ToggleStyle["toggle-switch"] + (small ? " small-switch" : "")}>
      <input
        type="checkbox"
        name={name}
        className={ToggleStyle["toggle-switch-checkbox"]}
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      {id ? (
        <label
          className={ToggleStyle["toggle-switch-label"]}
          tabIndex={disabled ? -1 : 1}
          onKeyDown={(e) => handleKeyPress(e)}
          htmlFor={id}
        >
          <span
            className={
              disabled
                ? ToggleStyle["toggle-switch-inner toggle-switch-disabled"]
                : ToggleStyle["toggle-switch-inner"]
            }
            data-yes={optionLabels[0]}
            data-no={optionLabels[1]}
            tabIndex={-1}
          />
          <span
            className={
              disabled
                ? ToggleStyle["toggle-switch-switch toggle-switch-disabled"]
                : ToggleStyle["toggle-switch-switch"]
            }
            tabIndex={-1}
          />
        </label>
      ) : null}
    </div>
  );
};

// Set optionLabels for rendering.
Toggle.defaultProps = {
  optionLabels: ["Yes", "No"]
};

Toggle.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  optionLabels: PropTypes.array,
  small: PropTypes.bool,
  disabled: PropTypes.bool
};

export default Toggle;
