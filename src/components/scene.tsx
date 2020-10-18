import React from 'react';

import type { Scene } from '../scene';
import { launchScene } from '../api';

type Props = {
  scene: Scene;
};

const SceneBtn: React.FC<Props> = ({ scene }) => {
  function handleClick() {
    launchScene(scene.sceneId);
  }

  return <div onClick={handleClick}>{scene.name}</div>;
};

export default SceneBtn;
