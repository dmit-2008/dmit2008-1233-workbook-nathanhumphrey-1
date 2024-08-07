const friends = [
  {
    firstName: 'Jane',
    lastName: 'Doe',
  },
  {
    firstName: 'Clark',
    lastName: 'Kent',
  },
];

export default function FriendList() {
  return (
    <ul>
      {friends.map((friend, idx) => {
        const { firstName, lastName } = friend;
        return (
          <li key={idx}>
            {firstName} {lastName}
          </li>
        );
      })}
    </ul>
  );
}
