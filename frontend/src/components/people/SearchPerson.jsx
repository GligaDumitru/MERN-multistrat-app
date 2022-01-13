/* eslint-disable react-hooks/exhaustive-deps */
import Icon from "@material-tailwind/react/Icon";
import { Button } from "gpl-tailwind-theme";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePerson,
  getPeople,
  selectState,
} from "../../features/auth/authSlice";
import Modal from "../Modal";
import ProfileCard from "../ProfileCard";
import LoadingContainer from "../shared/LoadingContainer";

const createArrayOfAlphabeticallyGrouped = (data) => {
  return Object.entries(
    data.reduce((memo, user) => {
      const firstLetter = user.name[0].toUpperCase();
      if (firstLetter in memo) {
        memo[firstLetter].push(user);
      } else {
        memo[firstLetter] = [user];
      }
      return memo;
    }, {})
  );
};

const RenderItem = ({
  name = "Name Here",
  imageLink = "https://via.placeholder.com/350x350",
  onClick,
}) => {
  return (
    <li
      onClick={onClick}
      className="flex items-center p-2 ml-4 mb-2 border border-gray-100 rounded-lg hover:bg-gray-100 cursor-pointer w-full"
    >
      <img src={imageLink} alt={name} className="w-8 h-8 rounded-full" />
      <span className="inline-block pl-2">{name}</span>
    </li>
  );
};

const SearchPerson = () => {
  const [user, setUser] = useState("");
  const [selectUser, setSelectUser] = useState({});
  const { people = [] } = useSelector(selectState);
  const dispatch = useDispatch();
  const result = createArrayOfAlphabeticallyGrouped(people);
  const [showModal, setShowModal] = useState(false);
  const handleOnChangeInput = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };

  useEffect(() => {
    dispatch(getPeople());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePerson(id));
  };

  return (
    <LoadingContainer>
      <div className="relative">
        <input
          type="text"
          name="person"
          onChange={handleOnChangeInput}
          placeholder="Search person"
          className="border border-gray-400 rounded-lg p-2 pl-4 mb-4"
        />
        <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
          <ProfileCard {...selectUser} />
        </Modal>
        {result.map((el, index) => {
          const [letter, letterUsers] = el;
          return (
            <div key={index}>
              <h1>{letter}</h1>
              <ul>
                {letterUsers.map((lU, idx) => {
                  const showEl = lU.name
                    .toLowerCase()
                    .includes(user.toLowerCase());
                  return showEl ? (
                    <div className="flex justify-between items-center">
                      <RenderItem
                        onClick={() => {
                          setSelectUser({
                            ...selectUser,
                            ...lU,
                          });
                          setShowModal(true);
                        }}
                        key={idx}
                        {...lU}
                      />
                      <Button
                        iconOnly
                        rounded
                        className="m-0 ml-2 p-1 h-8 w-8"
                        color="red"
                        ripple="light"
                        size="xs"
                        onClick={() => handleDelete(lU.id)}
                      >
                        <Icon name="delete" size="xs" />
                      </Button>
                    </div>
                  ) : null;
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </LoadingContainer>
  );
};

export default SearchPerson;
