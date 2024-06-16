import React, { useContext } from 'react'
import Card from './card.jsx'
import './main.css'
import { BoardContext } from '../context/BoardContext.jsx'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Addlist from './Addlist.jsx'
import Utils from '../utils/Utils.js'
// import { useState } from 'react'

export default function Main() {

  const [allboard, setAllBoard] = useContext(BoardContext);
  const bdata = allboard.boards[allboard.active];

  function onDragend(res){
    if(!res.destination){
      console.log("no destination")
      return 
    }
    const newList  = [...bdata.list]
    const s_id = parseInt(res.source.droppableId)
    const d_id = parseInt(res.destination.droppableId)

    const [removed] = newList[s_id - 1].items.splice(res.source.ind, 1)
    newList[d_id - 1].items.splice(res.destination.ind , 0,removed)

    let newboard = {...allboard}
    newboard.boards[newboard.active].list = newList
    setAllBoard(newboard)

  }

  const cardData =(e ,ind) =>{
    let newlist = [...bdata.list];
    newlist[ind].items.push({id: Utils.makeid(8), title : e})

    let newboard = {...allboard}
    newboard.boards[newboard.active].list = newlist
    setAllBoard(newboard)
  }

  const listData =(e ) =>{
    let newlist = [...bdata.list];
    newlist.push({id: newlist.length + 1 +'', title : e, items:[]})

    let newboard = {...allboard}
    newboard.boards[newboard.active].list = newlist
    setAllBoard(newboard)
  }

  // const [cards ,setCards] = useState([{ id : Date.now() }])

  // const addCard = () =>{
  //   setCards([...cards, {id: Date.now()}])
  // }

  return (
    <div>
      <div className='main' style={{display:'flex', gap : '10px'}}>

        <DragDropContext onDragEnd={onDragend}>

                { bdata.list && bdata.list.map((x,ind) => {
                  return  <div key={ind} className='main_container'>

                  {/* main sectiin strat here  */}
                  <div className="main_info">
                    <p className='main_info_para'>{x.title}</p>
                    {/* <p className='main_info_btn'>+</p> */}
                  </div>
        
                  {/* heading section start heres */}

                  <Droppable droppableId={x.id} >

                      {(provided, snapshot) => (
                        <div 
                          ref={provided.innerRef}
                          style={{ backgroundColor: snapshot.isDraggingOver ? 'darkslategrey' : 'transparent', padding:"5px 0" }}
                          {...provided.droppableProps}
                        >
                         {x.items && x.items.map((item,ind)=>{
                              return <Draggable key={item.id} draggableId={item.id} index={ind}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className="heading">
                                    <span>
                                      <p className="heading_1_para">{item.title}</p>
                                      {/* <p className="heading_btn">=</p> */}
                                      </span>
                                  </div>

                                </div>
                              )}
                            </Draggable>
                              
                         })}

                         {provided.placeholder}
                        </div>
                      )}

                </Droppable>

                  <Card getCard ={(e) => cardData(e, ind)}/>
        
         </div>
        })}

        </DragDropContext>

        <Addlist getlist={(e) =>listData(e)}/>

      </div>
    </div>
  )
}
