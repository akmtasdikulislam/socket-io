import io from "socket.io-client";

const App = () => {
  const socket = io.connect("/");
  return <div></div>;
};

export default App;
