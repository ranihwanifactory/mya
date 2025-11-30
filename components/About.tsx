import React from 'react';
import { Bot, Code2, Rocket, MapPin, Phone, Mail, Award, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" />
            <span>AI-Powered Development Agency</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            상상을 현실로 만드는<br/>
            <span className="text-brand-500">디에이치웹연구소</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            최첨단 AI 기술과 웹 마스터의 전문성이 만나 당신의 비즈니스에 날개를 달아드립니다.
            단순한 앱 제작을 넘어 성공적인 비즈니스 파트너가 되겠습니다.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-slate-800 to-slate-950 border-4 border-slate-800 flex items-center justify-center shrink-0 shadow-2xl">
              <Bot className="w-20 h-20 text-slate-600" />
            </div>
            
            <div className="text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-white">김진환</h2>
                <span className="px-3 py-1 bg-brand-600 text-white text-xs font-bold rounded-full">AI Webmaster</span>
              </div>
              <p className="text-brand-400 font-medium mb-6">Chief Developer / CEO</p>
              <p className="text-slate-400 mb-8 leading-relaxed max-w-xl">
                "기술의 장벽 때문에 혁신적인 아이디어가 사장되지 않도록 돕겠습니다. 
                AI를 활용한 고효율 개발 프로세스로 합리적인 비용과 최상의 퀄리티를 약속드립니다."
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-slate-300 bg-slate-950/50 px-4 py-3 rounded-xl border border-slate-800/50">
                  <Phone className="w-5 h-5 text-brand-500" />
                  <span>010-7545-0038</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 bg-slate-950/50 px-4 py-3 rounded-xl border border-slate-800/50">
                  <Mail className="w-5 h-5 text-brand-500" />
                  <span>hwanace@naver.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-brand-500/30 transition-colors group">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-brand-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">오시는 길</h3>
                <p className="text-slate-400">
                    대구 달성군 구지면<br/>
                    국가산단북로 60길 59<br/>
                    디에이치웹연구소
                </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-brand-500/30 transition-colors group">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6 text-brand-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">전문 분야</h3>
                <p className="text-slate-400">
                    MVP 앱 개발<br/>
                    AI 서비스 통합<br/>
                    엔터프라이즈 솔루션
                </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-brand-500/30 transition-colors group">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-brand-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">핵심 가치</h3>
                <p className="text-slate-400">
                    Speed (빠른 개발)<br/>
                    Quality (고품질)<br/>
                    Innovation (기술 혁신)
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default About;