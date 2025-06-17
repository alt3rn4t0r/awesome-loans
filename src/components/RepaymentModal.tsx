
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { DollarSign, CreditCard } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface RepaymentModalProps {
  children: React.ReactNode;
  currentBalance: number;
}

const RepaymentModal: React.FC<RepaymentModalProps> = ({ children, currentBalance }) => {
  const [repaymentAmount, setRepaymentAmount] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleRepayment = () => {
    const amount = parseFloat(repaymentAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid repayment amount.",
        variant: "destructive",
      });
      return;
    }

    if (amount > currentBalance) {
      toast({
        title: "Amount Too High",
        description: "Repayment amount cannot exceed the remaining balance.",
        variant: "destructive",
      });
      return;
    }

    // Simulate repayment processing
    toast({
      title: "Repayment Initiated",
      description: `€${amount.toLocaleString()} repayment has been processed successfully.`,
    });

    setRepaymentAmount('');
    setIsOpen(false);
  };

  const remainingBalance = currentBalance;
  const maxRepayment = remainingBalance;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Make Repayment
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Balance Info */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-blue-700">Current Balance</p>
                <p className="text-xl font-bold text-blue-900">€{remainingBalance.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          {/* Repayment Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="repayment-amount">Repayment Amount (€)</Label>
            <Input
              id="repayment-amount"
              type="number"
              placeholder="Enter amount to repay"
              value={repaymentAmount}
              onChange={(e) => setRepaymentAmount(e.target.value)}
              min="0"
              max={maxRepayment}
              step="0.01"
            />
            <p className="text-sm text-gray-600">
              Maximum repayment: €{maxRepayment.toLocaleString()}
            </p>
          </div>

          {/* Quick Amount Buttons */}
          <div className="space-y-2">
            <Label>Quick Select</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRepaymentAmount((remainingBalance * 0.25).toFixed(2))}
              >
                25%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRepaymentAmount((remainingBalance * 0.5).toFixed(2))}
              >
                50%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRepaymentAmount(remainingBalance.toString())}
              >
                Full
              </Button>
            </div>
          </div>

          {/* Repayment Button */}
          <Button 
            onClick={handleRepayment}
            className="w-full"
            disabled={!repaymentAmount || parseFloat(repaymentAmount) <= 0}
          >
            Process Repayment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RepaymentModal;
