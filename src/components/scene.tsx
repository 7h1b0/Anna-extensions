import * as React from 'react';

import type { Scene } from '../scene';
import { useLaunchScene } from '../api';

type Props = {
  scene: Scene;
};

function SceneBtn({ scene }: Props) {
  const launchScene = useLaunchScene(scene.sceneId);

  return (
    <li>
      <button
        className="w-full text-left text-sm font-medium text-grey-900 hover:bg-gray-100 hover:text-green-700 py-2 px-4 cursor-pointer rounded-lg"
        onClick={launchScene}
      >
        {scene.name}
      </button>
    </li>
  );
}

export default SceneBtn;
