import { Droplets, Flame } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CelebrationModalProps {
  type: 'water' | 'calories' | null;
  onClose: () => void;
}

export const CelebrationModal = ({ type, onClose }: CelebrationModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (type) {
      setIsVisible(true);
      // Auto-dismiss after 3.5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // wait for fade out
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  if (!type || !isVisible) return null;

  const isWater = type === 'water';
  const color = isWater ? 'var(--accent-water)' : 'var(--accent-calorie)';
  const Icon = isWater ? Droplets : Flame;
  const message = isWater ? 'Water Goal Reached!' : 'Calorie Goal Reached!';

  return (
    <div className="celebration-overlay" style={{ opacity: isVisible ? 1 : 0 }}>
      <div className="celebration-modal" onClick={() => setIsVisible(false)}>
        <div style={{
          background: color,
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 15px ${color}`
        }}>
          <Icon size={20} color="#000" />
        </div>
        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>{message}</h3>
      </div>
    </div>
  );
};
