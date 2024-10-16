import { Button, Modal } from "flowbite-react";
import { TbExclamationCircle } from "react-icons/tb";

export interface DeleteAccountPopupProps {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
  accountName: string;
}

const DeleteAccountPopup = ({
  show,
  onClose,
  onDelete,
  accountName,
}: DeleteAccountPopupProps) => {
  return (
    <Modal show={show} onClose={onClose} dismissible popup>
      <Modal.Header />
      <Modal.Body className={"flex flex-col flex-nowrap items-center"}>
        <TbExclamationCircle className={"text-red-500 text-9xl"} />
        <p>Are you sure you want to delete this account:</p>
        <p className={"mt-8 mb-4 font-bold text-2xl text-wrap"}>
          {accountName}
        </p>
      </Modal.Body>
      <Modal.Footer
        className={"flex flex-row flex-nowrap justify-center gap-2"}
      >
        <Button
          size={"xl"}
          className={"px-12"}
          color={"gray"}
          onClick={onClose}
        >
          <span>Cancel</span>
        </Button>
        <Button
          size={"xl"}
          className={"px-12"}
          color={"failure"}
          onClick={onDelete}
        >
          <span>Delete</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAccountPopup;
