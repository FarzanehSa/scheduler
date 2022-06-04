import { useState } from 'react';

export default function useVisualMode(initMood) {

  const [mode, setMode] = useState(initMood);
  const [history, setHistory] = useState([initMood]);

  function transition(newMode, replaceFlag = false) {
    setMode(newMode);
    if (!replaceFlag) {
      setHistory( prev => ([...prev, newMode]) );
    } else {
      setHistory( prev => ([...prev.slice(0,-1), newMode]) );
    }

  }
  function back(){
    if (history.length > 1) {
      const newMode = history[history.length-2];
      setHistory( prev => ( [...prev.slice(0,-1)] ));
      setMode(newMode);
    }
  };
  // console.log('👀',history);    // 🚨🚨🚨
  return { mode, transition, back };
}
