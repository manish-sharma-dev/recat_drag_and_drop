// import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar'
import Main from './components/main'
import { BoardContext } from './context/BoardContext'
import { useState } from 'react';


function App() {
  const boardData = {
    active : 0,
    boards : [
      {
        list:[
          { id:"1", title : 'To-Dos' ,items: [{ id : 'cdrFt', title : "Project Description 1"}]},
          { id:"2", title : 'In-Progress' ,items: [{ id : 'cdrFv', title : "Project Description 2"}]},
          { id:"3", title : 'Done' ,items: [{ id : 'cdrFb', title : "Project Description 3"}]}
        ]
      }
    ]
  }
  const [allboard,setAllBoard] = useState(boardData)

  return (
   <>
      <Navbar />
      <BoardContext.Provider value={[allboard, setAllBoard]}>
          <Main />
      </BoardContext.Provider>
   </>
  );
}

export default App;
