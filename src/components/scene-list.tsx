import React from 'react';

import type { Scene } from '../scene';
import { fetchScenes } from '../api';
import SceneBtn from './scene';

function sortByName(a: Scene, b: Scene) {
  return a.name.localeCompare(b.name);
}

function SceneList() {
  const [scenes, setScenes] = React.useState([]);

  React.useEffect(() => {
    fetchScenes().then((scenes) => setScenes(scenes));
  }, []);

  return (
    <main>
      {scenes.sort(sortByName).map((scene) => (
        <SceneBtn key={scene.sceneId} scene={scene} />
      ))}
    </main>
  );
}

export default SceneList;
