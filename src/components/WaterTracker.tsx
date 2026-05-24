import { useState } from 'react';
import { Droplets, Plus } from 'lucide-react';

interface WaterTrackerProps {
  current: number;
  goal: number;
  onAdd: (amount: number) => void;
  onReset: () => void;
}

export const WaterTracker = ({ current, goal, onAdd, onReset }: WaterTrackerProps) => {
  const [customAmount, setCustomAmount] = useState('');

  const handleCustomAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(customAmount);
    if (!isNaN(amount) && amount > 0) {
      onAdd(amount);
      setCustomAmount('');
    }
  };

  return (
    <div className="apple-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <h3 style={{ color: 'var(--accent-water)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Droplets size={18} /> Water
        </h3>
        <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
          {current} / {goal} ml
        </span>
      </div>
      
      {/* Quick Add Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1rem' }}>
        <button onClick={() => onAdd(250)} style={{ color: 'var(--accent-water)', fontSize: '0.9rem' }}>
          <Plus size={16} style={{ marginRight: '4px' }}/> 250 ml
        </button>
        <button onClick={() => onAdd(500)} style={{ color: 'var(--accent-water)', fontSize: '0.9rem' }}>
          <Plus size={16} style={{ marginRight: '4px' }}/> 500 ml
        </button>
      </div>

      {/* Custom Input */}
      <form onSubmit={handleCustomAdd} style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          type="number" 
          placeholder="Custom ml" 
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
        />
        <button type="submit" style={{ backgroundColor: 'var(--accent-water)', color: 'black', width: 'auto', padding: '0 1.2rem' }}>
          <Plus size={18} />
        </button>
      </form>
      
      {current > 0 && (
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button className="text-button" onClick={onReset}>
            Reset Water
          </button>
        </div>
      )}
    </div>
  );
};
