import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';

import Login from './login';
import { UserDispatchContext } from '../context/user-context';

const server = setupServer(
  rest.post('/api/login', (req, res, ctx) => {
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
    const spy = jest.fn();

    render(
      <UserDispatchContext.Provider value={spy}>
        <Login />
      </UserDispatchContext.Provider>,
    );

    userEvent.type(screen.getByLabelText('Username'), 'test');
    userEvent.type(screen.getByLabelText('Password'), 'wrong');
    userEvent.click(screen.getByText('Save'));

    expect(await screen.findByText('Invalid form'));

    userEvent.clear(screen.getByLabelText('Password'));
    userEvent.type(screen.getByLabelText('Password'), 'test');
    userEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith({
        token: 'token-token',
        username: 'test',
      });
    });
  });
});
