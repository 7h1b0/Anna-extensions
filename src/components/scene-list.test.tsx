import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

import * as Api from '../api';
import SceneList from './scene-list';
import { UserStateContext } from '../context/user-context';
import * as storage from '../lib/storage';

const server = setupServer(
  rest.get('http://test.lan/api/scenes/favorites', (_, res, ctx) => {
    return res(
      ctx.json([
        {
          sceneId: '434d2662-de89-4861-9ca1-46e307d31f90',
          name: 'Jest',
        },
        {
          sceneId: '4f58b400-8c72-4c6f-9c42-2c38a62ed1fb',
          name: 'React',
        },
        {
          sceneId: '53f257db-e832-4b92-9f0a-234379bfcf71',
          name: 'Typescript',
        },
      ]),
    );
  }),
);

describe('SceneList', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should let user launch a scene', async () => {
    const user = userEvent.setup();
    const spyLaunchScene = jest
      .spyOn(Api, 'useLaunchScene')
      .mockReturnValue(jest.fn());

    jest
      .spyOn(storage, 'fetchHost')
      .mockResolvedValue({ host: 'http://test.lan' });

    render(
      <UserStateContext.Provider value={{ username: 'toto', token: 'token' }}>
        <SceneList />
      </UserStateContext.Provider>,
    );

    expect(await screen.findByRole('button', { name: 'Jest' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'React' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Typescript' })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Jest' }));
    expect(spyLaunchScene).toHaveBeenCalledWith(
      '434d2662-de89-4861-9ca1-46e307d31f90',
    );
  });
});
