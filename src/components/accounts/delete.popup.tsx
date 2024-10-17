import { Button, Modal } from "flowbite-react";
import { useTranslation } from "next-i18next";
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
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(null, null, "components.accounts.delete.popup");
  return (
    <Modal show={show} onClose={onClose} dismissible popup>
      <Modal.Header />
      <Modal.Body className={"flex flex-col flex-nowrap items-center"}>
        <TbExclamationCircle className={"text-red-500 text-9xl"} />
        <p>{t("are_you_sure_you_want_to_delete_this_account")}:</p>
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
          <span>{t("cancel")}</span>
        </Button>
        <Button
          size={"xl"}
          className={"px-12"}
          color={"failure"}
          onClick={onDelete}
        >
          <span>{t("delete")}</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAccountPopup;
