import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/Context";
import "../../App.css";
import Plus from "../../assets/Plus";
import ArrowUp from "../../assets/ArrowUp";
import ArrowDown from "../../assets/ArrowDown";
import { Container, Grid } from "@mui/material";
import Modal from "../../assets/Modal";
import Minus from "../../assets/Minus";

const Main = () => {
  const {
    handleDelete,
    handleVote,
    paginatedData,
    pages,
    setNumberVisited,
    sortType,
    handleFilter,
    isModalOpen,
    correctRemove,
    id,
  } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <Container className="container" maxWidth="sm">
      <div className="main">
        <Grid item xs={8} className="submit">
          <div onClick={() => navigate("/add-link")}>
            <Plus></Plus> Submit A Link
          </div>
        </Grid>
        <div className="horizon"></div>
        <select
          onChange={(e) => handleFilter(e)}
          value={sortType}
          className="select"
        >
          <option placeholder="Order By...">Order By...</option>
          <option value="most">Most Voted(Z-A)</option>
          <option value="less">Less Voted(A-Z)</option>
        </select>

        <div>
          {paginatedData?.map((item) => {
            return (
              <Grid container className="object" spacing={0}>
                <Grid item xs={3} className="point">
                  <span className="number">{item.vote}</span> <p>POINTS</p>
                </Grid>
                <Grid item xs={9} className="link">
                  <Minus
                    className="minus"
                    handleDelete={handleDelete}
                    itemId={item.id}
                  ></Minus>
                  {/*    <Alert></Alert> */}
                  <h4>{item.name}</h4>
                  <p className="url"> {item.url}</p>

                  <Grid container xs={12} className="vote">
                    <Grid item xs={6} className="arrow">
                      {/*  <button onClick={() => handleDelete(item)}>Delete</button> */}

                      <button
                        className="updown"
                        onClick={(e) => handleVote(e, item)}
                        name="up"
                      >
                        <ArrowUp></ArrowUp>{" "}
                        <span className="vote">Up Vote</span>{" "}
                      </button>
                    </Grid>
                    <Grid item xs={6}>
                      <button
                        className="updown"
                        onClick={(e) => handleVote(e, item)}
                        name="down"
                      >
                        {" "}
                        <ArrowDown></ArrowDown>{" "}
                        <span className="vote">Down Vote</span>{" "}
                      </button>
                    </Grid>{" "}
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </div>
          
            <nav aria-label="Page navigation example" className="navpagination">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true" className="navpagination">&laquo;</span>
                  </a>
                </li>
                {pages?.map((i,index)=>{
                  return(
                    <li class="page-item" onClick={() => setNumberVisited((i - 1) * 5)}>
                  <a
                    class="page-link"
                    href="#"
                    onClick={() => setNumberVisited((i - 1) * 5)}
                  >
                    <span className="navpagination">{i}</span>
                  </a>
                </li>
                  )
                })} 

                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true" className="navpagination">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
       

        <Modal
          isModalOpen={isModalOpen}
          correctRemove={correctRemove}
          id={id}
        />
      </div>
    </Container>
  );
};
export default Main;
