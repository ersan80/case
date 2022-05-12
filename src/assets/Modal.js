import React from 'react'
import { useGlobalContext } from '../context/Context'

import "../App.css"

const Modal = (props) => {
    const {
        isModalOpen,
        correctRemove,
        id
    } = props

const {whichItem} = useGlobalContext()


  return (
    <div className={`${isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}`}>
        <div className='modal-container'>
            <div className='modalHeader'>
                <h6 className='removeLink'>Remove Link </h6>
                <button
                className='close-btn'
                value='close'
                onClick={(e) => correctRemove(e, id)}
            >
              X
               
            </button>

            </div>
            {
                whichItem?.map((item)=>{
                    return(
                        <>
                
                    <h6 className='modalContent'>Do you want to remove : </h6>
                    <h2>{item.name}</h2></> )
                })
            }

            <div className='modalFooter'>
               
            <button
                className='ok '
                value='ok'
                onClick={(e) => correctRemove(e, id)}
            >
               OK
            </button>
            <button
                className='cancel'
                value='cancel'
                onClick={(e) => correctRemove(e, id)}

            >
                CANCEL
            </button>
            </div>
           
            
        </div>
    </div>
  )
}
export default Modal