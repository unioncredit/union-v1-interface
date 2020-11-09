import Tooltip from "@reach/tooltip";
import Button from "components/button";
import Input, { Textarea } from "components/input";
import Logo from "components/logo";
import Modal from "components/modal";
import Link from "next/link";
import Info from "svgs/Info";
import {
  useCreateProposalModalOpen,
  useCreateProposalModalToggle,
} from "./state";

const CreateProposalModal = () => {
  const open = useCreateProposalModalOpen();
  const toggle = useCreateProposalModalToggle();

  return (
    <Modal style="FULLSCREEN" isOpen={open} onDismiss={toggle}>
      <div className="border-b bg-white">
        <div className="w-full mx-auto px-4 max-w-screen-xl-gutter">
          <div className="flex items-center justify-between">
            <li className="py-4 lg:w-1/4 h-20 flex items-center justify-start">
              <Link href="/">
                <a>
                  <Logo />
                </a>
              </Link>
            </li>

            <button
              className="underline font-semibold focus:outline-none focus:shadow-outline rounded"
              onClick={toggle}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-12" />

      <div className="container">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="w-2/3 mb-12 md:mb-0">
            <h2>Add a title and description</h2>

            {/* Spacer */}
            <div className="h-6" />

            <Input
              id="title"
              label="Add a title"
              placeholder="Proposal title"
              autoFocus
            />

            {/* Spacer */}
            <div className="h-4" />

            <Textarea
              id="description"
              label="Description"
              placeholder="Write your description..."
              tip="You can use Markdown for formatting and adding images."
            />
          </div>
          <div className="w-1/3">
            <h2>Choose proposal type</h2>

            {/* Spacer */}
            <div className="h-6" />

            <div className="p-4 md:p-6 border rounded">
              <Tooltip label="Onchain Proposal">
                <div className="inline-flex items-center space-x-2">
                  <h3 className="text-lg font-semibold">Onchain Proposal</h3>
                  <Info />
                </div>
              </Tooltip>

              {/* Spacer */}
              <div className="h-2" />

              <p>2 choices:</p>

              {/* Spacer */}
              <div className="h-4" />

              <div className="h-14 rounded border flex bg-border-light">
                <div className="w-14 flex items-center justify-center text-center bg-success-light text-success-pure font-semibold">
                  1
                </div>
                <div className="flex items-center text-type-light px-5">
                  For
                </div>
              </div>

              {/* Spacer */}
              <div className="h-4" />

              <div className="h-14 rounded border flex bg-border-light">
                <div className="w-14 flex items-center justify-center text-center bg-against-light text-against-pure font-semibold">
                  2
                </div>
                <div className="flex items-center text-type-light px-5">
                  Against
                </div>
              </div>

              {/* Spacer */}
              <div className="h-8" />

              <Tooltip label="Proposal Actions">
                <div className="inline-flex items-center space-x-2">
                  <h3 className="text-lg font-semibold">Proposal Actions</h3>
                  <Info />
                </div>
              </Tooltip>

              {/* Spacer */}
              <div className="h-4" />

              <Button invert full>
                Add an action
              </Button>

              {/* Spacer */}
              <div className="h-8" />

              <div className="divider" />

              {/* Spacer */}
              <div className="h-8" />

              <Button full disabled>
                Publish proposal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateProposalModal;
