

interface ActivityRingsProps {
  waterGoal: number;
  waterCurrent: number;
  calorieGoal: number;
  calorieCurrent: number;
}

export const ActivityRings: React.FC<ActivityRingsProps> = ({
  waterGoal,
  waterCurrent,
  calorieGoal,
  calorieCurrent,
}) => {
  const radiusWater = 45;
  const radiusCalorie = 65;
  
  const circumferenceWater = 2 * Math.PI * radiusWater;
  const circumferenceCalorie = 2 * Math.PI * radiusCalorie;
  
  // Calculate stroke dashoffset (cap at 100% so it doesn't overlap weirdly for this simple version)
  const waterPercent = Math.min(waterCurrent / (waterGoal || 1), 1);
  const caloriePercent = Math.min(calorieCurrent / (calorieGoal || 1), 1);
  
  const waterOffset = circumferenceWater - waterPercent * circumferenceWater;
  const calorieOffset = circumferenceCalorie - caloriePercent * circumferenceCalorie;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
      <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
        {/* Background Rings */}
        <circle
          cx="90" cy="90" r={radiusCalorie}
          stroke="var(--ring-bg)"
          strokeWidth="14" fill="none"
        />
        <circle
          cx="90" cy="90" r={radiusWater}
          stroke="var(--ring-bg)"
          strokeWidth="14" fill="none"
        />
        
        {/* Calorie Ring */}
        <circle
          cx="90" cy="90" r={radiusCalorie}
          stroke="var(--accent-calorie)"
          strokeWidth="14" fill="none"
          strokeLinecap="round"
          strokeDasharray={circumferenceCalorie}
          strokeDashoffset={calorieOffset}
          style={{ 
            transition: 'stroke-dashoffset 1s cubic-bezier(0.25, 1, 0.5, 1)',
            filter: 'drop-shadow(0 0 8px rgba(50, 215, 75, 0.5))'
          }}
        />
        
        {/* Water Ring */}
        <circle
          cx="90" cy="90" r={radiusWater}
          stroke="var(--accent-water)"
          strokeWidth="14" fill="none"
          strokeLinecap="round"
          strokeDasharray={circumferenceWater}
          strokeDashoffset={waterOffset}
          style={{ 
            transition: 'stroke-dashoffset 1s cubic-bezier(0.25, 1, 0.5, 1)',
            filter: 'drop-shadow(0 0 8px rgba(0, 210, 255, 0.5))'
          }}
        />
      </svg>
    </div>
  );
};
