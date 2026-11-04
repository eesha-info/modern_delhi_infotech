import React from 'react';
import { Users, CheckSquare, DollarSign, Clock, BookOpen, Keyboard, Receipt, TrendingUp, Award } from 'lucide-react';

const ArgonHeaderCards = ({ role = 'admin', stats, user }) => {
  // Admin Metric Cards
  const adminCards = [
    {
      title: 'TOTAL STUDENTS',
      value: stats?.totalStudents || 342,
      trend: '+12% Since last month',
      trendColor: 'text-emerald-500',
      icon: Users,
      iconColor: 'bg-gradient-to-tr from-rose-500 to-pink-600 shadow-rose-500/30'
    },
    {
      title: "TODAY'S ATTENDANCE",
      value: '94.8%',
      trend: 'Batchwise Records Active',
      trendColor: 'text-emerald-500',
      icon: CheckSquare,
      iconColor: 'bg-gradient-to-tr from-emerald-500 to-teal-600 shadow-emerald-500/30'
    },
    {
      title: 'COLLECTED REVENUE',
      value: `₹${(stats?.totalRevenue || 1480000).toLocaleString()}`,
      trend: 'GST Tax Invoiced',
      trendColor: 'text-blue-500',
      icon: DollarSign,
      iconColor: 'bg-gradient-to-tr from-amber-500 to-yellow-600 shadow-amber-500/30'
    },
    {
      title: 'ACTIVE BATCHES',
      value: `${stats?.totalBatches || 6} Batches`,
      trend: '80+ PCs Lab Capacity',
      trendColor: 'text-emerald-500',
      icon: Clock,
      iconColor: 'bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-blue-500/30'
    }
  ];

  // Student Metric Cards
  const studentCards = [
    {
      title: 'ENROLLED PROGRAM',
      value: user?.courseCode || 'ADIT',
      trend: `${user?.duration || '12 Months'} Diploma`,
      trendColor: 'text-blue-500',
      icon: BookOpen,
      iconColor: 'bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-blue-500/30'
    },
    {
      title: 'ATTENDANCE RATE',
      value: user?.attendance || '94.2%',
      trend: 'High Attendance Awarded',
      trendColor: 'text-emerald-500',
      icon: CheckSquare,
      iconColor: 'bg-gradient-to-tr from-emerald-500 to-teal-600 shadow-emerald-500/30'
    },
    {
      title: 'TYPING SPEED',
      value: `${user?.typingSpeed?.english || 42} WPM`,
      trend: `Hindi: ${user?.typingSpeed?.hindi || 34} WPM`,
      trendColor: 'text-amber-500',
      icon: Keyboard,
      iconColor: 'bg-gradient-to-tr from-amber-500 to-yellow-600 shadow-amber-500/30'
    },
    {
      title: 'FEE DUES STATUS',
      value: user?.balanceDues === 0 ? '₹ 0.00' : `₹ ${user?.balanceDues}`,
      trend: user?.paymentStatus || 'FULLY PAID',
      trendColor: user?.balanceDues === 0 ? 'text-emerald-500' : 'text-amber-500',
      icon: Receipt,
      iconColor: 'bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-purple-500/30'
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
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  {card.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-display">
                  {card.value}
                </h3>
              </div>

              {/* Signature Argon Colored Circular Shadow Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0 ${
                  card.iconColor
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-50 flex items-center gap-1.5 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span className={card.trendColor}>{card.trend}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArgonHeaderCards;
