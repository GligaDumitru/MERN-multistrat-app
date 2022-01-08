import React, { useState } from "react";
import Modal from "../Modal";
import ProfileCard from "../ProfileCard";

const users = [
  {
    name: "Angela",
    logo: "https://via.placeholder.com/350x350",
  },
  {
    name: "Ana",
    logo: "https://via.placeholder.com/350x350",
  },
  {
    name: "Banana",
    logo: "https://via.placeholder.com/350x350",
  },
  {
    name: "Amana",
    logo: "https://via.placeholder.com/350x350",
  },
  {
    name: "daniel",
    logo: "https://via.placeholder.com/350x350",
  },
  {
    name: "Mihai",
    logo: "https://via.placeholder.com/350x350",
  },
];

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
  logo = "https://via.placeholder.com/350x350",
  onClick,
}) => {
  return (
    <li
      onClick={onClick}
      className="flex items-center p-2 ml-4 mb-2 border border-gray-100 rounded-lg hover:bg-gray-100 cursor-pointer"
    >
      <img src={logo} alt={name} className="w-8 h-8 rounded-full" />
      <span className="inline-block pl-2">{name}</span>
    </li>
  );
};

const SearchPerson = () => {
  const [user, setUser] = useState("");
  const [selectUser, setSelectUser] = useState({});
  const result = createArrayOfAlphabeticallyGrouped(users);
  const [showModal, setShowModal] = useState(false);
  const handleOnChangeInput = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };
  return (
    <>
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
                  ) : null;
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SearchPerson;
