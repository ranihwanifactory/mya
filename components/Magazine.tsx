import React, { useEffect, useState, useMemo } from 'react';
import { getPortfolioItems } from '../services/firebase';
import { PortfolioItem, AppCategory } from '../types';
import { APP_CATEGORIES } from '../constants';
import { Loader2, ExternalLink, ImageOff, Search, ArrowUpRight, Sparkles, Filter, AlertTriangle } from 'lucide-react';

const Magazine: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getPortfolioItems();
        setItems(data);
      } catch (err: any) {
        console.error("Fetch Error:", err);
        if (err.code === 'permission-denied') {
            setError("데이터베이스 접근 권한이 없습니다. Firebase 콘솔 > Firestore > Rules 탭에서 'allow read: if true;' 규칙을 추가해주세요.");
        } else {
            setError("데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, activeCategory]);

  const { featuredItem, gridItems } = useMemo(() => {
    if (filteredItems.length === 0) return { featuredItem: null, gridItems: [] };

    // 1. Try to find a featured item within the filtered list
    const explicitFeaturedIndex = filteredItems.findIndex(item => item.isFeatured);

    if (explicitFeaturedIndex !== -1) {
        const featured = filteredItems[explicitFeaturedIndex];
        const rest = [...filteredItems];
        rest.splice(explicitFeaturedIndex, 1);
        return { featuredItem: featured, gridItems: rest };
    }

    // 2. Fallback: Use the first item as featured if no explicit featured item exists
    return {
        featuredItem: filteredItems[0],
        gridItems: filteredItems.slice(1)
    };
  }, [filteredItems]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-10 h-10 text-brand-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="max-w-xl w-full bg-slate-900 border border-yellow-500/30 rounded-2xl p-8 text-center">
                <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-4">설정 확인 필요</h2>
                <p className="text-slate-300 mb-6 bg-slate-950 p-4 rounded-lg border border-slate-800 text-sm">
                    {error}
                </p>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg transition-colors font-medium"
                >
                    다시 시도
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      
      {/* Magazine Header */}
      <div className="pt-32 pb-12 px-4 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-brand-300 text-xs font-medium mb-6 backdrop-blur-sm animate-fade-in-up">
            <Sparkles className="w-3 h-3" />
            <span>Premium App Showcase</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-serif">
          Make Your <span className="text-brand-500">App</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          AI 기술로 구현된 혁신적인 앱 포트폴리오를 탐색하세요.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="sticky top-16 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Category Tabs */}
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar mask-gradient">
              <button 
                onClick={() => setActiveCategory('ALL')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === 'ALL' 
                    ? 'bg-white text-slate-900' 
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-600'
                }`}
              >
                전체보기
              </button>
              {APP_CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id 
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="앱 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors placeholder:text-slate-600"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
            <Filter className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">조건에 맞는 프로젝트가 없습니다.</p>
            <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('ALL');}}
                className="mt-4 text-brand-400 hover:text-brand-300 font-medium"
            >
                필터 초기화
            </button>
          </div>
        ) : (
            <>
                {/* Featured Item (First item) */}
                {featuredItem && activeCategory === 'ALL' && !searchQuery && (
                <div className="mb-16 group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-brand-500/30 transition-all duration-500 shadow-2xl">
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Changed: Enforce 16:9 aspect ratio */}
                        <div className="relative w-full aspect-video overflow-hidden">
                            {featuredItem.imageUrl ? (
                                <img 
                                    src={featuredItem.imageUrl} 
                                    alt={featuredItem.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                    <ImageOff className="w-12 h-12 text-slate-600" />
                                </div>
                            )}
                            <div className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                추천작 (Featured)
                            </div>
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">
                                  {APP_CATEGORIES.find(c => c.id === featuredItem.category)?.label || featuredItem.category}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-slate-600" />
                                <span className="text-slate-500 text-sm">{new Date().getFullYear()}</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                {featuredItem.title}
                            </h2>
                            <p className="text-slate-400 text-lg mb-8 leading-relaxed line-clamp-3">
                                {featuredItem.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {featuredItem.tags.slice(0,4).map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-400">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            {featuredItem.projectUrl && (
                                <a 
                                    href={featuredItem.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-white font-semibold hover:text-brand-400 transition-colors w-fit group/btn"
                                >
                                    웹사이트 방문
                                    <ArrowUpRight className="w-5 h-5 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                )}

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Render remaining items */}
                    {gridItems.map((item) => (
                        <div key={item.id} className="flex flex-col group">
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-900 border border-slate-800">
                                {item.imageUrl ? (
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageOff className="w-8 h-8 text-slate-700" />
                                    </div>
                                )}
                                
                                {item.projectUrl && (
                                    <a 
                                        href={item.projectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]"
                                    >
                                        <div className="bg-white text-slate-950 px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            라이브 보기 <ExternalLink className="w-4 h-4" />
                                        </div>
                                    </a>
                                )}
                                
                                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur text-xs font-medium text-white px-3 py-1 rounded-full border border-slate-800">
                                    {APP_CATEGORIES.find(c => c.id === item.category)?.label || 'App'}
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 text-sm line-clamp-2 mb-3">
                                    {item.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-xs text-slate-500 font-medium">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default Magazine;