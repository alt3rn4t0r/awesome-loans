
import React from 'react';
import { useState } from 'react';
import LoanCalculator from '../components/LoanCalculator';
import KYCFlow from '../components/KYCFlow';
import CustodyInfo from '../components/CustodyInfo';
import DepositAddress from '../components/DepositAddress';
import Dashboard from '../components/Dashboard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bitcoin, Shield, Zap, TrendingUp } from 'lucide-react';

const Index = () => {
  const [currentStep, setCurrentStep] = useState('home');
  const [loanData, setLoanData] = useState(null);
  const [isKYCComplete, setIsKYCComplete] = useState(false);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'calculator':
        return (
          <LoanCalculator 
            onComplete={(data) => {
              setLoanData(data);
              setCurrentStep('kyc');
            }}
            onBack={() => setCurrentStep('home')}
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
            onComplete={() => setCurrentStep('dashboard')}
            onBack={() => setCurrentStep('custody')}
          />
        );
      case 'dashboard':
        return (
          <Dashboard 
            loanData={loanData}
            onBack={() => setCurrentStep('home')}
          />
        );
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
            <div className="max-w-md mx-auto">
              {/* Header */}
              <div className="text-center mb-8 pt-8">
                <div className="flex items-center justify-center mb-4">
                  <Bitcoin className="w-12 h-12 text-orange-500 mr-2" />
                  <h1 className="text-3xl font-bold text-gray-900">BTC Loans</h1>
                </div>
                <p className="text-gray-600 text-lg">
                  Unlock cash without selling your Bitcoin
                </p>
              </div>

              {/* Value Props */}
              <div className="space-y-4 mb-8">
                <Card className="p-4 bg-white/80 backdrop-blur-sm">
                  <div className="flex items-center">
                    <Zap className="w-6 h-6 text-orange-500 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Next-Day Cash</h3>
                      <p className="text-sm text-gray-600">Funds within 24 hours</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-white/80 backdrop-blur-sm">
                  <div className="flex items-center">
                    <TrendingUp className="w-6 h-6 text-orange-500 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Keep Your Bitcoin</h3>
                      <p className="text-sm text-gray-600">No selling, no capital gains tax</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-white/80 backdrop-blur-sm">
                  <div className="flex items-center">
                    <Shield className="w-6 h-6 text-orange-500 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Secure Custody</h3>
                      <p className="text-sm text-gray-600">BitGo institutional custody</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <Button 
                  onClick={() => setCurrentStep('calculator')}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-semibold rounded-xl"
                >
                  Get Your Loan Quote
                </Button>
                
                <p className="text-center text-sm text-gray-500">
                  Minimum loan: €10,000 • Maximum LTV: 75%
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 text-center">
                <p className="text-xs text-gray-400 mb-2">Trusted by Bitcoin hodlers worldwide</p>
                <div className="flex justify-center space-x-4 opacity-60">
                  <div className="text-xs bg-gray-200 px-2 py-1 rounded">BitGo Custody</div>
                  <div className="text-xs bg-gray-200 px-2 py-1 rounded">EU Regulated</div>
                  <div className="text-xs bg-gray-200 px-2 py-1 rounded">Proof of Reserves</div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderCurrentStep();
};

export default Index;
