
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, AlertTriangle, Calculator } from 'lucide-react';

interface LoanCalculatorProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onComplete, onBack }) => {
  const [loanAmount, setLoanAmount] = useState('');
  const [btcPrice] = useState(100000); // Mock BTC price in EUR
  const [requiredBtc, setRequiredBtc] = useState(0);
  const [ltv, setLtv] = useState(0);
  const [isValidAmount, setIsValidAmount] = useState(false);

  useEffect(() => {
    const amount = parseFloat(loanAmount) || 0;
    if (amount >= 10000) {
      // Calculate required BTC at 75% LTV
      const collateralValue = amount / 0.75;
      const btcRequired = collateralValue / btcPrice;
      const calculatedLtv = (amount / (btcRequired * btcPrice)) * 100;
      
      setRequiredBtc(btcRequired);
      setLtv(calculatedLtv);
      setIsValidAmount(calculatedLtv <= 75);
    } else {
      setRequiredBtc(0);
      setLtv(0);
      setIsValidAmount(false);
    }
  }, [loanAmount, btcPrice]);

  const handleContinue = () => {
    if (isValidAmount) {
      onComplete({
        loanAmount: parseFloat(loanAmount),
        requiredBtc,
        ltv,
        btcPrice
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6 pt-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="mr-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Loan Calculator</h1>
        </div>

        {/* Calculator Card */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm mb-6">
          <div className="flex items-center mb-4">
            <Calculator className="w-6 h-6 text-orange-500 mr-2" />
            <h2 className="text-lg font-semibold">Loan Details</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desired Loan Amount (EUR)
              </label>
              <Input
                type="number"
                placeholder="10,000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className={`text-lg ${parseFloat(loanAmount) < 10000 && loanAmount ? 'border-red-500' : ''}`}
              />
              {parseFloat(loanAmount) < 10000 && loanAmount && (
                <p className="text-red-500 text-sm mt-1">Minimum loan amount is €10,000</p>
              )}
            </div>

            {requiredBtc > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Required BTC Collateral:</span>
                  <span className="font-semibold">{requiredBtc.toFixed(6)} BTC</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">BTC Price:</span>
                  <span className="font-semibold">€{btcPrice.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan-to-Value (LTV):</span>
                  <span className={`font-semibold ${ltv > 75 ? 'text-red-500' : 'text-green-600'}`}>
                    {ltv.toFixed(1)}%
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-semibold">8.5% APR</span>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Risk Warning */}
        <Card className="p-4 bg-red-50 border-red-200 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Liquidation Risk</h3>
              <p className="text-sm text-red-700">
                Your BTC collateral will be <strong>force-liquidated at 90% LTV</strong>. 
                You can set margin-call alerts later to manage this risk.
              </p>
            </div>
          </div>
        </Card>

        {/* Continue Button */}
        <Button 
          onClick={handleContinue}
          disabled={!isValidAmount}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-semibold rounded-xl disabled:opacity-50"
        >
          Continue to KYC Verification
        </Button>

        <p className="text-center text-xs text-gray-500 mt-4">
          * Calculations are indicative and subject to real-time market conditions
        </p>
      </div>
    </div>
  );
};

export default LoanCalculator;
