const StatsCard = ({ label, value, sideLabel }) => {
  return (
    <li className="border rounded p-4 sm:p-6">
      {label && <p className="crop-snug leading-snug mb-4">{label}</p>}
      <div className="flex items-center justify-between">
        {value && (
          <p className="text-xl font-semibold crop-snug leading-snug">
            {value}
          </p>
        )}
        {sideLabel && <p className="text-sm leading-none">{sideLabel}</p>}
      </div>
    </li>
  );
};

export default StatsCard;
