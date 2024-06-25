import { useEffect } from 'react';

export default function LifeCycle({ testProp }) {
  // Empty dependency array, on mount
  useEffect(() => {
    alert('Component has mounted ...');
  }, []);

  return <div>Life Cycle Component</div>;
}
