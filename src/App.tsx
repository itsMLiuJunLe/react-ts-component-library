import React, { useState } from 'react';
import Button from './components/button/Button';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import Alert, { AlertType } from './components/alert/Alert';
import Menu from './components/menu/Menu';
import MenuItem from './components/menu/MenuItem';
import SubMenu from './components/menu/SubMenu';
// import Icon from './components/icon/Icon';
import Transition from './components/transition/Transition';
import Input from './components/input/Input';
// import { AutoComplete, DataSourceType } from './components/autoComplete/AutoComplete';

// library.add(fas)
function App() {
  const [show, setShow] = useState(false)
 
  return (
    <div className="App" style={{height:'10000px',marginLeft:'8px'}}>
      <header className="App-header">
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <Button size='lg' onClick={() => {setShow(!show)}}>Toggle</Button>
        </div>
        <Transition
              in={show}
              timeout={300}
              animation='zoom-in-left'
        >
          <div style={{display:'flex', flexWrap:'wrap'}}>
            {/* #################################################################Button Component############################################################################ */}
            <div style={{width:'500px'}}>
              <h2>Button Component Test</h2>
              <Button >Hello</Button>
              <Button disabled={true}>Hello</Button>
              <Button btnType='primary' size='lg'>Hello</Button>
              <Button btnType='danger' size='sm'>Hello</Button>
              <Button btnType='link' disabled={true} href="https://www.baidu.com">Hello</Button>
              <Button btnType='link' href="https://www.baidu.com" target='_self'>Hello</Button>
            </div>
            {/* ##################################################################Alert Component############################################################################ */}
            {/* <div style={{width:'500px'}}>
              <h2>Alert Component Test</h2>
              <Alert alertType={AlertType.Warning} description='alert testdsssssssssssssssssssssssss' style={{marginTop:'8px'}}/><br />  
              <Alert alertType={AlertType.Danger} description='alert testdssssssssssssssssssssssssss' style={{marginTop:'8px'}}/><br />
              <Alert alertType={AlertType.Success} description='alert testdsssssssssssssssssssssssss' style={{marginTop:'8px'}}/><br />
              <Alert alertType={AlertType.Success} title='test title' style={{marginTop:'8px'}}/>
            </div> */}
            {/* ##################################################################Menu Component############################################################################# */}
            <div style={{width:'500px'}}>
              <h2>Menu Component Test</h2>
              <Menu defaultOpenSubMenus={['2']} mode={'horizontal'} defaultIndex={'0'} onSelect={(index) => {console.log(index)}}>
                <MenuItem >
                  cool link 1
                </MenuItem>
                <MenuItem disabled={true} >
                  cool link 2
                </MenuItem>
                <SubMenu title='dropdown'>
                  <MenuItem>
                    dropdown1
                  </MenuItem>
                  <MenuItem>
                    dropdown2
                  </MenuItem>
                </SubMenu>
                <MenuItem >
                  cool link 3
                </MenuItem>
              </Menu>
            </div>
            {/* ##################################################################Input Component############################################################################# */}
            <div style={{width:'500px'}}>
              <h2>Input Component Test</h2>
              <Input />
              <Input disabled placeholder="disabled input"/>
              <Input icon='spinner' placeholder="input with icon"/>
              <Input defaultValue="large size" size="lg"/>
              <Input placeholder="small size" size="sm"/>
              <Input defaultValue="prepend text" prepend="https://"/>
              <Input append=".com" defaultValue="google"/>
            </div>
          </div>
        </Transition>
      </header>
    </div>
  );
}

export default App;
