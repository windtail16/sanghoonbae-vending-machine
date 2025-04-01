import { useState } from 'react';
import { VendingMachineState, PaymentMethod, Drink } from './types';
import { DRINKS, AVAILABLE_CASH } from './constants';
import './App.css';
import React from 'react';

function App() {
  const [drinks, setDrinks] = useState<Drink[]>(DRINKS);
  const [state, setState] = useState<VendingMachineState>({
    insertedMoney: 0,
    selectedDrink: null,
    paymentMethod: null,
    purchaseStatus: 'IDLE',
    message: '',
    walletAmount: 100000,
  });

  // 음료 선택
  const handleDrinkSelect = (drink: Drink) => {
    if (drink.stock === 0) {
      setState(prev => ({
        ...prev,
        purchaseStatus: 'ERROR',
        message: '해당 음료는 매진되었습니다.'
      }));
      return;
    }
    setState(prev => ({ ...prev, selectedDrink: drink }));
  };

  // 결제 방법 선택
  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setState(prev => ({ ...prev, paymentMethod: method }));
  };

  // 현금 투입
  const handleCashInsert = (amount: number) => {
    if (amount > state.walletAmount) {
      setState(prev => ({
        ...prev,
        purchaseStatus: 'ERROR',
        message: '지갑에 돈이 부족합니다.'
      }));
      return;
    }
    setState(prev => ({
      ...prev,
      insertedMoney: prev.insertedMoney + amount,
      walletAmount: prev.walletAmount - amount
    }));
  };


  // 구매 프로세스
  const handlePurchase = () => {
    if (!state.selectedDrink) {
      setState(prev => ({
        ...prev,
        purchaseStatus: 'ERROR',
        message: '음료를 선택해주세요.'
      }));
      return;
    }

    if (state.paymentMethod === 'CASH') {
      if (state.insertedMoney < state.selectedDrink.price) {
        setState(prev => ({
          ...prev,
          purchaseStatus: 'ERROR',
          message: '금액이 부족합니다.'
        }));
        return;
      }

      const change = state.insertedMoney - state.selectedDrink.price;

      // 재고 감소
      setDrinks(prev => prev.map(drink =>
        drink.id === state.selectedDrink!.id
          ? { ...drink, stock: drink.stock - 1 }
          : drink
      ));

      setState(prev => ({
        ...prev,
        purchaseStatus: 'SUCCESS',
        message: state.selectedDrink ? `${state.selectedDrink.name} 구매 완료!\n거스름돈: ${change}원` : '',
        insertedMoney: 0,
        selectedDrink: null,
        paymentMethod: null,
        walletAmount: prev.walletAmount + change
      }));
    } else if (state.paymentMethod === 'CARD') {
      // 재고 감소
      setDrinks(prev => prev.map(drink =>
        drink.id === state.selectedDrink!.id
          ? { ...drink, stock: drink.stock - 1 }
          : drink
      ));

      setState(prev => ({
        ...prev,
        purchaseStatus: 'SUCCESS',
        message: '카드 결제 완료!',
        selectedDrink: null,
        paymentMethod: null,
      }));
    }
  };

  // 초기화
  const resetState = () => {
    setState(prev => ({
      insertedMoney: 0,
      selectedDrink: null,
      paymentMethod: null,
      purchaseStatus: 'IDLE',
      message: '',
      walletAmount: prev.walletAmount + prev.insertedMoney
    }));
  };

  return (
    <>
      <div className="vending-machine-container">
        {state.purchaseStatus !== 'IDLE' && (
          <div className="reset-button-wrap">
            <button onClick={resetState}>처음으로</button>
          </div>
        )}
        <h1>음료 자판기</h1>
        <div className="vending-machine">
          <div className="drinks-section">
            <h2>음료 선택</h2>
            <div className='drinks-list-container'>
              <div className="drinks-list">
                {drinks.map(drink => (
                  <button
                    key={drink.id}
                    onClick={() => handleDrinkSelect(drink)}
                    className={`
                      ${state.selectedDrink?.id === drink.id ? 'selected' : ''}
                      ${drink.stock === 0 ? 'sold-out' : ''}
                      ${drink.stock > 0 ? 'available' : ''}
                    `}
                    disabled={drink.stock === 0}
                  >
                    {drink.name} ({drink.price}원)
                    <br />
                    {drink.stock === 0 ? '[매진]' : `[재고: ${drink.stock}개]`}
                  </button>
                ))}
              </div>
            </div>
            <div className={`result-section ${state.purchaseStatus.toLowerCase()}`}>
              {state.message && (
                <>
                  <p>{state.message.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < state.message.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}</p>
                </>
              )}
            </div>
            
          </div>
          <div className="payment-section">
            <h2>결제 방법 선택</h2>
            <div className="button-wrap">
              <button 
                onClick={() => handlePaymentMethodSelect('CASH')}
                className={state.paymentMethod === 'CASH' ? 'selected' : ''}
              >
                현금
              </button>
              <button 
                onClick={() => handlePaymentMethodSelect('CARD')}
                className={state.paymentMethod === 'CARD' ? 'selected' : ''}
              >
                카드
              </button>
            </div>
            <div className="cash-section">
              <div className="lcd-display">
                <span>
                투입금액:
                </span>
                <span>
                  {state.insertedMoney}원
                </span>
              </div>
            </div>
            {state.selectedDrink && state.paymentMethod && (
              <div className="purchase-section">
                <button 
                  onClick={handlePurchase}
                  disabled={
                    state.purchaseStatus === 'PROCESSING' || 
                    !state.selectedDrink || 
                    (state.paymentMethod === 'CASH' && state.insertedMoney < state.selectedDrink.price)
                  }
                >
                  구매하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="my-wallet-wrap">
        <h2>지갑</h2>
        <p className="wallet-amount">잔액: {state.walletAmount}원</p>
        {state.paymentMethod === 'CASH' && (
        <div className="button-wrap">
          {AVAILABLE_CASH.map(amount => (
            <button 
              key={amount} 
              onClick={() => handleCashInsert(amount)}
              disabled={amount > state.walletAmount}
            >
              {amount}원
            </button>
          ))}
        </div>
        )}
      </div>
    </>
  );
}

export default App;
