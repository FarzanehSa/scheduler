import { useState } from 'react';

export default function useVisualMode(initMood) {

  const [mode, setMode] = useState(initMood);
  const [history, setHistory] = useState([initMood])

  function transition(newMood, replaceFlag = false) {
    setMode(newMood);
    if (replaceFlag) history.pop();
    setHistory([...history, newMood])
  }
  function back(){
    if (history.length > 1) {
      history.pop();
      const len = history.length;
      setMode(history[len-1])
      setHistory([...history])
    }
  };
  return { mode, transition, back };
}



