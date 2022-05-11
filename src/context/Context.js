
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from 'uuid'
import Toastify from '../helpers/toastNotify';
const AppContext = React.createContext();
const initialValues = {
    name: '',
    url: '',
    vote: 0
}
const dataPerPage = 5;
const AppProvider = ({ children }) => {
    const [numberVisited, setNumberVisited] = useState(0)
    const [info, setInfo] = useState(initialValues)
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [paginatedData, setPaginatedData] = useState([])
    const [pages, setPages] = useState([1])
    const [sortType, setSortType] = useState('Most Voted')
    const [isModalOpen, setIsModelOpen] = useState(false)
    const [id, setId] = useState()
    const[whichItem,setWhichItem]=useState()

    const handleFilter = (e) => {
        setSortType(e.target.value)
        if (e.target.value === 'most') {
            //Bigger to lower sorted
            const sorted = [...data].sort((a,b) => b['vote'] - a['vote'])
            setData(sorted)
        }
        if (e.target.value === 'less') {
            //Lower to bigger
            const sorted = [...data].sort((a,b) => a['vote'] - b['vote'])
            setData(sorted)
        }
    }
    const handleDelete = (itemId) => {

        const newData = data.filter(i => i.id === itemId)
        setWhichItem(newData)
        console.log(newData)
        setIsModelOpen(true)
        let newId = checkWhichId(itemId)
        setId(newId)
       
     
    }
    const checkWhichId = (itemId) => {
  
        return itemId
    }
    const correctRemove = (e, itemId) => {
        if (e.target.value === 'cancel') {
            setIsModelOpen(false)
            setId()
            
          
            return
        }
        if (e.target.value === 'ok') {
            setIsModelOpen(false)
            const newData = data.filter(i => i.id !== itemId)
            setData(newData)
           const removed = (data[0].name).toUpperCase() + " removed."
            Toastify(removed)
       
            setId()
            return
        }
        if (e.target.value === 'close') {
            setIsModelOpen(false)
            setId()
          
            return
        }
    }
    const handleVote = (e, item) => {
        if (e.currentTarget.name === 'up') {
            let newData = data.map(i => {
                if (i.id === item.id) {
                    return {...i, vote: i.vote+1}
                }
                return i
            })
            newData = [...newData].sort((a,b) => b['vote'] - a['vote'])
            setData(newData)
        }
        if (e.currentTarget.name === 'down' ) {
            let newData = data.map(i => {
                if (i.id === item.id && item.vote > 0) {
                    return {...i, vote: i.vote-1}
                }
                return i
            })
            newData = [...newData].sort((a,b) => b['vote'] - a['vote'])
            setData(newData)
        }
    }
    const getPaginateData = () => {
        //We are gona limit the data 5
        if (data.length <= 5) return
        const totalPages = Math.ceil(data.length/5)
        let newPages = []
        for (let i=1 ; i<=totalPages; i++){
            newPages.push(i)
        }
        setPages(newPages)
    }
    const getPaginatedGroup = () => {
        const newData = data.slice(numberVisited, numberVisited + dataPerPage)
        setPaginatedData(newData)
    }
    useEffect(() => {
        getPaginateData()
        getPaginatedGroup()
        setLocalStorage(data)
    }, [data, numberVisited])

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setInfo({...info, id: uuid(), [name]: value});
    }
    const handleSubmit = (e, navigate) => {
        e.preventDefault();
        let newData = data
        newData = [...newData].sort((a,b) => a['vote'] - b['vote'])
        newData = newData.concat(info)
        setData(newData.reverse())
        setInfo(initialValues)
        navigate('/')

        const added =  (newData[0].name).toUpperCase() + " added."
        Toastify(added)

    }
    const getLocalStorage = () => {
        localStorage.getItem("dataStorage") && setData(JSON.parse(localStorage.getItem("dataStorage")));
    };
    const setLocalStorage = (data) => {
        localStorage.setItem("dataStorage", JSON.stringify(data));
    };
    useEffect(() => {
      getLocalStorage()
    }, [])
    return (
        <AppContext.Provider
        value={{
            handleSubmit,
            handleChange,
            handleDelete,
            handleVote,
            currentPage,
            setCurrentPage,
            paginatedData,
            pages,
            setNumberVisited,
            sortType,
            handleFilter,
            isModalOpen,
            correctRemove,
            id,
            whichItem,
            setWhichItem
        }}
        >
            {children}
        </AppContext.Provider>
    );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };