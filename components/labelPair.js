import Tooltip from "@reach/tooltip";
import classNames from "classnames";
import PropTypes from "prop-types";
import Info from "svgs/Info";

/**
 * @name LabelPair
 * @description Used to present a piece of information with an accompanying label
 *
 * @param {Object} props
 * @param {String} props.className Any additional classes to spread into the wrapper
 * @param {String} props.label
 * @param {String} props.labelColor
 * @param {Boolean} props.large Changes the LabelPair to be stacked
 * @param {Boolean} props.outline
 * @param {Boolean} props.responsive
 * @param {Node} props.slot
 * @param {Node} props.tooltip Renders a tooltip and an icon next to the label to indicate more information, accepts anything to be placed in the tooltip body
 * @param {any} props.value
 * @param {Node} props.valueSlot
 * @param {("DAI"|"UNION")} props.valueType A secondary piece of information to append to the value, either a currency type of unit of measurement
 */
const LabelPair = ({
  className = "",
  label,
  labelColor,
  large = false,
  outline = false,
  responsive = false,
  slot,
  tooltip,
  value,
  valueSlot,
  valueType,
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
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelColor: PropTypes.string,
  large: PropTypes.bool,
  outline: PropTypes.bool,
  responsive: PropTypes.bool,
  slot: PropTypes.node,
  tooltip: PropTypes.node,
  value: PropTypes.any,
  valueSlot: PropTypes.node,
  valueType: PropTypes.oneOf(["DAI", "UNION"]),
};

export default LabelPair;
