import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Magazine from './components/Magazine';
import Admin from './components/Admin';
import About from './components/About';
import Contact from './components/Contact';

type ViewState = 'home' | 'admin' | 'about' | 'contact';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const renderContent = () => {
    switch(currentView) {
      case 'admin':
        return <Admin />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
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
          <p className="font-semibold text-slate-400">DreamLab (드림랩)</p>
          <p className="mt-2 mb-4">대구 달성군 구지면 국가산단북로 60길 59 디에이치웹연구소</p>
          <p className="mb-4">Tel: 010-7545-0038 | Email: hwanace@naver.com</p>
          <div className="flex justify-center gap-4">
            <button 
                onClick={() => setCurrentView('home')}
                className="hover:text-white transition-colors"
            >
                Home
            </button>
            <button 
                onClick={() => setCurrentView('about')}
                className="hover:text-white transition-colors"
            >
                About
            </button>
            <button 
                onClick={() => setCurrentView('contact')}
                className="hover:text-white transition-colors"
            >
                Contact
            </button>
            <button 
                onClick={() => setCurrentView('admin')}
                className="hover:text-white transition-colors"
            >
                Admin
            </button>
          </div>
          <p className="mt-8 opacity-50">© 2024 DreamLab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;