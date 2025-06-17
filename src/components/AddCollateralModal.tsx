
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bitcoin, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddCollateralModalProps {
  children: React.ReactNode;
  currentCollateral: number;
}

const AddCollateralModal: React.FC<AddCollateralModalProps> = ({ children, currentCollateral }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [btcAmount, setBtcAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock deposit address - in real app this would be generated
  const depositAddress = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
  const btcPrice = 47200; // Mock BTC price

  const handleAmountChange = (value: string) => {
    // Only allow positive numbers with up to 8 decimal places
    const regex = /^\d*\.?\d{0,8}$/;
    if (regex.test(value) || value === '') {
      setBtcAmount(value);
    }
  };

  const calculateUsdValue = (btc: number) => {
    return (btc * btcPrice).toLocaleString();
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(depositAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Address Copied",
        description: "Deposit address copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy address to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleAddCollateral = async () => {
    if (!btcAmount || parseFloat(btcAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid BTC amount",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Adding collateral:', {
      amount: parseFloat(btcAmount),
      usdValue: parseFloat(btcAmount) * btcPrice,
      depositAddress
    });
    
    toast({
      title: "Collateral Addition Initiated",
      description: `Adding ${btcAmount} BTC (~$${calculateUsdValue(parseFloat(btcAmount))}) to your collateral. Transaction will be confirmed once received.`,
    });
    
    setIsProcessing(false);
    setIsOpen(false);
    setBtcAmount('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Bitcoin className="w-5 h-5 mr-2 text-orange-500" />
            Add More Collateral
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Current Collateral Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-sm text-gray-700 mb-2">Current Collateral</h4>
            <p className="text-lg font-bold">€{currentCollateral.toLocaleString()}</p>
            <p className="text-sm text-gray-600">≈ {(currentCollateral / btcPrice).toFixed(6)} BTC</p>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="btcAmount">BTC Amount to Add</Label>
            <Input
              id="btcAmount"
              placeholder="0.00000000"
              value={btcAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="text-right"
            />
            {btcAmount && parseFloat(btcAmount) > 0 && (
              <p className="text-sm text-gray-600 text-right">
                ≈ ${ calculateUsdValue(parseFloat(btcAmount))}
              </p>
            )}
          </div>

          {/* Deposit Address */}
          <div className="space-y-2">
            <Label>Deposit Address</Label>
            <div className="flex items-center space-x-2">
              <Input
                value={depositAddress}
                readOnly
                className="bg-gray-50 font-mono text-xs"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={copyAddress}
                className="flex-shrink-0"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-semibold text-sm text-blue-900 mb-1">Instructions</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Send the specified BTC amount to the address above</li>
              <li>• Collateral will be added once transaction is confirmed</li>
              <li>• This will improve your LTV ratio and reduce liquidation risk</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddCollateral}
              className="flex-1 bg-orange-500 hover:bg-orange-600"
              disabled={isProcessing || !btcAmount || parseFloat(btcAmount) <= 0}
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </div>
              ) : (
                'Add Collateral'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCollateralModal;
