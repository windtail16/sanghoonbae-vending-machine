# 자판기 프로젝트
# React + TypeScript + Vite

React와 TypeScript를 사용하여 구현한 음료 자판기 프로젝트입니다.
node v21.6.2
react v19.0.0
ts v5.7.2

## 🚀 기능

### 음료 선택
- 콜라 (1,100원)
- 물 (600원)
- 커피 (700원)
- 각 음료별 재고 관리
- 매진된 음료는 선택 불가

### 결제 수단
- 현금 결제
  - 지원 화폐: 100원, 500원, 1,000원, 5,000원
  - 거스름돈 자동 계산
- 카드 결제

### 지갑 기능
- 초기 금액: 100,000원
- 현금 투입 시 잔액 자동 계산
- 거스름돈 반환 시 잔액에 추가

## 💻 기술 스택

- React
- TypeScript
- CSS
- Vite

## 🏗️ 프로젝트 구조
bash
src/
├── App.tsx # 메인 컴포넌트
├── App.css # 스타일링
├── types.ts # 타입 정의
├── constants.ts # 상수 정의
└── main.tsx # 진입점

## 🔄 상태 관리

typescript
interface VendingMachineState {
  insertedMoney: number; // 투입된 금액
  selectedDrink: Drink | null;// 선택된 음료
  paymentMethod: PaymentMethod | null; // 결제 방법
  purchaseStatus: 'IDLE' | 'PROCESSING' | 'SUCCESS' | 'ERROR'; // 구매 상태
  message: string; // 결과 메시지
  walletAmount: number; // 지갑 잔액
}

## 🚦 프로세스 흐름
1. 음료 선택
2. 결제 방법 선택 (현금/카드)
3. 현금 결제 시
   - 금액 투입
   - 거스름돈 계산
   - 지갑 잔액 업데이트
4. 구매 완료
   - 재고 감소
   - 결과 메시지 표시
   - 상태 초기화 옵션

## 🛠️ 설치 및 실행
bash
프로젝트 클론
git clone https://github.com/windtail16/sanghoonbae-vending-machine.git
의존성 설치
npm install
개발 서버 실행
npm run dev
빌드
npm run build


## 📝 라이선스
MIT License