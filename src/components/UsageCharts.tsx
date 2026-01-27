"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

const weeklyData = [
  { name: 'Mon', audio: 4000, visual: 2400 },
  { name: 'Tue', audio: 3000, visual: 1398 },
  { name: 'Wed', audio: 2000, visual: 9800 },
  { name: 'Thu', audio: 2780, visual: 3908 },
  { name: 'Fri', audio: 1890, visual: 4800 },
  { name: 'Sat', audio: 2390, visual: 3800 },
  { name: 'Sun', audio: 3490, visual: 4300 },
];

const monthlyData = [
    { name: 'Jan', tokens: 120000 },
    { name: 'Feb', tokens: 210000 },
    { name: 'Mar', tokens: 150000 },
    { name: 'Apr', tokens: 280000 },
    { name: 'May', tokens: 200000 },
    { name: 'Jun', tokens: 350000 },
];

export default function UsageCharts() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-bold mb-4">Weekly Usage (Tokens)</h3>
        <div className="w-full h-96 glass-card p-4">
          <ResponsiveContainer>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30, 30, 30, 0.8)',
                  borderColor: '#555'
                }}
              />
              <Legend />
              <Bar dataKey="audio" stackId="a" fill="#8884d8" />
              <Bar dataKey="visual" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Monthly Usage (Tokens)</h3>
        <div className="w-full h-96 glass-card p-4">
          <ResponsiveContainer>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30, 30, 30, 0.8)',
                  borderColor: '#555'
                }}
              />
              <Area type="monotone" dataKey="tokens" stroke="#A855F7" fill="#A855F7" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
