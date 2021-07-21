import pastels from "lib/pastels";
import Tooltip from "@reach/tooltip";
import Address from "components/Address";

const Vouch = ({ width, address, index }) => {
  return (
    <Tooltip
      label={<Address address={address} />}
      style={{ maxWidth: 320, paddingRight: "calc(2rem - 1px)" }}
    >
      <div className="h-16 hover:opacity-75 duration-150 transition-opacity">
        <style jsx>{`
          div {
            background: ${pastels[index]};
            width: ${width}%;
          }
        `}</style>
      </div>
    </Tooltip>
  );
};

const VouchBar = ({ className, data }) => {
  return (
    <div className={className}>
      <div className="h-16 bg-border-light flex rounded overflow-hidden relative w-full select-none flex-row-reverse">
        {data.length > 0 &&
          data.map((vouch, i) => (
            <Vouch
              key={i}
              index={i}
              width={vouch.width}
              address={vouch.address}
            />
          ))}
      </div>
    </div>
  );
};

export default VouchBar;
