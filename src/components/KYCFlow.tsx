
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Shield, Camera, FileText, CheckCircle } from 'lucide-react';

interface KYCFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

const KYCFlow: React.FC<KYCFlowProps> = ({ onComplete, onBack }) => {
  const [currentKYCStep, setCurrentKYCStep] = useState('personal');
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: ''
  });

  const handlePersonalInfoSubmit = () => {
    setCurrentKYCStep('documents');
  };

  const handleDocumentUpload = () => {
    setCurrentKYCStep('liveness');
  };

  const handleLivenessCheck = () => {
    setCurrentKYCStep('complete');
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const renderKYCStep = () => {
    switch (currentKYCStep) {
      case 'personal':
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-orange-500 mr-2" />
              <h2 className="text-lg font-semibold">Personal Information</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="First Name"
                value={personalInfo.firstName}
                onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
              />
              <Input
                placeholder="Last Name"
                value={personalInfo.lastName}
                onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
              />
            </div>
            
            <Input
              type="email"
              placeholder="Email Address"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
            />
            
            <Input
              type="tel"
              placeholder="Phone Number"
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
            />
            
            <Input
              type="date"
              placeholder="Date of Birth"
              value={personalInfo.dateOfBirth}
              onChange={(e) => setPersonalInfo({...personalInfo, dateOfBirth: e.target.value})}
            />
            
            <Input
              placeholder="Nationality"
              value={personalInfo.nationality}
              onChange={(e) => setPersonalInfo({...personalInfo, nationality: e.target.value})}
            />
            
            <Button 
              onClick={handlePersonalInfoSubmit}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
              disabled={!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email}
            >
              Continue to Document Upload
            </Button>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-orange-500 mr-2" />
              <h2 className="text-lg font-semibold">Document Verification</h2>
            </div>
            
            <div className="text-center py-8">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Upload Your ID Document</h3>
              <p className="text-gray-600 text-sm mb-4">
                Please provide a clear photo of your passport or driver's license
              </p>
              
              <Button 
                onClick={handleDocumentUpload}
                variant="outline"
                className="w-full mb-2"
              >
                Take Photo / Upload Document
              </Button>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Privacy Notice:</strong> Your documents are processed securely by our KYC partner 
                and are only used for identity verification purposes.
              </p>
            </div>
          </div>
        );

      case 'liveness':
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <Camera className="w-6 h-6 text-orange-500 mr-2" />
              <h2 className="text-lg font-semibold">Liveness Check</h2>
            </div>
            
            <div className="text-center py-8">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="font-semibold mb-2">Verify It's Really You</h3>
              <p className="text-gray-600 text-sm mb-4">
                Please position your face in the circle and follow the instructions
              </p>
              
              <Button 
                onClick={handleLivenessCheck}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
              >
                Start Liveness Check
              </Button>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-green-700 mb-2">Verification Complete!</h2>
            <p className="text-gray-600">
              Your identity has been successfully verified. Proceeding to custody information...
            </p>
          </div>
        );

      default:
        return null;
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
          <h1 className="text-2xl font-bold text-gray-900">KYC Verification</h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Personal Info</span>
            <span>Documents</span>
            <span>Liveness</span>
            <span>Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: currentKYCStep === 'personal' ? '25%' : 
                       currentKYCStep === 'documents' ? '50%' : 
                       currentKYCStep === 'liveness' ? '75%' : '100%'
              }}
            />
          </div>
        </div>

        {/* KYC Form */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm">
          {renderKYCStep()}
        </Card>

        {/* Trust Indicators */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 mb-2">Secure verification powered by Sumsub</p>
          <div className="flex justify-center space-x-2">
            <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">256-bit SSL</div>
            <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">GDPR Compliant</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCFlow;
