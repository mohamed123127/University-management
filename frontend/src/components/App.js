import './App.css';
import LabelStyle1 from './custom controls/labels/LabelStyle1';
import TextBoxStyle1 from './custom controls/textBox/TextBoxStyle1';
import ButtonStyle1 from './custom controls/buttons/ButtonStyle1';
function App() {
  return (
    <div className="App">
        <LabelStyle1 labelText='Name:'/>
        <TextBoxStyle1 />
        <ButtonStyle1 buttonText="Click Here"/>
    </div>
  );
}

export default App;
