const { useState, useEffect } = require("react");
const React = require("react");
const { getUsers } = require("repositories/UserRepository");
const { default: UserDataCard } = require("./UserDataCards");

export default function MakeCards() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <ul>
      {users.map((user) => (
        <li>
          <UserDataCard idParam={user.userId} nameParam={user.displayName} />
        </li>
      ))}
    </ul>
  );
}
