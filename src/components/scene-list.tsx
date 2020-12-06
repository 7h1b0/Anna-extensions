import React from 'react';

import type { Scene } from '../scene';
import SceneBtn from './scene';
import { useScenes } from '../api';

function sortByName(a: Scene, b: Scene) {
  return a.name.localeCompare(b.name);
}

function SceneList() {
  const scenes = useScenes();

  return (
    <div>
      {scenes.sort(sortByName).map((scene) => (
        <SceneBtn key={scene.sceneId} scene={scene} />
      ))}
    </div>
  );
}

export default SceneList;
