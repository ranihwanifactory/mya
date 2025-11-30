import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending delay for UX
    setTimeout(() => {
      const { name, phone, subject, message } = formData;
      const emailBody = `
[문의 내용]
성함: ${name}
연락처: ${phone}
내용:
${message}
      `.trim();

      // Open mail client
      window.location.href = `mailto:hwanace@naver.com?subject=[MYA 문의] ${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 pt-20">
        <div className="bg-slate-900 border border-brand-500/30 p-8 rounded-3xl text-center max-w-md w-full shadow-2xl">
          <div className="w-20 h-20 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-brand-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">메일 앱이 실행되었습니다!</h2>
          <p className="text-slate-400 mb-8">
            메일 전송 버튼을 눌러 문의를 완료해주세요.<br/>
            확인 후 빠르게 답변 드리겠습니다.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors font-medium"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              프로젝트 문의하기
            </h1>
            <p className="text-lg text-slate-400 mb-12">
              앱 개발에 대해 궁금한 점이 있으신가요?<br/>
              디에이치웹연구소가 상세하게 상담해드립니다.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 shrink-0">
                  <Mail className="w-6 h-6 text-brand-500" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Email</h3>
                  <p className="text-slate-400">hwanace@naver.com</p>
                  <p className="text-xs text-slate-500 mt-1">24시간 이내 회신드립니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 shrink-0">
                  <Phone className="w-6 h-6 text-brand-500" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Phone</h3>
                  <p className="text-slate-400">010-7545-0038</p>
                  <p className="text-xs text-slate-500 mt-1">평일 09:00 - 18:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 shrink-0">
                  <MapPin className="w-6 h-6 text-brand-500" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Office</h3>
                  <p className="text-slate-400">대구 달성군 구지면 국가산단북로 60길 59</p>
                  <p className="text-slate-500">디에이치웹연구소</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">성함 / 회사명</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">연락처</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">문의 제목</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                  placeholder="앱 개발 견적 문의드립니다."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">문의 내용</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full h-40 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors resize-none"
                  placeholder="만들고 싶은 앱의 기능이나 참고할 사이트 등을 적어주세요."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    전송 준비 중...
                  </>
                ) : (
                  <>
                    메일 보내기
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
              
              <p className="text-center text-xs text-slate-500 mt-4">
                * 버튼을 누르면 PC/모바일의 기본 메일 앱이 실행됩니다.
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;