import React from 'react'
import { useState } from 'react'

export default function Addlist(props) {

    const [list, setlist] = useState('')
    const [show, setShow] = useState(false)
  
    const savelist= () => {
      if(!list){
        return
      }
  
      props.getlist(list)
      setlist('')
      setShow(!show)
      
    }
  
    const closeBtn =() =>{
      setlist('')
      setShow(!show)
    }

  return (
    <div>
        
      {/* input box section start hers  */}

          { show && <div className='input_box_section'>

            <input type='text'
             placeholder='enter list name '
             className='input_box' 
             value={list}
             onChange={(e) => setlist(e.target.value)}
            />

            <button className='input_btn' onClick={ ()=> savelist()}>Add</button>

            <button className='input_btn_X' onClick={() => closeBtn()}> clear</button>
          </div> }

          {/*  add a list section start here   */}

          {!show && <div className='add_a_list'>
            <button className='list_btn' onClick={() => setShow(!show)}>Add a list +</button>
          </div> } 
          </div>

  )
}
