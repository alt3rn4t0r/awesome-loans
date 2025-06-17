
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell, AlertTriangle, Mail, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AlertsModalProps {
  children: React.ReactNode;
  currentLTV: number;
}

const AlertsModal: React.FC<AlertsModalProps> = ({ children, currentLTV }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  
  const [alerts, setAlerts] = useState({
    warningLTV: 75,
    criticalLTV: 85,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true
  });

  const handleSaveAlerts = () => {
    // Here you would typically save to a backend or local storage
    console.log('Saving alerts:', alerts);
    
    toast({
      title: "Alerts Updated",
      description: "Your alert preferences have been saved successfully.",
    });
    
    setIsOpen(false);
  };

  const getLTVStatusColor = (ltv: number) => {
    if (ltv <= 70) return 'text-green-600';
    if (ltv <= 80) return 'text-yellow-600';
    if (ltv <= 85) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2 text-orange-500" />
            Alert Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Current Position</h3>
            <div className="flex items-center justify-between">
              <span>LTV Ratio:</span>
              <span className={`font-bold ${getLTVStatusColor(currentLTV)}`}>
                {currentLTV}%
              </span>
            </div>
          </div>

          {/* LTV Thresholds */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Alert Thresholds
            </h3>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="warning-ltv">Warning Alert (LTV %)</Label>
                <Input
                  id="warning-ltv"
                  type="number"
                  min="50"
                  max="90"
                  value={alerts.warningLTV}
                  onChange={(e) => setAlerts({...alerts, warningLTV: Number(e.target.value)})}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Get notified when LTV reaches this level
                </p>
              </div>
              
              <div>
                <Label htmlFor="critical-ltv">Critical Alert (LTV %)</Label>
                <Input
                  id="critical-ltv"
                  type="number"
                  min="60"
                  max="89"
                  value={alerts.criticalLTV}
                  onChange={(e) => setAlerts({...alerts, criticalLTV: Number(e.target.value)})}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Urgent notification before liquidation risk
                </p>
              </div>
            </div>
          </div>

          {/* Notification Methods */}
          <div className="space-y-4">
            <h3 className="font-semibold">Notification Methods</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  <span>Email Notifications</span>
                </div>
                <Switch
                  checked={alerts.emailNotifications}
                  onCheckedChange={(checked) => setAlerts({...alerts, emailNotifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
                  <span>SMS Notifications</span>
                </div>
                <Switch
                  checked={alerts.smsNotifications}
                  onCheckedChange={(checked) => setAlerts({...alerts, smsNotifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="w-4 h-4 mr-2 text-gray-500" />
                  <span>Push Notifications</span>
                </div>
                <Switch
                  checked={alerts.pushNotifications}
                  onCheckedChange={(checked) => setAlerts({...alerts, pushNotifications: checked})}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveAlerts}
              className="flex-1 bg-orange-500 hover:bg-orange-600"
            >
              Save Alerts
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertsModal;
