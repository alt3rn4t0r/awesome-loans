import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, AlertTriangle, CreditCard, DollarSign, Bitcoin, RotateCcw, TrendingDown } from 'lucide-react';
import AlertsModal from './AlertsModal';
import TopUpCardModal from './TopUpCardModal';
import AddCollateralModal from './AddCollateralModal';
import TransactionHistoryModal from './TransactionHistoryModal';

interface DashboardProps {
  loanData: any;
  onBack: () => void;
  onRestart?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ loanData, onBack, onRestart }) => {
  const [btcPrice, setBtcPrice] = useState(100000); // Dynamic BTC price
  const [loanBalance] = useState(loanData?.loanAmount || 50000);
  const [btcAmount] = useState(loanData?.requiredBtc || 0.735); // BTC collateral amount
  
  // Calculate dynamic values based on current BTC price
  const [collateralValue, setCollateralValue] = useState(0);
  const [currentLTV, setCurrentLTV] = useState(0);

  // Recalculate when BTC price changes
  useEffect(() => {
    const newCollateralValue = btcAmount * btcPrice;
    const newLTV = (loanBalance / newCollateralValue) * 100;
    
    setCollateralValue(newCollateralValue);
    setCurrentLTV(newLTV);
  }, [btcPrice, btcAmount, loanBalance]);

  const getLTVStatus = (ltv: number) => {
    if (ltv < 70) return { color: 'text-green-600', bg: 'bg-green-100', status: 'Safe' };
    if (ltv < 80) return { color: 'text-yellow-600', bg: 'bg-yellow-100', status: 'Moderate' };
    if (ltv < 85) return { color: 'text-orange-600', bg: 'bg-orange-100', status: 'Warning' };
    return { color: 'text-red-600', bg: 'bg-red-100', status: 'Critical' };
  };

  const ltvStatus = getLTVStatus(currentLTV);

  const handleRestartApplication = () => {
    if (onRestart) {
      onRestart();
    } else {
      onBack(); // Fallback to onBack if onRestart is not provided
    }
  };

  const simulateBitcoinCrash = () => {
    const crashedPrice = btcPrice * 0.95; // 5% drop
    setBtcPrice(crashedPrice);
  };

  const resetBitcoinPrice = () => {
    setBtcPrice(100000); // Reset to 100k EUR
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRestartApplication}
            className="flex items-center"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Restart
          </Button>
          
          <h1 className="text-2xl font-bold text-gray-900">Loan Dashboard</h1>
        </div>

        {/* Bitcoin Crash Simulation */}
        <Card className="p-4 mb-6 bg-red-50 border-red-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-red-900">Market Simulation</h3>
              <p className="text-sm text-red-700">Test your risk exposure</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={simulateBitcoinCrash}
              variant="destructive"
              size="sm"
              className="flex items-center flex-1"
            >
              <TrendingDown className="w-4 h-4 mr-1" />
              Crash -5%
            </Button>
            <Button 
              onClick={resetBitcoinPrice}
              variant="outline"
              size="sm"
              className="flex items-center flex-1"
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              Reset to 100k
            </Button>
          </div>
        </Card>

        {/* LTV Alert */}
        <Card className={`p-4 mb-6 ${ltvStatus.bg} border-2`}>
          <div className="flex items-center">
            <TrendingUp className={`w-6 h-6 mr-3 ${ltvStatus.color}`} />
            <div>
              <h3 className={`font-semibold ${ltvStatus.color}`}>
                Current LTV: {currentLTV.toFixed(1)}% ({ltvStatus.status})
              </h3>
              <p className="text-sm text-gray-700">
                {currentLTV < 80 ? 'Your position is secure' : 'Monitor your position closely'}
              </p>
            </div>
          </div>
        </Card>

        {/* Loan Overview */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Loan Overview</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Loan Balance</p>
                <p className="text-xl font-bold text-gray-900">€{loanBalance.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Collateral Value</p>
                <p className="text-xl font-bold text-gray-900">€{collateralValue.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">BTC Amount</p>
                <p className="text-lg font-semibold">{btcAmount.toFixed(6)} BTC</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">BTC Price</p>
                <p className="text-lg font-semibold">€{btcPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Risk Management */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm mb-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-500 mr-2" />
            <h3 className="font-semibold">Risk Management</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Liquidation Threshold</span>
                <span className="font-semibold text-red-600">90% LTV</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 h-2 rounded-full"
                  style={{ width: `${Math.min((currentLTV / 90) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Buffer: {Math.max(90 - currentLTV, 0).toFixed(1)}% before liquidation
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <AlertsModal currentLTV={currentLTV}>
                <Button variant="outline" size="sm" className="w-full">
                  Set Alerts
                </Button>
              </AlertsModal>
              <TopUpCardModal>
                <Button variant="outline" size="sm" className="w-full">
                  <CreditCard className="w-4 h-4 mr-1" />
                  Top-up Card
                </Button>
              </TopUpCardModal>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm mb-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          
          <div className="space-y-3">
            <AddCollateralModal currentCollateral={collateralValue}>
              <Button className="w-full justify-start" variant="outline">
                <Bitcoin className="w-4 h-4 mr-2" />
                Add More Collateral
              </Button>
            </AddCollateralModal>
            
            <Button className="w-full justify-start" variant="outline">
              <DollarSign className="w-4 h-4 mr-2" />
              Make Repayment
            </Button>
            
            <TransactionHistoryModal>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Transaction History
              </Button>
            </TransactionHistoryModal>
          </div>
        </Card>

        {/* Status Update */}
        <Card className="p-4 bg-green-50 border-green-200">
          <h3 className="font-semibold text-green-900 mb-2">Loan Active</h3>
          <p className="text-sm text-green-700">
            Your fiat disbursement was initiated and will arrive within 24 hours. 
            Interest accrual started upon collateral confirmation.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
