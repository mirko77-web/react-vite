import Title from "./components/title";
import HelloWorld from "./components/HelloWorld";


const App = () => {
  return (
    <div>
      <Title content="ciao" />
      <p>ciao ciao</p>
      <Title content="ciao mondo" />
      <HelloWorld/>
    </div>
  );
};

export default App;

