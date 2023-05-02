import React from 'react';
import AppHeader from "./components/app-header/app-header";
import AppPanel from "./components/app-panel/app-panel";
import app from './App.module.css';

function App() {
  return (
    <main className={app.main}>
        <AppHeader />
        <AppPanel />
    </main>
  );
}

export default App;
