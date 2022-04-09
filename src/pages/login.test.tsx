import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Login from './login';
import { UserDispatchContext } from '../context/user-context';

const server = setupServer(
  rest.post('http://test.lan/api/login', (req, res, ctx) => {
    // @ts-ignore
    if (req.body?.username === 'test' && req.body?.password === 'test') {
      return res(ctx.json({ token: 'token-token' }));
    }
    return res(ctx.status(401));
  }),
);

describe('Login', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should allow user to login into Anna', async () => {
    const user = userEvent.setup();
    const spy = jest.fn();

    render(
      <UserDispatchContext.Provider value={spy}>
        <Login />
      </UserDispatchContext.Provider>,
    );

    await user.type(
      screen.getByRole('textbox', { name: 'Url' }),
      'http://test.lan',
    );
    await user.type(screen.getByRole('textbox', { name: 'Username' }), 'test');
    await user.type(screen.getByLabelText('Password'), 'wrong');
    await user.click(screen.getByText('Save'));

    expect(await screen.findByRole('status')).toBeVisible();

    await user.clear(screen.getByLabelText('Password'));
    await user.type(screen.getByLabelText('Password'), 'test');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith({
        token: 'token-token',
        username: 'test',
      });
    });
  });
});
