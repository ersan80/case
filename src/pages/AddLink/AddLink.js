import React from 'react'
import {useNavigate} from 'react-router-dom';
import ArrowLeft from '../../assets/ArrowLeft';
import {useGlobalContext} from '../../context/Context'
import "../../App.css"

const AddLink = () => {

    const {handleSubmit, handleChange} = useGlobalContext()
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/")
    }

    return (
        <div>
            <span className='return' onClick={handleClick}><ArrowLeft/> Return to List</span>
            <h3 className='form' data-testid='link-header'>Add New Link</h3>
            <form onSubmit={(e) => handleSubmit(e, navigate)} className="form" data-testid='form'>
                <label htmlFor="name">Link Name:</label>
                <input
                    type="text"
                    name="name"
                    placeholder='MDN'
                    required
                    onChange={(e) => handleChange(e)}
                />
                <label htmlFor="url">Link Url:</label>
                <input
                    type="text"
                    required
                    placeholder='https://developer.mozilla.org/'
                    name="url"
                    onChange={(e) => handleChange(e)}
                />
                <button type='submit'>ADD</button>
            </form>
        </div>
    )
}

export default AddLink