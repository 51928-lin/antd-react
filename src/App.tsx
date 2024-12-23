import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/button';
function App() {
  return (
    <div className="App">
      <Button size={ButtonSize.Large} btnType={ButtonType.Danger}>hello</Button>
      <Button btnType={ButtonType.link}>hello</Button>
      <Button disabled>hello</Button>
    </div>
  );
}

export default App;
