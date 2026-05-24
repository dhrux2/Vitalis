import { useState, useEffect } from 'react';
import { ActivityRings } from './components/ActivityRings';
import { WaterTracker } from './components/WaterTracker';
import { CalorieTracker } from './components/CalorieTracker';
import { Onboarding } from './components/Onboarding';
import { CelebrationModal } from './components/CelebrationModal';
import { Settings2, Activity } from 'lucide-react';
import { playWaterSound, playCalorieSound, playSuccessSound } from './utils/audio';

function App() {
  const [needsOnboarding, setNeedsOnboarding] = useState(true);
  const [waterGoal, setWaterGoal] = useState(2500);
  const [calorieGoal, setCalorieGoal] = useState(2000);
  
  const [water, setWater] = useState(0);
  const [calories, setCalories] = useState(0);

  // Celebration state
  const [celebrationType, setCelebrationType] = useState<'water' | 'calories' | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const savedWaterGoal = localStorage.getItem('vitalis_waterGoal');
    const savedCalorieGoal = localStorage.getItem('vitalis_calorieGoal');
    
    if (savedWaterGoal && savedCalorieGoal) {
      setWaterGoal(parseInt(savedWaterGoal));
      setCalorieGoal(parseInt(savedCalorieGoal));
      setNeedsOnboarding(false);
    }

    const savedWater = localStorage.getItem('vitalis_water');
    const savedCalories = localStorage.getItem('vitalis_calories');
    
    if (savedWater) setWater(parseInt(savedWater));
    if (savedCalories) setCalories(parseInt(savedCalories));
  }, []);

  // Save progress to local storage on change
  useEffect(() => {
    if (!needsOnboarding) {
      localStorage.setItem('vitalis_water', water.toString());
      localStorage.setItem('vitalis_calories', calories.toString());
      localStorage.setItem('vitalis_waterGoal', waterGoal.toString());
      localStorage.setItem('vitalis_calorieGoal', calorieGoal.toString());
    }
  }, [water, calories, waterGoal, calorieGoal, needsOnboarding]);

  const handleCompleteOnboarding = (wGoal: number, cGoal: number) => {
    setWaterGoal(wGoal);
    setCalorieGoal(cGoal);
    setNeedsOnboarding(false);
  };

  const handleEditGoals = () => {
    setNeedsOnboarding(true);
  };

  const handleAddWater = (amount: number) => {
    const newWater = water + amount;
    setWater(newWater);
    
    // Check for celebration
    const hasCelebrated = localStorage.getItem('vitalis_water_celebrated') === 'true';
    if (newWater >= waterGoal && !hasCelebrated) {
      setCelebrationType('water');
      localStorage.setItem('vitalis_water_celebrated', 'true');
      playSuccessSound();
    } else {
      playWaterSound();
    }
  };

  const handleAddCalories = (amount: number) => {
    const newCalories = calories + amount;
    setCalories(newCalories);

    // Check for celebration
    const hasCelebrated = localStorage.getItem('vitalis_calorie_celebrated') === 'true';
    if (newCalories >= calorieGoal && !hasCelebrated) {
      setCelebrationType('calories');
      localStorage.setItem('vitalis_calorie_celebrated', 'true');
      playSuccessSound();
    } else {
      playCalorieSound();
    }
  };

  const handleResetWater = () => {
    setWater(0);
    localStorage.removeItem('vitalis_water_celebrated');
  };

  const handleResetCalories = () => {
    setCalories(0);
    localStorage.removeItem('vitalis_calorie_celebrated');
  };

  if (needsOnboarding) {
    return <Onboarding onComplete={handleCompleteOnboarding} />;
  }

  return (
    <div>
      {/* App Header with App Name */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <Activity size={28} color="var(--accent-water)" />
        <h1 style={{ fontSize: '2.2rem', letterSpacing: '-1px' }}>Vitalis</h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.4rem' }}>Summary</h2>
        <button className="text-button" onClick={handleEditGoals} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Settings2 size={16} /> Edit Goals
        </button>
      </div>

      <ActivityRings 
        waterGoal={waterGoal} 
        waterCurrent={water}
        calorieGoal={calorieGoal}
        calorieCurrent={calories}
      />

      <div style={{ marginTop: '2.5rem' }}>
        <WaterTracker 
          current={water} 
          goal={waterGoal} 
          onAdd={handleAddWater} 
          onReset={handleResetWater}
        />
        
        <CalorieTracker 
          current={calories} 
          goal={calorieGoal} 
          onAdd={handleAddCalories} 
          onReset={handleResetCalories}
        />
      </div>

      <CelebrationModal 
        type={celebrationType} 
        onClose={() => setCelebrationType(null)} 
      />

      <div style={{ textAlign: 'center', marginTop: '3rem', opacity: 0.5, fontSize: '0.85rem' }}>
        Designed by <a href="https://dhruvlabs.xyz" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>Dhruv Labs</a>
      </div>
    </div>
  );
}

export default App;
