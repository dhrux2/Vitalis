// Audio engine using Web Audio API for procedural sound effects

let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playWaterSound = () => {
  const ctx = initAudio();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  // Create a "bloop" liquid sound
  osc.type = 'sine';
  
  // Pitch drops rapidly to simulate a water drop
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);

  // Volume peaks instantly then fades quickly
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.2);
};

export const playCalorieSound = () => {
  const ctx = initAudio();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  // A very soft, satisfying "tick"
  osc.type = 'triangle';
  
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.08);
};

export const playSuccessSound = () => {
  const ctx = initAudio();
  
  // Create a bright, chime-like chord
  const playTone = (freq: number, startTime: number) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime + startTime);
    gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + startTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + 0.5);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + 0.5);
  };

  // Play a major arpeggio very quickly
  playTone(523.25, 0);      // C5
  playTone(659.25, 0.08);   // E5
  playTone(783.99, 0.16);   // G5
  playTone(1046.50, 0.24);  // C6
};
