import React from 'react'
import ".././App.css"


const Minus = (props) => {
    const{handleDelete,itemId}=props

  return (
    <div className='minus' onClick={()=>handleDelete(itemId)} >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
</svg>
    </div>
  )
}

export default Minus