import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/button';
import Alert from './components/Alert/alert'



function App() {
  return (
    <div className="App">
      <section>
        <Button size={ButtonSize.Large} btnType={ButtonType.Danger}>hello</Button>
        <Button btnType={ButtonType.link}>hello</Button>
        <Button>hello</Button>
      </section>
      <section>
        <Alert title='只有title属性'></Alert>
        <Alert title='title属性' description='二级描述'></Alert>
        <Alert title='title属性' description='二级描述' type='danger' onClose={() =>{
          console.log('匿名函数')
        }}></Alert>
        <Alert title='title属性' description='二级描述' type='danger' onClose={() => {
          console.log('关闭alert之后的回调')
        }}></Alert>
      </section>
    </div>
  );
}

export default App;
