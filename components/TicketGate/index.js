import useGoldenTicket from "hooks/useGoldenTicket";
import Button from "components/button";

const TicketGate = ({ children }) => {
  const hasGoldenTicket = useGoldenTicket();

  if (hasGoldenTicket) return children;

  return (
    <div className="bg-white border max-w-md mx-auto rounded p-4 sm:p-6 md:p-8 text-center">
      <div className="flex justify-center">
        <img src="/images/logged-out.svg" alt="" />
      </div>

      <h1 className="mb-4 mt-6">No Golden Ticket?</h1>
      <p className="text-lg leading-6 text-grey-pure mb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt vero
        amet natus consectetur.
      </p>

      <Button full href="https://opensea.io">
        Learn how to win one
      </Button>
    </div>
  );
};

export default TicketGate;
