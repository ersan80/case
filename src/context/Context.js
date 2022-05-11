import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
//import useLocalState from "./useLocalState";
const AppContext = React.createContext();
const initialValues = {
    id:uuidv4(),
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
    const [currentItem,setCurrentItem] = useState("")
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
    const handleDelete = (item) => {
        console.log("click");
        setIsModelOpen(true)
        setCurrentItem(item.name)
         
        
    }
    const correctRemove = (e, item) => {
        if (e.target.value === 'cancel') {
            return setIsModelOpen(false)
        }
        if (e.target.value === 'ok') {
            const newData = data.filter(i => i.name !== item.name)
            setData(newData)
            setIsModelOpen(false)
            return
        }
        if (e.target.value === 'close-btn') {
            return setIsModelOpen(false)
        }
    }
    const handleVote = (e, item) => {
        e.preventDefault()
        if (e.currentTarget.name === 'up') {
            let newData = data.map(i => {
                if (i.name === item.name) {
                    return {...i, vote: i.vote+1}
                }
                return i
            })
            newData = [...newData].sort((a,b) => b['vote'] - a['vote'])
            setData(newData)
        }
        if (e.currentTarget.name === 'down') {
            let newData = data.map(i => {
               
                if (i.name === item.name && !(i.vote<=0)) {
                    return {...i, vote: i.vote-1}
                }
                return i
            })
            newData = [...newData].sort((a,b) => b['vote'] - a['vote'])
            setData(newData)
            console.log(newData)
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
    }, [data, numberVisited])
    // useEffect(() => {
    //     getPaginatedGroup()
    // }, [numberVisited])
    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setInfo({...info, [name]: value});
    }
    const handleSubmit = (e, navigate) => {
        e.preventDefault();
        let newData = data
        newData = [...newData].sort((a,b) => a['vote'] - b['vote'])
        newData = newData.concat(info)
        setData(newData.reverse())
        setInfo(initialValues)
        navigate('/')
    }
    const getLocalStorage = () => {
        localStorage.getItem("data") && setData(JSON.parse(localStorage.getItem("data")));
    };
    const setLocalStorage = (data) => {
        localStorage.setItem("data", JSON.stringify(data));
    };
    useEffect(() => {
      getLocalStorage()
    }, [])
    useEffect(() => {
      setLocalStorage(data)
    }, [data])
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
            data,
            currentItem
        }}
        >
            {children}
        </AppContext.Provider>
    );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider }