import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Estimator from './components/Estimator';
import Admin from './components/Admin';
import PortfolioList from './components/PortfolioList';

type ViewState = 'home' | 'estimator' | 'admin';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const renderContent = () => {
    switch(currentView) {
      case 'admin':
        return <Admin />;
      case 'estimator':
        return <Estimator />;
      case 'home':
      default:
        return (
          <>
            <Hero onStart={() => setCurrentView('estimator')} />
            <PortfolioList />
            {/* Simple Feature Highlights */}
            <div className="py-24 bg-slate-900/30 border-t border-slate-900">
              <div className="max-w-7xl mx-auto px-4 text-center">
                 <h2 className="text-3xl font-bold text-white mb-16">Why MYA?</h2>
                 <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition-colors group">
                       <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-400 transition-colors">초고속 개발</h3>
                       <p className="text-slate-400">AI 코드 생성 엔진을 활용하여 기존 대비 300% 빠른 개발 속도를 보장합니다.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition-colors group">
                       <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-400 transition-colors">투명한 견적</h3>
                       <p className="text-slate-400">숨겨진 비용 없이 기능별 상세 단가를 실시간으로 확인하고 조정할 수 있습니다.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition-colors group">
                       <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-400 transition-colors">최신 기술 스택</h3>
                       <p className="text-slate-400">React, Node.js, Python AI 등 현대적이고 확장 가능한 아키텍처를 제공합니다.</p>
                    </div>
                 </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-200">
      <Navbar onNavigate={(view) => setCurrentView(view as ViewState)} />
      <main className="pt-16">
        {renderContent()}
      </main>
      
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 MYA (Make Your App). All rights reserved.</p>
          <p className="mt-2 mb-4">서울특별시 강남구 테헤란로 AI타워 14F</p>
          <button 
            onClick={() => setCurrentView('admin')}
            className="text-xs text-slate-800 hover:text-slate-600 transition-colors"
          >
            Admin Access
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;