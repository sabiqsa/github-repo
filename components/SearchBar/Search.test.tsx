import { fireEvent, render } from '@testing-library/react';
import SearchBar from './SearchBar';

const props = {
  data: undefined,
  onChange: jest.fn(),
  onClick: undefined,
  onActiveChange: undefined,
  repoData: undefined,
};

describe('User can see Search bar at top Screen', () => {
  test('user can type search', () => {
    const utils = render(<SearchBar {...props} />);
    const input = utils.getByLabelText('search-id');

    fireEvent.change(input, { target: { value: 'naruto' } });
    expect(props.onChange).toHaveBeenCalled();
  });
});
