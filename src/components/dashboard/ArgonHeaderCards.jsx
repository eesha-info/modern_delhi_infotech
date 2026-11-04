import React from 'react';
import { Users, CheckSquare, DollarSign, Clock, BookOpen, Keyboard, Receipt, TrendingUp, Award } from 'lucide-react';

const ArgonHeaderCards = ({ role = 'admin', stats, user }) => {
  // Admin Metric Cards
  const adminCards = [
    {
      title: 'TOTAL STUDENTS',
      value: stats?.totalStudents || 342,
      trend: '+12% Since last month',
      icon: Users
    },
    {
      title: "TODAY'S ATTENDANCE",
      value: '94.8%',
      trend: 'Batchwise Records Active',
      icon: CheckSquare
    },
    {
      title: 'COLLECTED REVENUE',
      value: `₹${(stats?.totalRevenue || 1480000).toLocaleString()}`,
      trend: 'GST Tax Invoiced',
      icon: DollarSign
    },
    {
      title: 'ACTIVE BATCHES',
      value: `${stats?.totalBatches || 6} Batches`,
      trend: '80+ PCs Lab Capacity',
      icon: Clock
    }
  ];

  // Student Metric Cards
  const studentCards = [
    {
      title: 'ENROLLED PROGRAM',
      value: user?.courseCode || 'ADIT',
      trend: `${user?.duration || '12 Months'} Diploma`,
      icon: BookOpen
    },
    {
      title: 'ATTENDANCE RATE',
      value: user?.attendance || '94.2%',
      trend: 'High Attendance Awarded',
      icon: CheckSquare
    },
    {
      title: 'TYPING SPEED',
      value: `${user?.typingSpeed?.english || 42} WPM`,
      trend: `Hindi: ${user?.typingSpeed?.hindi || 34} WPM`,
      icon: Keyboard
    },
    {
      title: 'FEE DUES STATUS',
      value: user?.balanceDues === 0 ? '₹ 0.00' : `₹ ${user?.balanceDues}`,
      trend: user?.paymentStatus || 'FULLY PAID',
      icon: Receipt
    }
  ];

  const cards = role === 'admin' ? adminCards : studentCards;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 hover:shadow-sm transition-shadow flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  {card.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-display">
                  {card.value}
                </h3>
              </div>

              {/* Clean, Unified Argon Primary Icon Container */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white bg-[#5e72e4] shadow-sm shadow-[#5e72e4]/30 flex-shrink-0">
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-50 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>{card.trend}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArgonHeaderCards;
