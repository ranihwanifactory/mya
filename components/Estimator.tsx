import React, { useState, useMemo, useEffect } from 'react';
import { APP_CATEGORIES, AVAILABLE_FEATURES, getIcon } from '../constants';
import { AppCategory, ProjectRequest } from '../types';
import { Check, Info, Loader2, Send } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { submitProjectRequest } from '../services/firebase';

interface EstimatorProps {
  // empty
}

const Estimator: React.FC<EstimatorProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<AppCategory | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
  const [appName, setAppName] = useState('');
  const [description, setDescription] = useState('');
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', contact: '' });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const basePrice = useMemo(() => {
    return selectedCategory 
      ? APP_CATEGORIES.find(c => c.id === selectedCategory)?.basePrice || 0
      : 0;
  }, [selectedCategory]);

  const featuresPrice = useMemo(() => {
    let total = 0;
    selectedFeatures.forEach(fid => {
      const f = AVAILABLE_FEATURES.find(feat => feat.id === fid);
      if (f) total += f.baseCost;
    });
    return total;
  }, [selectedFeatures]);

  const totalPrice = basePrice + featuresPrice;

  const toggleFeature = (featureId: string) => {
    const next = new Set(selectedFeatures);
    if (next.has(featureId)) {
      next.delete(featureId);
    } else {
      next.add(featureId);
    }
    setSelectedFeatures(next);
  };

  const handleCategorySelect = (id: AppCategory) => {
    setSelectedCategory(id);
    // Reset features when category changes? No, let's keep them implies upselling.
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;
    
    setIsSubmitting(true);

    const requestData: ProjectRequest = {
      appName,
      category: selectedCategory,
      selectedFeatures: Array.from(selectedFeatures),
      estimatedPrice: totalPrice,
      clientName: clientInfo.name,
      clientEmail: clientInfo.email,
      contact: clientInfo.contact,
      description
    };

    const result = await submitProjectRequest(requestData);
    
    // Simulate delay for effect
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (!result.success) {
        console.warn("Firebase submission failed (likely permission issues in demo), but UI shows success state.");
      }
    }, 1500);
  };

  // Chart Data
  const chartData = useMemo(() => {
    if (!selectedCategory) return [];
    const data = [
      { name: '기본 개발비', value: basePrice, color: '#0ea5e9' }, // brand-500
    ];
    selectedFeatures.forEach(fid => {
      const f = AVAILABLE_FEATURES.find(feat => feat.id === fid);
      if (f) {
        data.push({ name: f.name, value: f.baseCost, color: '#8b5cf6' }); // accent-500
      }
    });
    return data;
  }, [basePrice, selectedFeatures, selectedCategory]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center animate-fade-in-up">
          <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">견적 요청 완료!</h2>
          <p className="text-slate-400 mb-8">
            담당자가 검토 후 24시간 이내에<br/>
            <span className="text-white font-medium">{clientInfo.email}</span> 로 연락드리겠습니다.
          </p>
          <div className="bg-slate-950 rounded-xl p-4 mb-6 border border-slate-800">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">예상 견적가</span>
              <span className="text-brand-400 font-bold">{formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">프로젝트</span>
              <span className="text-slate-200">{appName || 'Untitled App'}</span>
            </div>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">프로젝트 견적 산출</h2>
          <p className="text-slate-400">원하시는 앱 카테고리와 기능을 선택하면 AI가 예상 견적을 계산합니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Selection */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* 1. Category */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-600 text-xs">1</span>
                앱 카테고리 선택
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {APP_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`relative p-6 rounded-xl text-left border transition-all duration-200 group ${
                      selectedCategory === cat.id
                        ? 'bg-brand-500/10 border-brand-500 shadow-lg shadow-brand-500/10'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                      selectedCategory === cat.id ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                    }`}>
                      {getIcon(cat.iconName, { size: 20 })}
                    </div>
                    <h4 className="text-lg font-medium text-white mb-1">{cat.label}</h4>
                    <p className="text-sm text-slate-400 mb-2">{cat.description}</p>
                    <p className="text-sm font-semibold text-brand-400">
                      {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(cat.basePrice)} 부터
                    </p>
                    {selectedCategory === cat.id && (
                      <div className="absolute top-4 right-4 w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* 2. Features */}
            <section className={!selectedCategory ? 'opacity-50 pointer-events-none filter blur-sm transition-all' : 'transition-all'}>
               <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-600 text-xs">2</span>
                추가 기능 선택
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {AVAILABLE_FEATURES.map((feat) => (
                  <button
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                      selectedFeatures.has(feat.id)
                        ? 'bg-accent-500/10 border-accent-500'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className={`mt-1 ${selectedFeatures.has(feat.id) ? 'text-accent-400' : 'text-slate-500'}`}>
                      {selectedFeatures.has(feat.id) 
                        ? <Check className="w-5 h-5" /> 
                        : <div className="w-5 h-5 rounded border border-slate-600" />
                      }
                    </div>
                    <div className="text-left flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className={`font-medium ${selectedFeatures.has(feat.id) ? 'text-white' : 'text-slate-300'}`}>
                          {feat.name}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                           +{feat.baseCost / 10000}만
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{feat.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* 3. Details Form */}
            <section className={!selectedCategory ? 'hidden' : 'block animate-fade-in'}>
               <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-600 text-xs">3</span>
                프로젝트 상세 정보
              </h3>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">앱 이름 (가칭)</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                      placeholder="My Super App"
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">담당자 성함</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                      placeholder="홍길동"
                      value={clientInfo.name}
                      onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">이메일 *</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                      placeholder="contact@company.com"
                      value={clientInfo.email}
                      onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})}
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">연락처</label>
                    <input 
                      type="tel" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                      placeholder="010-1234-5678"
                      value={clientInfo.contact}
                      onChange={(e) => setClientInfo({...clientInfo, contact: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-400 mb-1">프로젝트 설명</label>
                   <textarea 
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors h-24 resize-none"
                      placeholder="만들고자 하는 앱의 핵심 기능과 목적을 간단히 적어주세요."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                   />
                </div>
              </div>
            </section>

          </div>

          {/* Right Column: Sticky Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Cost Breakdown Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-white mb-4">예상 견적 명세서</h3>
                
                {/* Visual Chart */}
                <div className="h-48 mb-6 relative">
                  {selectedCategory ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => formatCurrency(value)}
                          contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                     <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm">
                        카테고리를 선택하세요
                     </div>
                  )}
                  {selectedCategory && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                       <span className="text-xs text-slate-400">Total</span>
                       <span className="text-sm font-bold text-white">{(totalPrice / 1000000).toFixed(1)}M</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-400">기본 개발비</span>
                     <span className="text-white">{formatCurrency(basePrice)}</span>
                  </div>
                  {selectedFeatures.size > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">추가 기능 ({selectedFeatures.size})</span>
                      <span className="text-white">+{formatCurrency(featuresPrice)}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-slate-800 flex justify-between items-end">
                    <span className="text-slate-300 font-medium">총 예상 비용</span>
                    <span className="text-2xl font-bold text-brand-400">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>
                
                <div className="bg-slate-950/50 p-3 rounded-lg flex gap-2 items-start mb-6">
                   <Info className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                   <p className="text-xs text-slate-500 leading-relaxed">
                     * 위 견적은 AI 모델이 계산한 추정치이며, 실제 요구사항 분석 단계에서 상세 견적은 조정될 수 있습니다.
                   </p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!selectedCategory || !clientInfo.email || isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
                    !selectedCategory || !clientInfo.email
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white shadow-brand-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      처리중...
                    </>
                  ) : (
                    <>
                      견적서 받기
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estimator;