import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-slate-950 pt-16 pb-32">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-brand-300 text-sm font-medium mb-8 backdrop-blur-sm animate-fade-in-up">
          <Sparkles className="w-4 h-4" />
          <span>Make Your App - Premium Development Agency</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          상상을 현실로 만드는 <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-500">
            MYA의 AI 개발 솔루션
          </span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          MYA(Make Your App)는 최신 기술 스택과 인공지능을 결합하여, 
          기존 개발 방식보다 3배 더 빠르고 효율적인 앱 제작 서비스를 제공합니다.
          지금 바로 견적을 확인해보세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-brand-500/25 flex items-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative">무료 견적 산출하기</span>
            <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="px-8 py-4 bg-slate-900/50 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl font-semibold text-lg transition-colors backdrop-blur-sm">
            포트폴리오 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;