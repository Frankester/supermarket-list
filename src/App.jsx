import { useEffect, useState } from 'react'
import './App.css'

function App() {
const [showModal, setShowModal]= useState(false)
const [item, setItem]  = useState('')
const [items, setItems] = useState([])

const handleClick = e => setShowModal(true)
const handleClose = e => setShowModal(false)
const handleChange = e =>  setItem(e.target.value)

const handleAddItem = e => {
  e.preventDefault()

  setItems(prevItem => prevItem.concat(item))

  setItem('')
  setShowModal(false)
}

const handleDelete = (e,index) => {
  setItems(actualItems => actualItems.filter(item => actualItems.indexOf(item) !== index))
}

useEffect(() => {
  const db = JSON.parse(localStorage.getItem('todos'))
  setItems(db? db.items: [])
},[])

useEffect(() => localStorage.setItem('todos', JSON.stringify({ items: items || []})), [items])

  return (
    <div className='app'>
      <div className='content'>
        <h1>Supermarket list</h1>
        <p>{items.length || '0'} item(s)</p>
        {
          items.map((supermarketToBuy,index) => (
            <div key={index} className='item'>
              <p>{supermarketToBuy}</p>
              <button type='button' onClick={(e) => handleDelete(e, index)}>delete</button>
            </div>
            )
          )
        }
        <button className='add' onClick={handleClick} >Add item</button>
      </div>
      
      {
        showModal 
        ? <div className='parentModal'> 
            <div className='parentContent'>
              <form onSubmit={handleAddItem}>
                <h2>Add item</h2>  
                <input className='itemAddText' 
                  type='text' 
                  autoFocus 
                  value={item} 
                  onChange={handleChange}
                />
                <div className='options'>
                  <button className='btn' onClick={handleClose} type='button'>Close</button>
                  <button className='btn blue' type='submit'>Add</button>
                </div>
              </form>
            </div> 
          </div>
        : null
      }
    </div>
  )
}

export default App
