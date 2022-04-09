import * as React from 'react';

import SceneList from '../components/scene-list';
import Footer from '../components/footer';

function Dashboard() {
  return (
    <main className="flex flex-col h-full">
      <SceneList />
      <Footer />
    </main>
  );
}

export default Dashboard;
