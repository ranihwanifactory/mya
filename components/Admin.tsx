import React, { useState, useEffect } from 'react';
import { auth, loginWithGoogle, logout, addPortfolioItem, updatePortfolioItem, deletePortfolioItem, getPortfolioItems } from '../services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ShieldAlert, ShieldCheck, LogOut, Plus, Image, Loader2, Link as LinkIcon, Layers, AlertCircle, Edit2, Trash2, X, RefreshCw, Star } from 'lucide-react';
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [category, setCategory] = useState<AppCategory>(AppCategory.STARTUP);
  const [tags, setTags] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // List State
  const [portfolioList, setPortfolioList] = useState<PortfolioItem[]>([]);
  const [isFetchingList, setIsFetchingList] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser && currentUser.email === ADMIN_EMAIL) {
        fetchPortfolioList();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchPortfolioList = async () => {
    setIsFetchingList(true);
    try {
      const items = await getPortfolioItems();
      setPortfolioList(items);
    } catch (e) {
      console.error("Failed to fetch list", e);
    } finally {
      setIsFetchingList(false);
    }
  };

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

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setImageUrl('');
    setProjectUrl('');
    setCategory(AppCategory.STARTUP);
    setTags('');
    setIsFeatured(false);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingId(item.id || null);
    setTitle(item.title);
    setDescription(item.description);
    setImageUrl(item.imageUrl);
    setProjectUrl(item.projectUrl || '');
    setCategory(item.category);
    setTags(item.tags.join(', '));
    setIsFeatured(item.isFeatured || false);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("정말로 이 포트폴리오를 삭제하시겠습니까?")) return;
    
    try {
      await deletePortfolioItem(id);
      setMessage({ type: 'success', text: '삭제되었습니다.' });
      fetchPortfolioList();
      if (editingId === id) resetForm();
    } catch (e) {
      setMessage({ type: 'error', text: '삭제 중 오류가 발생했습니다.' });
    }
    
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.email !== ADMIN_EMAIL) return;

    setIsSubmitting(true);
    const itemData: PortfolioItem = {
      title,
      description,
      imageUrl,
      projectUrl,
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      isFeatured
    };

    let result;
    if (editingId) {
      result = await updatePortfolioItem(editingId, itemData);
    } else {
      result = await addPortfolioItem(itemData);
    }
    
    if (result.success) {
      setMessage({ type: 'success', text: editingId ? '수정되었습니다.' : '등록되었습니다.' });
      resetForm();
      fetchPortfolioList();
    } else {
      setMessage({ type: 'error', text: '작업 중 오류가 발생했습니다.' });
    }
    setIsSubmitting(false);
    
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
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
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

        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-1">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl sticky top-24">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        {editingId ? <Edit2 className="w-5 h-5 text-brand-500" /> : <Plus className="w-5 h-5 text-brand-500" />}
                        {editingId ? '포트폴리오 수정' : '새 포트폴리오 등록'}
                    </span>
                    {editingId && (
                        <button onClick={resetForm} className="text-xs text-slate-500 hover:text-white flex items-center gap-1">
                            <X className="w-3 h-3" /> 취소
                        </button>
                    )}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">제목</label>
                      <input 
                        type="text" 
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                        placeholder="프로젝트 제목"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">카테고리</label>
                      <div className="relative">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as AppCategory)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors appearance-none"
                        >
                            {APP_CATEGORIES.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.label}</option>
                            ))}
                        </select>
                        <Layers className="absolute right-3 top-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">이미지 URL</label>
                      <input 
                        type="url" 
                        required
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                    {imageUrl && (
                         <div className="h-32 bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
                            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">링크 URL</label>
                      <input 
                        type="url" 
                        value={projectUrl}
                        onChange={(e) => setProjectUrl(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">태그</label>
                      <input 
                        type="text" 
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                        placeholder="React, AI"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">설명</label>
                      <textarea 
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors h-24 resize-none"
                        placeholder="상세 설명..."
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 py-2">
                        <button
                            type="button"
                            onClick={() => setIsFeatured(!isFeatured)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                                isFeatured 
                                ? 'bg-brand-500/10 border-brand-500 text-brand-400' 
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                        >
                            <Star className={`w-4 h-4 ${isFeatured ? 'fill-brand-400' : ''}`} />
                            <span className="text-sm font-medium">추천작으로 설정</span>
                        </button>
                        {isFeatured && <span className="text-xs text-brand-400 animate-fade-in">메인 화면 최상단에 노출됩니다.</span>}
                    </div>

                    {message && (
                      <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {message.type === 'success' ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                        {message.text}
                      </div>
                    )}

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                          editingId ? 'bg-brand-600 hover:bg-brand-500' : 'bg-white text-slate-900 hover:bg-slate-200'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          처리 중...
                        </>
                      ) : (
                        editingId ? '수정사항 저장' : '등록하기'
                      )}
                    </button>
                  </form>
                </div>
            </div>

            {/* Right Column: List */}
            <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">등록된 포트폴리오 ({portfolioList.length})</h3>
                    <button 
                        onClick={fetchPortfolioList} 
                        className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
                        title="새로고침"
                    >
                        <RefreshCw className={`w-5 h-5 ${isFetchingList ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                <div className="space-y-4">
                    {portfolioList.length === 0 ? (
                        <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
                            <p className="text-slate-500">등록된 포트폴리오가 없습니다.</p>
                        </div>
                    ) : (
                        portfolioList.map((item) => (
                            <div key={item.id} className={`bg-slate-900 border rounded-xl p-4 flex gap-4 group transition-all ${item.isFeatured ? 'border-brand-500/50 shadow-lg shadow-brand-900/10' : 'border-slate-800 hover:border-brand-500/30'}`}>
                                <div className="w-24 h-24 bg-slate-950 rounded-lg overflow-hidden shrink-0 border border-slate-800 relative">
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Image className="w-6 h-6 text-slate-700" />
                                        </div>
                                    )}
                                    {item.isFeatured && (
                                        <div className="absolute top-1 left-1 bg-brand-500 text-white p-1 rounded-md shadow-md">
                                            <Star className="w-3 h-3 fill-white" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-1">
                                        <div className="flex items-center gap-2 truncate pr-4">
                                            <h4 className="text-lg font-bold text-white">{item.title}</h4>
                                            {item.isFeatured && <span className="text-[10px] bg-brand-900/50 text-brand-300 px-1.5 py-0.5 rounded border border-brand-500/30">추천작</span>}
                                        </div>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 whitespace-nowrap">
                                            {APP_CATEGORIES.find(c => c.id === item.category)?.label || item.category}
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-sm line-clamp-2 mb-3">{item.description}</p>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            {item.projectUrl && (
                                                <a href={item.projectUrl} target="_blank" rel="noreferrer" className="text-xs text-brand-400 hover:underline flex items-center gap-1">
                                                    <LinkIcon className="w-3 h-3" /> Link
                                                </a>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => handleEdit(item)}
                                                className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                                                title="수정"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => item.id && handleDelete(item.id)}
                                                className="p-2 text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-red-900/30 rounded-lg transition-colors"
                                                title="삭제"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;