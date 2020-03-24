import pastels from "@lib/pastels";

const Vouch = ({ width, index }) => {
  return (
    <div className="h-16">
      <style jsx>{`
        div {
          background: ${pastels[index]};
          width: ${width}%;
        }
      `}</style>
    </div>
  );
};

const VouchBar = ({ className, slices }) => {
  return (
    <div className={className}>
      <div className="h-16 bg-border-pure flex rounded overflow-hidden relative w-full select-none flex-row-reverse">
        {slices.length > 0 &&
          slices.map((slice, i) => <Vouch key={i} index={i} width={slice} />)}
      </div>
    </div>
  );
};

export default VouchBar;
