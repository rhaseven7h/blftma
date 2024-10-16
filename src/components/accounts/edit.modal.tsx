import { Account } from "@/types/accounts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: account?.name || "",
    },
  });

  useEffect(() => {
    reset({ name: account?.name || "" });
  }, [account, reset]);

  const onSubmit: SubmitHandler<FormValues> = ({ name }: FormValues) => {
    if (!account) {
      return;
    }
    if (name === account.name) {
      toast("No changes detected", { type: "info" });
      onClose();
    } else onEdit({ ...account, name });
  };

  return (
    <Modal show={show} onClose={onClose} dismissible>
      <Modal.Header>Edit Account</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={"flex flex-col gap-4"}>
            {!account && (
              <span className={"text-neutral-500 italic"}>
                No account provided
              </span>
            )}
            {account && (
              <>
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
              </>
            )}
          </div>
          <div
            className={
              "flex flex-row flex-nowrap justify-end gap-4 pt-4 border-t mt-8"
            }
          >
            <Button
              type={"button"}
              color={"gray"}
              size={"xl"}
              onClick={onClose}
              className={"px-4"}
            >
              Cancel
            </Button>
            <Button
              type={"submit"}
              color={"info"}
              size={"xl"}
              className={"px-4"}
            >
              Save changes
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditAccountModal;
