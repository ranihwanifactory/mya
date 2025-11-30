
import { AppCategory, CategoryDetails, Feature } from './types';
import { ShoppingCart, Rocket, Users, BrainCircuit, Building2, Smartphone, ShieldCheck, Globe, CreditCard, MessageSquare, Film, LayoutTemplate, ClipboardList, MoreHorizontal } from 'lucide-react';

export const APP_CATEGORIES: CategoryDetails[] = [
  {
    id: AppCategory.MVP,
    label: 'MVP 스타트업',
    basePrice: 5000000, // KRW
    description: '핵심 기능에 집중한 빠른 시장 검증용 앱',
    iconName: 'Rocket'
  },
  {
    id: AppCategory.HOMEPAGE,
    label: '홈페이지',
    basePrice: 3000000,
    description: '기업 브랜딩, 포트폴리오, 랜딩 페이지 제작',
    iconName: 'LayoutTemplate'
  },
  {
    id: AppCategory.AI_TOOL,
    label: 'AI 서비스',
    basePrice: 12000000,
    description: 'LLM 및 생성형 AI 모델이 통합된 지능형 서비스',
    iconName: 'BrainCircuit'
  },
  {
    id: AppCategory.ECOMMERCE,
    label: '이커머스',
    basePrice: 8000000,
    description: '상품 관리, 결제, 배송 추적이 포함된 쇼핑몰',
    iconName: 'ShoppingCart'
  },
  {
    id: AppCategory.ORDER_SYSTEM,
    label: '주문 시스템',
    basePrice: 10000000,
    description: '키오스크, 테이블 오더, 예약/웨이팅 관리',
    iconName: 'ClipboardList'
  },
  {
    id: AppCategory.SOCIAL,
    label: '커뮤니티',
    basePrice: 10000000,
    description: '실시간 채팅, 피드, 유저 인터랙션 플랫폼',
    iconName: 'Users'
  },
  {
    id: AppCategory.ENTERTAINMENT,
    label: '엔터테인먼트',
    basePrice: 15000000,
    description: '동영상 스트리밍, 웹툰, 게임, 팬덤 플랫폼',
    iconName: 'Film'
  },
  {
    id: AppCategory.ENTERPRISE,
    label: '엔터프라이즈',
    basePrice: 20000000,
    description: '사내 업무 효율화 및 대규모 데이터 관리 시스템',
    iconName: 'Building2'
  },
  {
    id: AppCategory.UTILITY,
    label: '기타 기능 앱',
    basePrice: 5000000,
    description: '계산기, 날씨, 일정 등 특정 유틸리티 기능 구현',
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

// Helper to map icon names to components if needed dynamically, 
// though direct usage in component mapping is often cleaner.
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
        default: return <Rocket {...props} />;
    }
}