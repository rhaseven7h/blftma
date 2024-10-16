import { Account } from "@/types/accounts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export interface EditAccountModalProps {
  show: boolean;
  onClose: () => void;
  onEdit: (account: Account) => void;
  account?: Account;
}

const EditAccountModal = ({
  show,
  onClose,
  onEdit,
  account,
}: EditAccountModalProps) => {
  const schema = z.object({
    name: z.string().min(3).max(128).trim(),
  });
  type FormValues = z.infer<typeof schema>;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: account?.name || "AAA",
    },
  });
  console.log("account>", account?.name || "AAA");

  const onSubmit: SubmitHandler<FormValues> = ({ name }: FormValues) => {
    if (!account) {
      return;
    }
    onEdit({ ...account, name });
  };

  return (
    <Modal show={show} onClose={onClose} dismissible>
      <Modal.Header>Edit Account</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>O nome: {account?.name}</div>
          <pre>
            {errors
              ? errors.name
                ? errors.name.message
                : "NO NAME ERROR"
              : "NO ERRORS"}
          </pre>
          <Label
            htmlFor={"editName"}
            value={"Account Name"}
            {...(errors.name && { color: "failure" })}
          />
          <Controller
            name={"name"}
            control={control}
            render={({
              field: editField,
              fieldState: { error: editFieldError },
            }) => (
              <TextInput
                {...editField}
                id="editName"
                type="text"
                placeholder="Awesome company, Inc."
                minLength={3}
                maxLength={128}
                required
                {...(editFieldError && { color: "failure" })}
                helperText={
                  (editFieldError &&
                    "Name is required, and between 3 and 128 characters.") ||
                  "Enter the account's name."
                }
              />
            )}
          />
          {/* TODO: Implement form elements */}
          {(account && (
            <div className={"mt-4"}>
              <span>{account.id}</span>: <span>{account.name}</span>
            </div>
          )) || (
            <span className={"text-neutral-500 italic"}>
              No account provided
            </span>
          )}
        </form>
      </Modal.Body>
      <Modal.Footer className={"flex flex-row flex-nowrap justify-end"}>
        <Button
          type={"button"}
          color={"dark"}
          size={"xl"}
          onClick={onClose}
          className={"px-4"}
        >
          Cancel
        </Button>
        <Button
          type={"submit"}
          color={"success"}
          size={"xl"}
          className={"px-4"}
        >
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAccountModal;
