import { render, screen } from '@testing-library/react';

const SomeComponent = () => <div><p>Some Component</p></div>;

describe('Some', () => {
  it('should work', () => {
    render(<SomeComponent/>);
    const theP = screen.getByText('Some Component');
    expect(theP).toBeInTheDocument();
  });
});
