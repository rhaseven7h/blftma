import DeleteAccountPopup from "@/components/accounts/delete.popup";
import EditAccountModal from "@/components/accounts/edit.modal";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import blftmaApi from "@/store/services/blftma";
import { Account } from "@/types/accounts";
import { toastGenericError, toastRTKQResponse } from "@/util/rtkq";
import { Button, Pagination, Table, theme } from "flowbite-react";
import { range } from "lodash";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import Select from "react-select";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

const AccountsList = () => {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(null, null, "components.accounts.list");
  const [page, setPage] = useState(1);
  const [editModalSettings, setEditModalSettings] = useState<{
    open: boolean;
    account?: Account;
  }>({ open: false, account: undefined });
  const [deletePopupSettings, setDeletePopupSettings] = useState<{
    open: boolean;
    account?: Account;
  }>({ open: false, account: undefined });

  const getAccountsResult = blftmaApi.useGetAccountsQuery({
    page: page,
    size: DEFAULT_PAGE_SIZE,
  });
  const [triggerDeleteAccount] = blftmaApi.useDeleteAccountMutation();
  const [triggerUpdateAccount] = blftmaApi.useUpdateAccountMutation();

  if (
    getAccountsResult.isLoading ||
    getAccountsResult.isUninitialized ||
    getAccountsResult.isFetching
  ) {
    return (
      <div className={"container mx-auto py-16 bold text-center font-bold"}>
        {t("loading")}
      </div>
    );
  }

  if (getAccountsResult.error) {
    return (
      <div>
        {t("accountsError")}: {getAccountsResult.error.toString()}
      </div>
    );
  }

  if (!getAccountsResult.data) {
    return <div>{t("noAccountsData")}</div>;
  }

  const totalAccounts = getAccountsResult.data.total;
  const totalPages = Math.ceil(totalAccounts / DEFAULT_PAGE_SIZE);
  const currentPage = getAccountsResult.data.page;

  const accountsTableTheme = {
    ...theme.table,
    root: {
      ...theme.table.root,
      wrapper: twMerge(
        theme.table.root.wrapper,
        "border border-neutral-300 rounded-lg pb-2",
      ),
    },
    head: {
      ...theme.table.head,
      base: twMerge(theme.table.head.base, "text-base"),
      cell: {
        ...theme.table.head.cell,
        base: twMerge(theme.table.head.cell.base, "bg-neutral-200"),
      },
    },
  };

  const onPageChangeHandler = (page: number) => {
    setPage(page);
  };

  const onEditAccountHandler = (account: Account) => () => {
    setEditModalSettings({
      open: true,
      account: account,
    });
  };

  const onDeleteAccountHandler = (account: Account) => () => {
    setDeletePopupSettings({
      open: true,
      account: account,
    });
  };

  const closeDeleteAccountModal = () => {
    setDeletePopupSettings({
      ...deletePopupSettings,
      open: false,
    });
  };

  const closeEditAccountModal = () => {
    setEditModalSettings({
      ...editModalSettings,
      open: false,
    });
  };

  const deleteAccount = async () => {
    if (!deletePopupSettings.account) {
      return;
    }
    try {
      await triggerDeleteAccount({ id: deletePopupSettings.account.id });
      closeDeleteAccountModal();
      toast(t("account_deleted_successfully"), { type: "success" });
    } catch (e) {
      toast(t("failed_to_delete_account") + ": ${(e as Error).message}.", {
        type: "error",
      });
    }
  };

  const editAccount = async ({ id, name }: Account) => {
    if (!editModalSettings.account) {
      return;
    }
    try {
      const result = await triggerUpdateAccount({ id, name });
      closeEditAccountModal();
      toastRTKQResponse(
        t("account_updated_successfully"),
        t("failed_to_update_account"),
        result.error,
      );
    } catch (e) {
      toastGenericError(t("failed_to_update_account"), e);
    }
  };

  return (
    <>
      <EditAccountModal
        show={editModalSettings.open}
        onClose={closeEditAccountModal}
        onEdit={editAccount}
        account={editModalSettings.account}
      />
      <DeleteAccountPopup
        show={deletePopupSettings.open}
        onClose={closeDeleteAccountModal}
        onDelete={deleteAccount}
        accountName={deletePopupSettings.account?.name ?? "Unknown"}
      />
      <h2 className={"text-lg font-bold pb-4"}>{t("accounts")}</h2>
      <Table striped hoverable theme={accountsTableTheme}>
        <Table.Head>
          <Table.HeadCell>{t("account_name")}</Table.HeadCell>
          <Table.HeadCell className={"text-right"}>
            {t("actions")}
          </Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {getAccountsResult.data.accounts.map((account) => (
            <Table.Row key={account.id}>
              <Table.Cell className={""}>{account.name}</Table.Cell>
              <Table.Cell
                className={"flex flex-row flex-nowrap gap-2 justify-end"}
              >
                <Button
                  color={"info"}
                  size={"xs"}
                  onClick={onEditAccountHandler(account)}
                >
                  <div
                    className={"flex flex-row flex-nowrap gap-1 items-center"}
                  >
                    <TbEdit />
                    <span>{t("edit")}</span>
                  </div>
                </Button>
                <Button
                  color={"failure"}
                  size={"xs"}
                  onClick={onDeleteAccountHandler(account)}
                >
                  <div
                    className={"flex flex-row flex-nowrap gap-1 items-center"}
                  >
                    <TbTrash />
                    <span>{t("delete")}</span>
                  </div>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className={"flex flex-col items-center justify-center"}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChangeHandler}
          showIcons
        />
        <div>
          {t("showing_accounts")}{" "}
          <span className={"font-bold"}>
            {(page - 1) * DEFAULT_PAGE_SIZE + 1}
          </span>{" "}
          {t("to")}{" "}
          <span className={"font-bold"}>{page * DEFAULT_PAGE_SIZE}</span>{" "}
          {t("out_of")} <span className={"font-bold"}>{totalAccounts}</span>{" "}
          {t("accountsLowercase")}{" "}
        </div>
        <div className={"flex flex-row flex-nowrap gap-2 items-center"}>
          <span>{t("in_page")}</span>
          <Select
            isSearchable={false}
            onChange={(selected) => {
              selected && setPage(selected.value as number);
            }}
            value={{ value: currentPage, label: currentPage }}
            options={range(totalPages).map((i) => ({
              value: i + 1,
              label: i + 1,
            }))}
          />
          <span>
            {t("out_of")} <span className={"font-bold"}>{totalPages}</span>{" "}
            {t("pages")}
          </span>
        </div>
      </div>
    </>
  );
};

export default AccountsList;
