import { useState } from 'react';
import LifeCycle from '@/components/LifeCycle';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [update, setUpdate] = useState(false);

  return (
    <div>
      {isMounted && (
        <div>
          <LifeCycle testProp={update} />
          <button
            onClick={() => {
              setUpdate(!update);
            }}
          >
            Update Component
          </button>
          <br />
          <button
            onClick={() => {
              setIsMounted(false);
            }}
          >
            Unmount Component
          </button>
        </div>
      )}
      {!isMounted && (
        <button
          onClick={() => {
            setIsMounted(true);
          }}
        >
          Mount Component
        </button>
      )}
    </div>
  );
}
