export default function Greeting(props) {
  const displayName = props.name ?? 'Jane Doe';
  return <p>Hello {displayName}, how are you?</p>;
}
