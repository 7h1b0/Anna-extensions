import * as React from 'react';

import type { Scene } from '../scene';
import { useLaunchScene } from '../api';

type Props = {
  scene: Scene;
};

function SceneBtn({ scene }: React.PropsWithKey<Props>) {
  const launchScene = useLaunchScene(scene.sceneId);

  return <div onClick={launchScene}>{scene.name}</div>;
}

export default SceneBtn;
