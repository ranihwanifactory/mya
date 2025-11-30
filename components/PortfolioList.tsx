import React, { useEffect, useState } from 'react';
import { getPortfolioItems } from '../services/firebase';
import { PortfolioItem } from '../types';
import { Loader2, ExternalLink, ImageOff } from 'lucide-react';

const PortfolioList: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getPortfolioItems();
      setItems(data);
      setLoading(false);
    };
    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return null; // Don't show section if empty
  }

  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            MYA와 함께 성공적인 비즈니스를 시작한 파트너들의 이야기를 확인해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id || Math.random()} className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-brand-500/50 transition-all hover:shadow-2xl hover:shadow-brand-500/10">
              <div className="aspect-video relative overflow-hidden bg-slate-950">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null; 
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                {/* Fallback for broken images or empty URLs */}
                <div className={`w-full h-full flex items-center justify-center text-slate-700 ${item.imageUrl ? 'hidden' : 'flex'}`}>
                    <ImageOff className="w-12 h-12" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-white font-medium flex items-center gap-2">
                    자세히 보기 <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 text-xs font-medium text-brand-300 bg-brand-500/10 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioList;