import { useEffect } from 'react';

export default function LifeCycle({ testProp }) {
  // Empty dependency array, on mount
  useEffect(() => {
    alert('Component has mounted ...');
  }, []);

  // Filled dependency array, on mount, on update for testProp changes
  useEffect(() => {
    alert('Component has updated ...');
  }, [testProp]);

  // Return function, on mount, on unmount
  useEffect(() => {
    return () => alert('Component has unmounted');
  }, []);

  return <div>Life Cycle Component</div>;
}
