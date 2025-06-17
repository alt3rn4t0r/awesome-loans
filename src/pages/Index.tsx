
import React from 'react';
import { useState } from 'react';
import IntroSplash from '../components/IntroSplash';
import LoanCalculator from '../components/LoanCalculator';
import KYCFlow from '../components/KYCFlow';
import CustodyInfo from '../components/CustodyInfo';
import DepositAddress from '../components/DepositAddress';
import Dashboard from '../components/Dashboard';

const Index = () => {
  const [currentStep, setCurrentStep] = useState('intro');
  const [loanData, setLoanData] = useState(null);
  const [isKYCComplete, setIsKYCComplete] = useState(false);
  const [isLoanApproved, setIsLoanApproved] = useState(false);

  const handleRestart = () => {
    // Reset all state and go back to intro
    setCurrentStep('intro');
    setLoanData(null);
    setIsKYCComplete(false);
    setIsLoanApproved(false);
  };

  const renderCurrentStep = () => {
    // If user has completed KYC and loan is approved, go directly to dashboard
    if (isKYCComplete && isLoanApproved) {
      return (
        <Dashboard 
          loanData={loanData}
          onBack={() => setCurrentStep('intro')}
          onRestart={handleRestart}
        />
      );
    }

    switch (currentStep) {
      case 'intro':
        return (
          <IntroSplash 
            onGetStarted={() => setCurrentStep('calculator')}
          />
        );
      case 'calculator':
        return (
          <LoanCalculator 
            onComplete={(data) => {
              setLoanData(data);
              setCurrentStep('kyc');
            }}
            onBack={() => setCurrentStep('intro')}
          />
        );
      case 'kyc':
        return (
          <KYCFlow 
            onComplete={() => {
              setIsKYCComplete(true);
              setCurrentStep('custody');
            }}
            onBack={() => setCurrentStep('calculator')}
          />
        );
      case 'custody':
        return (
          <CustodyInfo 
            onContinue={() => setCurrentStep('deposit')}
            onBack={() => setCurrentStep('kyc')}
          />
        );
      case 'deposit':
        return (
          <DepositAddress 
            loanData={loanData}
            onComplete={() => {
              setIsLoanApproved(true);
              setCurrentStep('dashboard');
            }}
            onBack={() => setCurrentStep('custody')}
          />
        );
      case 'dashboard':
        return (
          <Dashboard 
            loanData={loanData}
            onBack={() => {
              // Once loan is approved, user shouldn't go back to intro
              if (isLoanApproved) {
                setCurrentStep('dashboard');
              } else {
                setCurrentStep('intro');
              }
            }}
            onRestart={handleRestart}
          />
        );
      default:
        return (
          <IntroSplash 
            onGetStarted={() => setCurrentStep('calculator')}
          />
        );
    }
  };

  return renderCurrentStep();
};

export default Index;
