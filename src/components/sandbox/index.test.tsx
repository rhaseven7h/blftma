import Sandbox from '@/components/sandbox/index';
import StoreWrapper from '@/util/testing/store-wrapper';
import { render, screen, waitFor } from '@testing-library/react';

describe('Sandbox', () => {
  it('should render', async () => {
    render(
      <StoreWrapper>
        <Sandbox />
      </StoreWrapper>
    );
    await waitFor(() => {
      expect(screen.getByTestId('status')).not.toHaveTextContent('pending');
    });
  });
});
