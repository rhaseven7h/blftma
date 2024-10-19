import AccountsList from '@/components/accounts/list';
import { axiosInstance } from '@/store/services/axios-instance';
import StoreWrapper from '@/util/testing/store-wrapper';
import { render, waitFor } from '@testing-library/react';

const data = {
  'accounts': [
    {
      'id': 8,
      'name': 'Brekke LLC'
    },
    {
      'id': 5,
      'name': 'Donnelly - Kiehn'
    },
    {
      'id': 2,
      'name': 'Fay Inc'
    },
    {
      'id': 4,
      'name': 'Friesen, Kohler and Homenick'
    },
    {
      'id': 6,
      'name': 'Lemke Group'
    }
  ],
  'total': 12,
  'page': 1,
  'size': 5
};

describe('AccountsList', () => {
  it('should render correctly', async () => {
    const requestMock = jest.fn().mockReturnValue({ data });
    jest.spyOn(axiosInstance, 'request').mockImplementation(requestMock);
    const { container, getByTestId } = render(
      <StoreWrapper>
        <AccountsList/>
      </StoreWrapper>
    );
    await waitFor(() => {
      expect(getByTestId('accounts-list-table')).toBeInTheDocument();
      expect(requestMock).toHaveBeenCalledTimes(1);
    });
    expect(container).toMatchSnapshot();
  });
});
