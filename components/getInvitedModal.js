import {
  useGetInvitedModalOpen,
  useGetInvitedModalToggle,
} from "@contexts/Vouch";
import Modal from "./modal";

const GetInvitedModal = () => {
  const open = useGetInvitedModalOpen();
  const toggle = useGetInvitedModalToggle();

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, laudantium
      facilis nisi ab reiciendis impedit adipisci explicabo distinctio, nam est
      autem magni perferendis atque consectetur? Vitae, hic fugit. Qui, cumque.
    </Modal>
  );
};

export default GetInvitedModal;
