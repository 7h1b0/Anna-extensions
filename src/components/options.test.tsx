import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // fix TS issues

import Options from './options';

describe('Options', () => {
  it('should allow user to set host and token', async () => {
    const set = jest.fn();
    const get = jest
      .fn()
      .mockResolvedValue({ host: 'localhost', token: 'test' });

    global.browser = {
      storage: {
        // @ts-expect-error local is missing some functions
        local: {
          set,
          get,
        },
      },
    };

    render(<Options />);
    await waitFor(() => {
      expect(screen.getByDisplayValue('test')).toBeVisible();
      expect(screen.getByDisplayValue('localhost')).toBeVisible();
    });

    fireEvent.input(screen.getByLabelText('token'), {
      target: { value: 'jest' },
    });

    fireEvent.click(screen.getByText('Save'));
    expect(set).toHaveBeenCalledWith({
      token: 'jest',
      host: 'localhost',
    });
  });
});
