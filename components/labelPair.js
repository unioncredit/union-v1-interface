import classNames from "classnames";
import PropTypes from "prop-types";
import Info from "svgs/Info";
import Tooltip from "@reach/tooltip";

/**
 * @name LabelPair
 * @description Used to present a piece of information with an accompanying label
 *
 * @param {String} className Any additional classes to spread into the wrapper
 * @param {String} label
 * @param {any} tooltip Renders a tooltip and an icon next to the label to indicate more information, accepts anything to be placed in the tooltip body
 * @param {String} value
 * @param {Boolean} large Changes the LabelPair to be stacked
 * @param {String} valueType A secondary piece of information to append to the value, either a currency type of unit of measurement
 * @param {Boolean} outline
 * @param {Boolean} responsive
 * @param {any} slot
 * @param {any} valueSlot
 */
const LabelPair = ({
  className = "",
  label,
  labelColor,
  tooltip,
  value,
  large = false,
  valueType,
  outline = false,
  responsive = false,
  slot,
  valueSlot,
}) => {
  const cachedLabelClassNames = classNames(
    labelColor,
    "leading-tight whitespace-no-wrap",
    {
      "text-lg mb-2": large,
      "flex justify-between items-center": slot,
      "mb-4 md:mb-0": responsive,
    }
  );

  const cachedValueClassNames = classNames(
    `leading-tight whitespace-no-wrap font-semibold font-sf`,
    outline ? "text-white-pure" : "text-black-pure",
    large ? "text-xl" : "text-lg",
    large ? "text-left" : "text-right",
    { "flex justify-between items-center": valueSlot }
  );

  const cachedClassNames = classNames(className, {
    "flex justify-between py-2": !large,
    "flex-col md:flex-row md:items-center": responsive,
    "items-center": !responsive,
  });

  return (
    <dl className={cachedClassNames}>
      <dt className={cachedLabelClassNames}>
        {tooltip ? (
          <Tooltip label={tooltip}>
            <div className="inline-flex items-center cursor-help">
              <div className="mr-2">{label}</div>
              <Info />
            </div>
          </Tooltip>
        ) : (
          label
        )}
        {slot}
      </dt>
      <dd className={cachedValueClassNames}>
        {valueType ? `${value} ${valueType}` : value}
        {valueSlot}
      </dd>
    </dl>
  );
};

LabelPair.propTypes = {
  /**
   * Any additional classes to spread into the wrapper
   */
  className: PropTypes.string,
  label: PropTypes.any.isRequired,
  /**
   * Renders a tooltip and an icon next to the label to indicate more information, accepts anything to be placed in the tooltip body
   */
  tooltip: PropTypes.any,
  value: PropTypes.any.isRequired,
  /**
   * Changes the LabelPair to be stacked
   */
  large: PropTypes.bool,
  /**
   * A secondary piece of information to append to the value, either a currency type of unit of measurement
   */
  valueType: PropTypes.oneOf(["DAI", "UNION"]),
  outline: PropTypes.bool,
  responsive: PropTypes.bool,
  slot: PropTypes.any,
  valueSlot: PropTypes.any,
};

export default LabelPair;
