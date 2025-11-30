
import { AppCategory, CategoryDetails, Feature } from './types';
import { ShoppingCart, Rocket, Users, BrainCircuit, Building2, Smartphone, ShieldCheck, Globe, CreditCard, MessageSquare, Film, LayoutTemplate, ClipboardList, MoreHorizontal, Gamepad2 } from 'lucide-react';

export const APP_CATEGORIES: CategoryDetails[] = [
  {
    id: AppCategory.STARTUP,
    label: '스타트업',
    basePrice: 5000000,
    description: '핵심 기능에 집중한 빠른 시장 검증용 MVP 앱',
    iconName: 'Rocket'
  },
  {
    id: AppCategory.HOMEPAGE,
    label: '홈페이지',
    basePrice: 3000000,
    description: '기업 브랜딩, 포트폴리오, 반응형 웹사이트',
    iconName: 'LayoutTemplate'
  },
  {
    id: AppCategory.AI_SERVICE,
    label: 'AI생성서비스',
    basePrice: 12000000,
    description: 'ChatGPT, 이미지 생성 등 AI 모델 연동 서비스',
    iconName: 'BrainCircuit'
  },
  {
    id: AppCategory.ECOMMERCE,
    label: '이커머스',
    basePrice: 8000000,
    description: '쇼핑몰, 결제, 배송, 상품 관리 시스템',
    iconName: 'ShoppingCart'
  },
  {
    id: AppCategory.SOCIAL,
    label: '소셜커뮤니티',
    basePrice: 10000000,
    description: 'SNS, 채팅, 게시판, 커뮤니티 플랫폼',
    iconName: 'Users'
  },
  {
    id: AppCategory.GAME,
    label: '게임',
    basePrice: 15000000,
    description: '캐주얼 게임, 인터랙티브 컨텐츠, 게이미피케이션',
    iconName: 'Gamepad2'
  },
  {
    id: AppCategory.ETC,
    label: '기타',
    basePrice: 5000000,
    description: '유틸리티, 도구, 기타 맞춤형 기능 개발',
    iconName: 'MoreHorizontal'
  }
];

export const AVAILABLE_FEATURES: Feature[] = [
  {
    id: 'auth',
    name: '고급 인증 시스템',
    description: '소셜 로그인 (Kakao, Google, Apple) 및 생체 인증',
    baseCost: 1500000,
    icon: 'ShieldCheck'
  },
  {
    id: 'payment',
    name: '결제 시스템 연동',
    description: 'PG사 연동, 정기 결제 및 인앱 결제 구현',
    baseCost: 2000000,
    icon: 'CreditCard'
  },
  {
    id: 'chat',
    name: '실시간 채팅/상담',
    description: 'WebSocket 기반 실시간 메시징 및 파일 전송',
    baseCost: 3000000,
    icon: 'MessageSquare'
  },
  {
    id: 'admin',
    name: '관리자 대시보드',
    description: '데이터 시각화, 유저 관리, 컨텐츠 CMS',
    baseCost: 2500000,
    icon: 'Globe'
  },
  {
    id: 'ai_bot',
    name: 'AI 챗봇 에이전트',
    description: '고객 응대 및 자동화 처리를 위한 맞춤형 AI',
    baseCost: 4000000,
    icon: 'BrainCircuit'
  },
  {
    id: 'push',
    name: '푸시 알림 서버',
    description: '마케팅 및 트랜잭션 알림 자동화 시스템',
    baseCost: 1000000,
    icon: 'Smartphone'
  }
];

// Helper to map icon names to components if needed dynamically
export const getIcon = (name: string, props: any) => {
    switch(name) {
        case 'Rocket': return <Rocket {...props} />;
        case 'BrainCircuit': return <BrainCircuit {...props} />;
        case 'ShoppingCart': return <ShoppingCart {...props} />;
        case 'Users': return <Users {...props} />;
        case 'Building2': return <Building2 {...props} />;
        case 'ShieldCheck': return <ShieldCheck {...props} />;
        case 'CreditCard': return <CreditCard {...props} />;
        case 'MessageSquare': return <MessageSquare {...props} />;
        case 'Globe': return <Globe {...props} />;
        case 'Smartphone': return <Smartphone {...props} />;
        case 'Film': return <Film {...props} />;
        case 'LayoutTemplate': return <LayoutTemplate {...props} />;
        case 'ClipboardList': return <ClipboardList {...props} />;
        case 'MoreHorizontal': return <MoreHorizontal {...props} />;
        case 'Gamepad2': return <Gamepad2 {...props} />;
        default: return <Rocket {...props} />;
    }
}