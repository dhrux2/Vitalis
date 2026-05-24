import { useState } from 'react';
import { Flame, Plus } from 'lucide-react';

interface CalorieTrackerProps {
  current: number;
  goal: number;
  onAdd: (amount: number) => void;
  onReset: () => void;
}

export const CalorieTracker = ({ current, goal, onAdd, onReset }: CalorieTrackerProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(inputValue);
    if (!isNaN(amount) && amount > 0) {
      onAdd(amount);
      setInputValue('');
    }
  };

  return (
    <div className="apple-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <h3 style={{ color: 'var(--accent-calorie)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Flame size={18} /> Calories
        </h3>
        <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
          {current} / {goal} kcal
        </span>
      </div>
      
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          type="number" 
          placeholder="Add kcal" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" style={{ backgroundColor: 'var(--accent-calorie)', color: 'white', width: 'auto', padding: '0 1.2rem' }}>
          <Plus size={18} />
        </button>
      </form>

      {current > 0 && (
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button className="text-button" onClick={onReset}>
            Reset Calories
          </button>
        </div>
      )}
    </div>
  );
};
