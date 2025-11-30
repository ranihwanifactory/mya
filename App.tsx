import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Magazine from './components/Magazine';
import Admin from './components/Admin';

type ViewState = 'home' | 'admin';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const renderContent = () => {
    switch(currentView) {
      case 'admin':
        return <Admin />;
      case 'home':
      default:
        return <Magazine />;
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-200 selection:bg-brand-500/30">
      <Navbar onNavigate={(view) => setCurrentView(view as ViewState)} />
      <main>
        {renderContent()}
      </main>
      
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 MYA (Make Your App). All rights reserved.</p>
          <p className="mt-2 mb-4">서울특별시 강남구 테헤란로</p>
          <button 
            onClick={() => setCurrentView('admin')}
            className="text-xs text-slate-800 hover:text-slate-600 transition-colors"
          >
            관리자 페이지 (Admin Access)
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;