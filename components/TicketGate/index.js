import useGoldenTicket from "hooks/useGoldenTicket";
import Button from "components/button";

const TicketGate = ({ children }) => {
  const hasGoldenTicket = useGoldenTicket();

  if (hasGoldenTicket) return children;

  return (
    <div className="bg-white border max-w-md mx-auto rounded p-4 sm:p-6 md:p-8 text-center">
      <div className="flex justify-center">
        <span
          aria-label="Golden Ticket"
          className="text-10xl leading-none -my-6"
          role="image"
        >
          🎟
        </span>
      </div>

      <h1 className="mb-4 mt-6">No Golden Ticket?</h1>
      <p className="text-lg leading-6 text-grey-pure mb-8">
        Right now you'll need a limited edition crypto-collectible to be able to
        access Union during the alpha program.
      </p>

      <Button full href="/waitlist">
        Buy some chocolate
      </Button>
    </div>
  );
};

export default TicketGate;
