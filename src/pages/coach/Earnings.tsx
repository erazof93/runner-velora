import { Card } from '@/components/common/Card';

const earnings = [
  { date: 'Oct 1', amount: 70, athlete: 'Atleta 1' },
  { date: 'Oct 3', amount: 140, athlete: 'Atleta 2' },
  { date: 'Oct 5', amount: 70, athlete: 'Atleta 3' },
];

export function Earnings() {
  const total = earnings.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">💰 Mis Ganancias</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <p className="text-slate-100">Total</p>
          <p className="text-3xl font-bold text-success mt-2">${total}</p>
        </Card>
      </div>

      <Card title="Transacciones">
        <div className="space-y-3">
          {earnings.map((e, idx) => (
            <div
              key={idx}
              className="flex justify-between pb-3 border-b border-dark-700 last:border-0"
            >
              <div>
                <p className="font-semibold text-white">{e.athlete}</p>
                <p className="text-xs text-slate-200">{e.date}</p>
              </div>
              <p className="font-bold text-success">+${e.amount}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
