
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bitcoin, Zap, Shield, TrendingUp, ArrowRight, Star } from 'lucide-react';

interface IntroSplashProps {
  onGetStarted: () => void;
}

const IntroSplash: React.FC<IntroSplashProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-md mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-8 pt-16">
          <div className="flex items-center justify-center mb-6 animate-bounce">
            <div className="relative">
              <Bitcoin className="w-20 h-20 text-orange-500" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            BTC Loans
          </h1>
          
          <p className="text-xl text-gray-700 mb-2 font-medium">
            Unlock Instant Liquidity
          </p>
          <p className="text-lg text-gray-600">
            Without Selling Your Bitcoin
          </p>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4 mb-8">
          <Card className="p-5 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mr-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Lightning Fast</h3>
                <p className="text-gray-600">Funds in your account within 24 hours</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Keep Hodling</h3>
                <p className="text-gray-600">No selling, no capital gains tax events</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Ultra Secure</h3>
                <p className="text-gray-600">BitGo institutional-grade custody</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats */}
        <Card className="p-6 bg-gradient-to-r from-orange-500 to-amber-500 border-0 shadow-xl mb-8">
          <div className="grid grid-cols-3 gap-4 text-center text-white">
            <div>
              <p className="text-2xl font-bold">75%</p>
              <p className="text-sm opacity-90">Max LTV</p>
            </div>
            <div>
              <p className="text-2xl font-bold">€10K</p>
              <p className="text-sm opacity-90">Min Loan</p>
            </div>
            <div>
              <p className="text-2xl font-bold">24h</p>
              <p className="text-sm opacity-90">Payout</p>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="space-y-4">
          <Button 
            onClick={onGetStarted}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <p className="text-center text-sm text-gray-500">
            Join thousands of Bitcoin holders worldwide
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-3 opacity-70">
            <div className="text-xs bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full border">🔒 EU Regulated</div>
            <div className="text-xs bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full border">⚡ Instant</div>
            <div className="text-xs bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full border">🛡️ Insured</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSplash;
