import ComponentWrapper from './components/ComponentWrapper';
import FriendList from './components/FriendList';
import Greeting from './components/Greeting';
import Hello from './components/Hello';

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <ComponentWrapper>
        <Hello />
        <Greeting />
        <Greeting name="Nate" />
      </ComponentWrapper>

      <h2>Friend List</h2>
      <FriendList />
    </main>
  );
}
