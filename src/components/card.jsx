import React from 'react'
import { useState } from 'react'
import './card.css'

export default function Card(props) {
  const [card, setCard] = useState('')
  const [show, setShow] = useState(false)

  const saveCard= () => {
    if(!card){
      return
    }

    props.getCard(card)
    setCard('')
    setShow(!show)
    
  }

  const closeBtn =() =>{
    setCard('')
    setShow(!show)
  }

  // const handleInputChange = (e) =>{
  //   setInputValue(e.target.value)
  // }

  return (
    <div>
      {/* input box section start hers  */}

          { show && <div className='input_box_section'>

            <input type='text'
             placeholder='enter card name '
             className='input_box' 
             value={card}
             onChange={(e) => setCard(e.target.value)}
            />

            <button className='input_btn' onClick={ ()=> saveCard()}>Add</button>

            <button className='input_btn_X' onClick={() => closeBtn()}> clear</button>
          </div> }

          {/*  add a card section start here   */}

          {!show && <div className='add_a_card'>
            <button className='card_btn' onClick={() => setShow(!show)}>Add a card +</button>
          </div> } 

    </div>
  )
}
