import blftmaApi from "@/store/services/blftma";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Button, Label, TextInput } from "flowbite-react";
import { useTranslation } from "next-i18next";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const AccountCreate = () => {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(null, null, "components.accounts.create");
  const [createAccount] = blftmaApi.useCreateAccountMutation();
  const schema = z.object({
    name: z.string().min(3).max(128).trim(),
  });
  type FormValues = z.infer<typeof schema>;
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: t("defaultName"),
    },
  });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const result = await createAccount(data);
      if (result.error) {
        const fbqError = result.error as FetchBaseQueryError;
        switch (fbqError.status) {
          case "FETCH_ERROR":
          case "PARSING_ERROR":
          case "TIMEOUT_ERROR":
            const errorMsgKnown =
              t("failedToCreateAccount") +
              " " +
              `${fbqError.status}: ${fbqError.error}.`;
            toast(errorMsgKnown, { type: "error" });
            break;
          case "CUSTOM_ERROR":
            const errorMsgUnknown =
              t("failedToCreateAccountCustomError") + fbqError.error + ".";
            toast(errorMsgUnknown, { type: "error" });
            break;
          default:
            const errorMsgDefault =
              t("failedToCreateAccountStatus") +
              " " +
              `${fbqError.status}: ${JSON.stringify(fbqError.data)}.`;
            toast(errorMsgDefault, { type: "error" });
        }
      } else {
        toast(t("accountCreatedSuccessfully"), { type: "success" });
        setValue("name", "");
      }
    } catch (error) {
      toast(
        t("failedToCreateAccountNoPeriod") + `: ${(error as Error).message}.`,
        {
          type: "error",
        },
      );
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className={"text-lg font-bold pb-4"}>{t("newAccount")}</h2>
      <div className="mb-2 block">
        <Label
          htmlFor="name"
          value={t("accountName")}
          {...(errors.name && { color: "failure" })}
        />
      </div>
      <Controller
        name={"name"}
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            id="name"
            type="text"
            placeholder={t("companyNamePlaceholder")}
            minLength={3}
            maxLength={128}
            required
            {...(errors.name && { color: "failure" })}
            helperText={
              (errors.name && t("nameRequired")) || t("enterAccountName")
            }
          />
        )}
      />
      <Button type="submit">{t("submit")}</Button>
    </form>
  );
};

export default AccountCreate;
