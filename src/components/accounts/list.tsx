import DeleteAccountPopup from '@/components/accounts/delete.popup';
import EditAccountModal from '@/components/accounts/edit.modal';
import { ErrorMessage } from '@/components/common/error-message';
import { Loading } from '@/components/common/loading';
import { NoData } from '@/components/common/no-data';
import { DEFAULT_PAGE_SIZE } from '@/constants/common';
import blftmaApi from '@/store/services/blftma';
import { Account, Accounts } from '@/types/accounts';
import { getErrorMessage } from '@/util/api';
import { toastGenericError, toastRTKQResponse } from '@/util/rtkq';
import { Button, Pagination, Table } from 'flowbite-react';
import { range } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { TbEdit, TbTrash } from 'react-icons/tb';
import Select from 'react-select';
import { toast } from 'react-toastify';

const AccountsList = () => {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(null, null, 'components.accounts.list');
  const [page, setPage] = useState(1);
  const [editModalSettings, setEditModalSettings] = useState<{
    open: boolean;
    account?: Account;
  }>({ open: false, account: undefined });
  const [deletePopupSettings, setDeletePopupSettings] = useState<{
    open: boolean;
    account?: Account;
  }>({ open: false, account: undefined });

  const getAccountsResult = blftmaApi.useGetAccountsQuery();
  const [triggerDeleteAccount] = blftmaApi.useDeleteAccountMutation();
  const [triggerUpdateAccount] = blftmaApi.useUpdateAccountMutation();

  if (getAccountsResult.isLoading || getAccountsResult.isUninitialized || getAccountsResult.isFetching) {
    return <Loading />;
  }

  if (getAccountsResult.error) {
    return <ErrorMessage error={getAccountsResult.error} />;
  }

  if (!getAccountsResult.data) {
    return <NoData />;
  }

  const onEditAccountHandler = (account: Account) => () => {
    setEditModalSettings({
      open: true,
      account: account
    });
  };

  const onDeleteAccountHandler = (account: Account) => () => {
    setDeletePopupSettings({
      open: true,
      account: account
    });
  };

  const closeDeleteAccountModal = () => {
    setDeletePopupSettings({
      ...deletePopupSettings,
      open: false
    });
  };

  const closeEditAccountModal = () => {
    setEditModalSettings({
      ...editModalSettings,
      open: false
    });
  };

  const deleteAccount = async () => {
    if (!deletePopupSettings.account) {
      return;
    }
    try {
      await triggerDeleteAccount({ id: deletePopupSettings.account.id });
      closeDeleteAccountModal();
      toast(t('account_deleted_successfully'), { type: 'success' });
    } catch (error) {
      const message = getErrorMessage(error);
      toast(t('failed_to_delete_account') + `: ${message}.`, { type: 'error' });
    }
  };

  const editAccount = async ({ id, name }: Account) => {
    if (!editModalSettings.account) {
      return;
    }
    try {
      const result = await triggerUpdateAccount({ id, name });
      closeEditAccountModal();
      toastRTKQResponse(t('account_updated_successfully'), t('failed_to_update_account'), result.error);
    } catch (e) {
      toastGenericError(t('failed_to_update_account'), e);
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
        accountName={deletePopupSettings.account?.name ?? 'Unknown'}
      />
      <h2 className={'text-lg font-bold pb-4'}>{t('accounts')}</h2>
      <Table
        striped
        hoverable
        data-testid={'accounts-list-table'}>
        <Table.Head>
          <Table.HeadCell>{t('account_name')}</Table.HeadCell>
          <Table.HeadCell className={'text-right'}>{t('actions')}</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {([] as Accounts).map((account) => (
            <Table.Row key={account.id}>
              <Table.Cell className={''}>{account.name}</Table.Cell>
              <Table.Cell className={'flex flex-row flex-nowrap gap-2 justify-end'}>
                <Button
                  color={'info'}
                  size={'xs'}
                  onClick={onEditAccountHandler(account)}>
                  <div className={'flex flex-row flex-nowrap gap-1 items-center'}>
                    <TbEdit />
                    <span>{t('edit')}</span>
                  </div>
                </Button>
                <Button
                  color={'failure'}
                  size={'xs'}
                  onClick={onDeleteAccountHandler(account)}>
                  <div className={'flex flex-row flex-nowrap gap-1 items-center'}>
                    <TbTrash />
                    <span>{t('delete')}</span>
                  </div>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className={'flex flex-col items-center justify-center'}>
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
          showIcons
        />
        <div>
          {t('showing_accounts')} <span className={'font-bold'}>{(page - 1) * DEFAULT_PAGE_SIZE + 1}</span> {t('to')}{' '}
          <span className={'font-bold'}>{page * DEFAULT_PAGE_SIZE}</span> {t('out_of')}{' '}
          <span className={'font-bold'}>{1}</span> {t('accountsLowercase')}{' '}
        </div>
        <div className={'flex flex-row flex-nowrap gap-2 items-center'}>
          <span>{t('in_page')}</span>
          <Select
            isSearchable={false}
            onChange={(selected) => selected && setPage(selected.value as number)}
            value={{ value: 1, label: 1 }}
            options={range(1).map((i) => ({
              value: i + 1,
              label: i + 1
            }))}
          />
          <span>
            {t('out_of')} <span className={'font-bold'}>{1}</span> {t('pages')}
          </span>
        </div>
      </div>
    </>
  );
};

export default AccountsList;
