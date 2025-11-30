import React, { useState, useEffect } from 'react';
import { auth, loginWithGoogle, logout, addPortfolioItem } from '../services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ShieldAlert, ShieldCheck, LogOut, Plus, Image, Loader2 } from 'lucide-react';
import { PortfolioItem } from '../types';

const ADMIN_EMAIL = "acehwan69@gmail.com";

const Admin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.email !== ADMIN_EMAIL) return;

    setIsSubmitting(true);
    const newItem: PortfolioItem = {
      title,
      description,
      imageUrl,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };

    const result = await addPortfolioItem(newItem);
    
    if (result.success) {
      setMessage({ type: 'success', text: '포트폴리오가 성공적으로 등록되었습니다.' });
      setTitle('');
      setDescription('');
      setImageUrl('');
      setTags('');
    } else {
      setMessage({ type: 'error', text: '등록 중 오류가 발생했습니다.' });
    }
    setIsSubmitting(false);
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-brand-500"><Loader2 className="animate-spin w-8 h-8"/></div>;
  }

  // Not Logged In
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">관리자 로그인</h2>
          <p className="text-slate-400 mb-8">MYA 포트폴리오 관리자 계정으로 로그인해주세요.</p>
          <button 
            onClick={handleLogin}
            className="w-full py-3 bg-white text-slate-900 hover:bg-slate-100 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Google 계정으로 로그인
          </button>
        </div>
      </div>
    );
  }

  // Unauthorized
  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-red-900/50 rounded-2xl p-8 text-center">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">접근 권한 없음</h2>
          <p className="text-slate-400 mb-6">
            {user.email} 계정은 관리자 권한이 없습니다.<br/>
            관리자 계정으로 다시 로그인해주세요.
          </p>
          <button 
            onClick={handleLogout}
            className="px-6 py-2 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-500/20 rounded-lg flex items-center justify-center text-brand-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">관리자 대시보드</h1>
              <p className="text-slate-400 text-sm">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-brand-500" />
            새 포트폴리오 등록
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">프로젝트 제목</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                placeholder="예: 배달의민족 리뉴얼 프로젝트"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">썸네일 이미지 URL</label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input 
                    type="url" 
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="w-32 h-12 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
                  {imageUrl ? (
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Image className="w-5 h-5 text-slate-600" />
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">태그 (쉼표로 구분)</label>
              <input 
                type="text" 
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                placeholder="React, Next.js, AI, E-Commerce"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">설명</label>
              <textarea 
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors h-32 resize-none"
                placeholder="프로젝트에 대한 상세 설명을 입력하세요."
              />
            </div>

            {message && (
              <div className={`p-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {message.type === 'success' ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                {message.text}
              </div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  등록 중...
                </>
              ) : (
                '포트폴리오 등록하기'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;