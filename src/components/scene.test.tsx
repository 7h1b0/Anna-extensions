import React from 'react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom';

import * as Api from '../api';
import SceneBtn from './scene';

describe('SceneList', () => {
  it('should call ', async () => {
    const spyLaunchScene = jest.spyOn(Api, 'useLaunchScene');

    render(<SceneBtn scene={{ sceneId: 'plop', name: 'test' }} />);

    expect(spyLaunchScene).toHaveBeenCalledWith('plop');
  });
});
