import { useState } from 'react';
import { Activity } from 'lucide-react';

interface OnboardingProps {
  onComplete: (waterGoal: number, calorieGoal: number) => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [water, setWater] = useState('2500');
  const [calories, setCalories] = useState('2000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseInt(water);
    const c = parseInt(calories);
    if (!isNaN(w) && !isNaN(c) && w > 0 && c > 0) {
      onComplete(w, c);
    }
  };

  return (
    <div className="onboarding-container">
      {/* App Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <Activity size={32} color="var(--accent-water)" />
        <h1 style={{ fontSize: '2.5rem', letterSpacing: '-1px' }}>Vitalis</h1>
      </div>

      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', textAlign: 'center', fontSize: '1.1rem' }}>
        Let's set up your daily goals.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="apple-card">
          <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--accent-water)', fontWeight: 600 }}>
            Daily Water Goal (ml)
          </label>
          <input 
            type="number" 
            value={water} 
            onChange={(e) => setWater(e.target.value)} 
          />
        </div>

        <div className="apple-card" style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--accent-calorie)', fontWeight: 600 }}>
            Daily Calorie Goal (kcal)
          </label>
          <input 
            type="number" 
            value={calories} 
            onChange={(e) => setCalories(e.target.value)} 
          />
        </div>

        <button 
          type="submit" 
          style={{ width: '100%', marginTop: '2rem', backgroundColor: 'var(--accent-blue)', color: 'white', padding: '1.2rem', borderRadius: '16px', fontSize: '1.1rem' }}>
          Get Started
        </button>
      </form>
    </div>
  );
};
