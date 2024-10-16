import DeleteAccountPopup from "@/components/accounts/delete.modal";
import EditAccountModal from "@/components/accounts/edit.modal";
import blftmaApi from "@/store/services/blftma";
import { Account } from "@/types/accounts";
import { toastGenericError, toastRTKQResponse } from "@/util/rtkq";
import { Button, Pagination, Table, theme } from "flowbite-react";
import { range } from "lodash";
import { useState } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import Select from "react-select";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

const PAGE_SIZE = 3;

const AccountsList = () => {
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
    size: PAGE_SIZE,
  });
  const [triggerDeleteAccount] = blftmaApi.useDeleteAccountMutation();
  const [triggerUpdateAccount] = blftmaApi.useUpdateAccountMutation();

  if (
    getAccountsResult.isLoading ||
    getAccountsResult.isUninitialized ||
    getAccountsResult.isFetching
  ) {
    return (
      <div className={"container mx-auto py-16 bold text-center uppercase"}>
        Loading...
      </div>
    );
  }

  if (getAccountsResult.error) {
    return <div>Accounts Error: {getAccountsResult.error.toString()}</div>;
  }

  if (!getAccountsResult.data) {
    return <div>No Accounts data</div>;
  }

  const totalAccounts = getAccountsResult.data.total;
  const totalPages = Math.ceil(totalAccounts / PAGE_SIZE);
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
      toast("Account deleted successfully.", { type: "success" });
    } catch (e) {
      toast(`Failed to delete account: ${(e as Error).message}.`, {
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
        "Account updated successfully.",
        "Failed to update account.",
        result.error,
      );
    } catch (e) {
      toastGenericError("Failed to update account", e);
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
      <h2 className={"text-lg font-bold pb-4"}>Accounts</h2>
      <Table striped hoverable theme={accountsTableTheme}>
        <Table.Head>
          <Table.HeadCell>Account Name</Table.HeadCell>
          <Table.HeadCell className={"text-right"}>Actions</Table.HeadCell>
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
                    <span>Edit</span>
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
                    <span>Delete</span>
                  </div>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className={"flex flex-col items-center justify-center"}>
        <div>
          Showing accounts{" "}
          <span className={"font-bold"}>{(page - 1) * PAGE_SIZE + 1}</span> to{" "}
          <span className={"font-bold"}>{page * PAGE_SIZE}</span> out of{" "}
          <span className={"font-bold"}>{totalAccounts}</span> accounts{" "}
        </div>
        <div className={"flex flex-row flex-nowrap gap-2 items-center"}>
          <span>in page</span>
          <Select
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
            of out of <span className={"font-bold"}>{totalPages}</span> pages
          </span>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChangeHandler}
          showIcons
        />
      </div>
    </>
  );
};

export default AccountsList;
