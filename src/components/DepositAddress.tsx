
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy, QrCode, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DepositAddressProps {
  loanData: any;
  onComplete: () => void;
  onBack: () => void;
}

const DepositAddress: React.FC<DepositAddressProps> = ({ loanData, onComplete, onBack }) => {
  const [depositAddress] = useState('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh');
  const [isAddressCopied, setIsAddressCopied] = useState(false);
  const [confirmations, setConfirmations] = useState(0);
  const [depositStatus, setDepositStatus] = useState('waiting'); // waiting, pending, confirmed
  const { toast } = useToast();

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(depositAddress);
      setIsAddressCopied(true);
      toast({
        title: "Address Copied",
        description: "Deposit address copied to clipboard",
      });
      setTimeout(() => setIsAddressCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  // Simulate deposit detection and confirmations
  useEffect(() => {
    const timer = setTimeout(() => {
      setDepositStatus('pending');
      setConfirmations(1);
      
      const confirmationTimer = setInterval(() => {
        setConfirmations(prev => {
          if (prev >= 3) {
            clearInterval(confirmationTimer);
            setDepositStatus('confirmed');
            return 3;
          }
          return prev + 1;
        });
      }, 10000); // Simulate 10 seconds per confirmation

      return () => clearInterval(confirmationTimer);
    }, 5000); // Simulate deposit after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleProceedToDashboard = () => {
    onComplete();
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
          <h1 className="text-2xl font-bold text-gray-900">Deposit Collateral</h1>
        </div>

        {/* Loan Summary */}
        <Card className="p-4 bg-white/90 backdrop-blur-sm mb-6">
          <h2 className="font-semibold mb-3">Loan Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Loan Amount:</span>
              <span className="font-semibold">€{loanData?.loanAmount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Required BTC:</span>
              <span className="font-semibold">{loanData?.requiredBtc?.toFixed(6)} BTC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Initial LTV:</span>
              <span className="font-semibold text-green-600">{loanData?.ltv?.toFixed(1)}%</span>
            </div>
          </div>
        </Card>

        {/* Deposit Address */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm mb-6">
          <div className="flex items-center mb-4">
            <QrCode className="w-6 h-6 text-orange-500 mr-2" />
            <h3 className="font-semibold">Your Deposit Address</h3>
          </div>
          
          {/* QR Code Placeholder */}
          <div className="w-48 h-48 bg-gray-200 mx-auto mb-4 rounded-lg flex items-center justify-center">
            <QrCode className="w-16 h-16 text-gray-400" />
          </div>
          
          {/* Address */}
          <div className="bg-gray-100 p-3 rounded-lg mb-4">
            <p className="text-sm font-mono break-all text-center">{depositAddress}</p>
          </div>
          
          <Button 
            onClick={copyAddress}
            variant="outline"
            className="w-full"
          >
            <Copy className="w-4 h-4 mr-2" />
            {isAddressCopied ? 'Copied!' : 'Copy Address'}
          </Button>
        </Card>

        {/* Status */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm mb-6">
          <h3 className="font-semibold mb-4">Deposit Status</h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              {depositStatus === 'waiting' ? (
                <Clock className="w-5 h-5 text-gray-400 mr-3" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              )}
              <div>
                <p className="font-medium">
                  {depositStatus === 'waiting' ? 'Awaiting BTC Deposit' : 'Deposit Detected'}
                </p>
                <p className="text-sm text-gray-600">
                  {depositStatus === 'waiting' 
                    ? 'Send BTC to the address above' 
                    : 'Transaction found on blockchain'
                  }
                </p>
              </div>
            </div>

            {depositStatus !== 'waiting' && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Confirmations</span>
                  <span className="text-sm font-bold text-blue-600">{confirmations}/3</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(confirmations / 3) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  {confirmations < 3 
                    ? 'Waiting for blockchain confirmations...' 
                    : 'Fully confirmed! Fiat disbursement initiated.'
                  }
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Important Notes */}
        <Card className="p-4 bg-yellow-50 border-yellow-200 mb-6">
          <h3 className="font-semibold text-yellow-900 mb-2">Important</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Only send Bitcoin to this address</li>
            <li>• Minimum amount: {loanData?.requiredBtc?.toFixed(6)} BTC</li>
            <li>• Fiat disbursement starts after 3 confirmations</li>
            <li>• Funds will arrive within 24 hours</li>
          </ul>
        </Card>

        {/* Action Button */}
        {depositStatus === 'confirmed' ? (
          <Button 
            onClick={handleProceedToDashboard}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold rounded-xl"
          >
            View Your Active Loan
          </Button>
        ) : (
          <Button 
            disabled
            className="w-full bg-gray-400 text-white py-6 text-lg font-semibold rounded-xl"
          >
            Waiting for BTC Deposit...
          </Button>
        )}
      </div>
    </div>
  );
};

export default DepositAddress;
