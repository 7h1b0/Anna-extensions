import React from 'react';

import type { Scene } from '../scene';
import SceneBtn from './scene';
import { useFetchScenes } from '../api';

function sortByName(a: Scene, b: Scene) {
  return a.name.localeCompare(b.name);
}

function SceneList() {
  const fetchScenes = useFetchScenes();
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
