
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TopUpCardModalProps {
  children: React.ReactNode;
}

const TopUpCardModal: React.FC<TopUpCardModalProps> = ({ children }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: ''
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/gi, '').substring(0, 4);
    }
    
    setCardData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const validateCard = () => {
    const { cardNumber, expiryDate, cvv, cardholderName } = cardData;
    
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
      return 'Please enter a valid 16-digit card number';
    }
    if (!expiryDate || expiryDate.length < 5) {
      return 'Please enter a valid expiry date (MM/YY)';
    }
    if (!cvv || cvv.length < 3) {
      return 'Please enter a valid CVV';
    }
    if (!cardholderName.trim()) {
      return 'Please enter the cardholder name';
    }
    
    return null;
  };

  const handleAddCard = async () => {
    const error = validateCard();
    if (error) {
      toast({
        title: "Validation Error",
        description: error,
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Adding card:', cardData);
    
    toast({
      title: "Card Added Successfully",
      description: "Your payment card has been securely saved for automatic top-ups.",
    });
    
    setIsProcessing(false);
    setIsOpen(false);
    
    // Reset form
    setCardData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      billingAddress: ''
    });
  };

  const getCardType = (number: string) => {
    const num = number.replace(/\s/g, '');
    if (num.startsWith('4')) return 'Visa';
    if (num.startsWith('5')) return 'Mastercard';
    if (num.startsWith('3')) return 'American Express';
    return 'Credit Card';
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-orange-500" />
            Add Top-up Card
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Card Preview */}
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-4 rounded-lg text-white">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm opacity-80">{getCardType(cardData.cardNumber)}</span>
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="mb-4">
              <p className="text-lg font-mono tracking-wider">
                {cardData.cardNumber || '•••• •••• •••• ••••'}
              </p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-xs opacity-80">VALID THRU</p>
                <p className="text-sm">{cardData.expiryDate || 'MM/YY'}</p>
              </div>
              <div>
                <p className="text-xs opacity-80">CARDHOLDER</p>
                <p className="text-sm">{cardData.cardholderName || 'NAME'}</p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={cardData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  maxLength={4}
                  type="password"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                placeholder="John Doe"
                value={cardData.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="billingAddress">Billing Address (Optional)</Label>
              <Input
                id="billingAddress"
                placeholder="123 Main St, City, Country"
                value={cardData.billingAddress}
                onChange={(e) => handleInputChange('billingAddress', e.target.value)}
              />
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center text-sm text-gray-600">
              <Check className="w-4 h-4 mr-2 text-green-600" />
              Your card details are encrypted and securely stored
            </div>
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
              onClick={handleAddCard}
              className="flex-1 bg-orange-500 hover:bg-orange-600"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </div>
              ) : (
                'Add Card'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopUpCardModal;
