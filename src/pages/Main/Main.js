import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/Context";
import CloseIcon from "../../assets/CloseIcon";
import styles from "./Main.module.css";
import Modal from "react-modal";
import "../../App.css";
import Plus from "../../assets/Plus";
import ArrowUp from "../../assets/ArrowUp";
import ArrowDown from "../../assets/ArrowDown";
import { Container, Grid } from "@mui/material";
import { Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Alert from "../../Alert";

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
    currentItem,
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
        <select onChange={(e) => handleFilter(e)} value={sortType}>
          <option placeholder="Order By...">Order By...</option>
          <option value="most">Most Voted(Z-A)</option>
          <option value="less">Less Voted(A-Z)</option>
        </select>
        <div>
          {paginatedData?.map((item) => {
            return (
              <Grid container className="object" spacing={0}>
                <Grid item xs={3} className="point">
                  {item.vote} <p>POINTS</p>
                </Grid>
                <Grid item xs={9} className="link">
                  <h4>{item.name}</h4>
                  <p> {item.url}</p>

                  <Grid container xs={12} className="vote">
                    <Grid item xs={6} className="arrow">
                      {/*  <button onClick={() => handleDelete(item)}>Delete</button> */}
                      <div>
                        <Button
                          color="danger"
                          onClick={function noRefCheck() {}}
                        >
                          Delete
                        </Button>
                        <Modal toggle={function noRefCheck() {}}>
                          <ModalHeader toggle={function noRefCheck() {}}>
                            Modal title
                          </ModalHeader>
                          <ModalBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="primary"
                              onClick={function noRefCheck() {}}
                            >
                              Do Something
                            </Button>{" "}
                            <Button onClick={function noRefCheck() {}}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </div>
                      <button onClick={(e) => handleVote(e, item)} name="up">
                        <ArrowUp></ArrowUp>{" "}
                        <span className="vote">Up Vote</span>{" "}
                      </button>
                    </Grid>
                    <Grid item xs={6}>
                      <button onClick={(e) => handleVote(e, item)} name="down">
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
        {pages?.map((i) => {
          return (
            <button onClick={() => setNumberVisited((i - 1) * 5)}>{i}</button>
          );
        })}
        {/* <div className={`${isModalOpen ? "modalOverlay showModal"  : "modalOverlay"}`}>
            <div className='modalContainer'>
                <h3>Do You want to Remove :</h3>
                <button className='closeModalBtn' onClick={null}>
                    <CloseIcon />
                </button>
            </div>
        </div>  */}
        {isModalOpen /* (
          <Modal isOpen={true}>
            <p>Do You Want The Remove : </p>
            <p>{currentItem}</p>
            <button>Close</button>
            <button>Ok</button>
          </Modal>
        ) */ && null}
      </div>
      <Alert></Alert>
    </Container>
  );
};
export default Main;
