import DefaultLayout from '@/layouts/default';
import StoreWrapper from '@/util/testing/store-wrapper';
import { render } from '@testing-library/react';

describe('DefaultLayout', () => {
  it('should render', () => {
    const { getByText, container } = render(
      <StoreWrapper>
        <DefaultLayout>
          <p>Page Content</p>
        </DefaultLayout>
      </StoreWrapper>
    );
    const linksParagraph = getByText('Page Content');
    expect(container).toMatchSnapshot();
    expect(linksParagraph).toBeInTheDocument();
  });
});
