import * as React from 'react';

import type { Scene } from '../scene';
import { useLaunchScene } from '../api';

type Props = {
  scene: Scene;
};

function SceneBtn({ scene }: Props) {
  const launchScene = useLaunchScene(scene.sceneId);

  return (
    <div className="scene" onClick={launchScene}>
      {scene.name}
    </div>
  );
}

export default SceneBtn;
