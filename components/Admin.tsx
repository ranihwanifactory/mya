import React, { useState, useEffect } from 'react';
import { auth, loginWithGoogle, logout, addPortfolioItem } from '../services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ShieldAlert, ShieldCheck, LogOut, Plus, Image, Loader2, Link as LinkIcon, Layers, AlertCircle } from 'lucide-react';
import { PortfolioItem, AppCategory } from '../types';
import { APP_CATEGORIES } from '../constants';

const ADMIN_EMAIL = "acehwan69@gmail.com";

const Admin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Login State
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [category, setCategory] = useState<AppCategory>(AppCategory.MVP);
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
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      await loginWithGoogle();
      // Successful login will trigger onAuthStateChanged
    } catch (e: any) {
      console.error("Login Error:", e);
      let errorMsg = "로그인 중 오류가 발생했습니다.";
      
      if (e.code === 'auth/popup-closed-by-user') {
        errorMsg = "로그인 창이 닫혔습니다. 다시 시도해주세요.";
      } else if (e.code === 'auth/unauthorized-domain') {
        errorMsg = "도메인 권한 오류: Firebase 콘솔의 Authentication > Settings > Authorized domains 에 현재 도메인을 추가해주세요.";
      } else if (e.code === 'auth/popup-blocked') {
        errorMsg = "팝업이 차단되었습니다. 브라우저 설정을 확인해주세요.";
      } else if (e.code === 'auth/operation-not-allowed') {
        errorMsg = "Google 로그인이 활성화되지 않았습니다. Firebase 콘솔 > Authentication > Sign-in method 에서 Google을 사용 설정해주세요.";
      } else if (e.code === 'auth/cancelled-popup-request') {
        errorMsg = "팝업 요청이 취소되었습니다. 여러 번 클릭하지 마세요.";
      }
      
      setLoginError(errorMsg);
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.email !== ADMIN_EMAIL) return;

    setIsSubmitting(true);
    const newItem: PortfolioItem = {
      title,
      description,
      imageUrl,
      projectUrl,
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };

    const result = await addPortfolioItem(newItem);
    
    if (result.success) {
      setMessage({ type: 'success', text: '포트폴리오가 성공적으로 등록되었습니다.' });
      setTitle('');
      setDescription('');
      setImageUrl('');
      setProjectUrl('');
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
          
          {loginError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-left">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400 font-medium break-keep">{loginError}</p>
            </div>
          )}

          <button 
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full py-3 bg-white text-slate-900 hover:bg-slate-100 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoggingIn ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            )}
            {isLoggingIn ? '로그인 중...' : 'Google 계정으로 로그인'}
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
            <span className="text-white font-medium">{user.email}</span> 계정은 관리자 권한이 없습니다.<br/>
            지정된 관리자 계정으로 다시 로그인해주세요.
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <label className="block text-sm font-medium text-slate-400 mb-1">카테고리</label>
                  <div className="relative">
                    <Layers className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as AppCategory)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors appearance-none"
                    >
                        {APP_CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                        ))}
                    </select>
                  </div>
                </div>
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
              <label className="block text-sm font-medium text-slate-400 mb-1">샘플 사이트 URL</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                <input 
                    type="url" 
                    value={projectUrl}
                    onChange={(e) => setProjectUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                    placeholder="https://my-app-sample.com"
                />
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