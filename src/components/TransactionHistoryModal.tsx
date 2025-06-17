
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, Bitcoin, DollarSign } from 'lucide-react';

interface TransactionHistoryModalProps {
  children: React.ReactNode;
}

const TransactionHistoryModal: React.FC<TransactionHistoryModalProps> = ({ children }) => {
  // Mock transaction data
  const transactions = [
    {
      id: '1',
      date: '2024-06-15',
      type: 'collateral_deposit',
      amount: '0.735 BTC',
      value: '€73,500',
      status: 'completed',
      description: 'Initial collateral deposit'
    },
    {
      id: '2',
      date: '2024-06-15',
      type: 'loan_disbursement',
      amount: '€50,000',
      value: '€50,000',
      status: 'completed',
      description: 'Loan disbursement to bank account'
    },
    {
      id: '3',
      date: '2024-06-16',
      type: 'interest_accrual',
      amount: '€41.67',
      value: '€41.67',
      status: 'completed',
      description: 'Daily interest charge (3% APR)'
    },
    {
      id: '4',
      date: '2024-06-17',
      type: 'interest_accrual',
      amount: '€41.67',
      value: '€41.67',
      status: 'completed',
      description: 'Daily interest charge (3% APR)'
    },
    {
      id: '5',
      date: '2024-06-17',
      type: 'price_update',
      amount: '0.735 BTC',
      value: '€73,500',
      status: 'completed',
      description: 'Collateral revaluation'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'collateral_deposit':
        return <Bitcoin className="w-4 h-4 text-orange-500" />;
      case 'loan_disbursement':
        return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case 'interest_accrual':
        return <DollarSign className="w-4 h-4 text-red-500" />;
      case 'price_update':
        return <ArrowDownRight className="w-4 h-4 text-blue-500" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatTransactionType = (type: string) => {
    switch (type) {
      case 'collateral_deposit':
        return 'Collateral Deposit';
      case 'loan_disbursement':
        return 'Loan Disbursement';
      case 'interest_accrual':
        return 'Interest Charge';
      case 'price_update':
        return 'Price Update';
      default:
        return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Transaction History</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[500px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTransactionIcon(transaction.type)}
                      <span className="text-sm">
                        {formatTransactionType(transaction.type)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {transaction.amount}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {transaction.value}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(transaction.status)}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {transaction.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionHistoryModal;
