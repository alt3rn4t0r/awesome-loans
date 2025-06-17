
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Eye, ExternalLink, CheckCircle } from 'lucide-react';

interface CustodyInfoProps {
  onContinue: () => void;
  onBack: () => void;
}

const CustodyInfo: React.FC<CustodyInfoProps> = ({ onContinue, onBack }) => {
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
          <h1 className="text-2xl font-bold text-gray-900">Custody Information</h1>
        </div>

        {/* BitGo Info */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm mb-6">
          <div className="flex items-center mb-4">
            <Shield className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h2 className="text-lg font-semibold">BitGo Custody</h2>
              <p className="text-sm text-gray-600">Institutional-grade security</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Your Collateral Security</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                  2-of-3 multisig protection
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                  Cold storage for maximum security
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                  $100M insurance coverage
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                  SOC 2 Type II certified
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Custodian Details</h3>
              <div className="text-sm space-y-1">
                <p><strong>Entity:</strong> BitGo Trust Company</p>
                <p><strong>License:</strong> New York State Banking License</p>
                <p><strong>Regulated by:</strong> NYDFS</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Proof of Reserves */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm mb-6">
          <div className="flex items-center mb-4">
            <Eye className="w-6 h-6 text-orange-500 mr-2" />
            <h3 className="font-semibold">Proof of Reserves</h3>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Verify that all customer funds are fully backed by checking our public proof of reserves.
          </p>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.open('https://proof-of-reserves.bitgo.com', '_blank')}
          >
            View Proof of Reserves
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </Card>

        {/* Transparency Promise */}
        <Card className="p-4 bg-green-50 border-green-200 mb-6">
          <h3 className="font-semibold text-green-900 mb-2">Our Transparency Promise</h3>
          <p className="text-sm text-green-700">
            You will receive a unique deposit address and can track your Bitcoin in real-time 
            on the blockchain. We never rehypothecate or lend out your collateral.
          </p>
        </Card>

        {/* Continue Button */}
        <Button 
          onClick={onContinue}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-semibold rounded-xl"
        >
          Proceed to Deposit Address
        </Button>

        <p className="text-center text-xs text-gray-500 mt-4">
          Your Bitcoin will be held securely until loan repayment or liquidation
        </p>
      </div>
    </div>
  );
};

export default CustodyInfo;
