import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // fix TS issues

import * as Api from '../api';
import SceneList from './scene-list';

describe('SceneList', () => {
  it('should let user launch a scene', async () => {
    const spyLaunchScene = jest
      .spyOn(Api, 'launchScene')
      .mockResolvedValue(void 0);
    jest.spyOn(Api, 'fetchScenes').mockResolvedValue([
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
    ]);
    render(<SceneList />);

    await waitFor(() => {
      expect(screen.getByText('Jest')).toBeVisible();
      expect(screen.getByText('React')).toBeVisible();
      expect(screen.getByText('Typescript')).toBeVisible();
    });

    fireEvent.click(screen.getByText('Jest'));
    expect(spyLaunchScene).toHaveBeenCalledWith(
      '434d2662-de89-4861-9ca1-46e307d31f90',
    );
  });
});
