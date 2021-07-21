const StatsGrid = ({ children }) => {
  return (
    <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      {children}
    </ul>
  );
};

export default StatsGrid;
