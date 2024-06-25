import { useState } from 'react';
import LifeCycle from '@/components/LifeCycle';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  return (
    <div>
      {isMounted && <LifeCycle />}
      {!isMounted && (
        <button
          onClick={() => {
            setIsMounted(true);
          }}
        >
          Mount Life Cycle Component
        </button>
      )}
    </div>
  );
}
