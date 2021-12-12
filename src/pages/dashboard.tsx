import * as React from 'react';

import SceneList from '../components/scene-list';
import Footer from '../components/footer';

function Dashboard() {
  return (
    <div className="flex flex-col h-full">
      <SceneList />
      <Footer />
    </div>
  );
}

export default Dashboard;
