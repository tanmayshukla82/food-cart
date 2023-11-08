import { useState } from 'react'
import { myContext } from './main'
export default function Context(props) {
  const [itemCount, setItemCount] = useState(0);
  const [addedItem, setAddedItem] = useState([])
  const [currentUser, setCurrentUser] = useState('');
  const store = {
    itemCount,
    setItemCount,
    addedItem,
    setAddedItem,
    currentUser,
    setCurrentUser
  }
  return (
    <myContext.Provider value={store}>
      {props.children}
    </myContext.Provider>
  )
}
