import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

import * as Api from '../api';
import SceneList from './scene-list';
import { TokenStateContext } from '../context/token-context';

const server = setupServer(
  rest.get('/api/scenes/favorites', (_, res, ctx) => {
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
    const spyLaunchScene = jest
      .spyOn(Api, 'useLaunchScene')
      .mockReturnValue(jest.fn());

    render(
      <TokenStateContext.Provider value="token">
        <SceneList />
      </TokenStateContext.Provider>,
    );

    expect(await screen.findByText('Jest')).toBeVisible();
    expect(screen.getByText('React')).toBeVisible();
    expect(screen.getByText('Typescript')).toBeVisible();

    fireEvent.click(screen.getByText('Jest'));
    expect(spyLaunchScene).toHaveBeenCalledWith(
      '434d2662-de89-4861-9ca1-46e307d31f90',
    );
  });
});
