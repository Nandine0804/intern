import React, { useEffect, useState, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { BsPen, BsArrowLeft } from "react-icons/bs";
import Popular from "./Popular";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import SwiperCore, { EffectCoverflow } from "swiper";
import { AiFillStar } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { CiShare1 } from "react-icons/ci";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  get,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import "swiper/swiper-bundle.css";
SwiperCore.use([EffectCoverflow]);

const appSetting = {
  databaseURL: "https://internship-b263a-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSetting);
const database = getDatabase(app);
// const List = ref(database, 'List')

const cat = ref(database, "Category");

let initialCategories = [
  "FIGMA",
  "FOOD",
  "ENGINEERING",
  "CINEMA",
  "JOURNALISM",
];

export default function Story() {
  const [subject, setSubject] = useState("");
  const [describe, setDescribe] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [search, setSearch] = useState("");
  const [searchResults2, setSearchResults2] = useState([]);

  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState([]);
  const [randomCat, setRandom] = useState([]);
  const [mappable, setMappable] = useState([]);

  const [show, setShow] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [menu, setMenu] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [content, setContent] = useState(false);

  const [check, setCheck] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const dropdownRef = useRef(null);
  const [stories, setStories] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});
  const [reveal, setReveal] = useState({});
  const [sortedPopularCategories, setSortedPopularCategories] = useState([]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isCategoryStarred, setIsCategoryStarred] = useState(false);
  const [starredCategories, setStarredCategories] = useState([]);

  //const [starredCategories, setStarredCategories] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);
  const [showCopyLinkPopup, setShowCopyLinkPopup] = useState(false);

  useEffect(() => {
    // Fetch starred categories from local storage
    const storedStarredCategories = localStorage.getItem("starredCategories");
    if (storedStarredCategories) {
      const parsedStarredCategories = JSON.parse(storedStarredCategories);
      setStarredCategories(parsedStarredCategories);
    }

    // Fetch popular categories from your data source
    // const fetchedPopularCategories = fetchPopularCategories();
    // setPopularCategories(fetchedPopularCategories);
  }, []);

  // Function to append popular categories to starred categories until the total count reaches 10

  const toggleStar1 = () => {
    // Toggle the star icon's color
    const newStarred = !isCategoryStarred;
    setIsCategoryStarred(newStarred);

    // Save the action in local storage
    const storedStarredCategories = localStorage.getItem("starredCategories");
    let starredCategories = storedStarredCategories
      ? JSON.parse(storedStarredCategories)
      : [];

    if (newStarred) {
      // Add category to starred categories list
      starredCategories.push(selectedCategory);
    } else {
      // Remove category from starred categories list
      starredCategories = starredCategories.filter(
        (category) => category !== selectedCategory
      );
    }

    localStorage.setItem(
      "starredCategories",
      JSON.stringify(starredCategories)
    );
  };

  useEffect(() => {
    onValue(cat, function (snapshot) {
      if (snapshot.exists()) {
        const entries = Object.entries(snapshot.val());

        // Sort categories based on the number of stories
        const sortedCategories = entries.sort(
          (a, b) =>
            Object.keys(b[1].stories || {}).length -
            Object.keys(a[1].stories || {}).length
        );

        // Update to set the top 10 categories
        const topCategories = sortedCategories
          .slice(0, 10)
          .map((item) => item[0]);

        setSortedPopularCategories(topCategories);
      }
    });
  }, []);

  const [showSharePopup, setShowSharePopup] = useState(false);
  const [categoryUrl, setCategoryUrl] = useState("");

  // Function to handle share icon click
  const handleShareClick = () => {
    const link = `https://category/${selectedCategory}`;
    setCategoryUrl(link);
    setShowSharePopup(true);
  };

  // Function to copy category URL to clipboard
  const copyCategoryUrl = () => {
    navigator.clipboard
      .writeText(categoryUrl)
      .then(() => {
        setShowSharePopup(false); // Hide the share popup after copying
        console.log("Category URL copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy category URL", error);
      });
  };

  useEffect(() => {
    // It generates a random index and sets 'check' to the value at that index in 'randomCat'.

    if (randomCat.length > 0) {
      const random = Math.floor(Math.random() * categories.length);
      setCheck(randomCat[random]);
    }
  }, [randomCat]);

  function getCurrentDateTime() {
    // This function gets the current date and time in a specific format.
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear());
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year}-${hours}-${minutes}-${seconds}`;
  }

  function handleValue(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "subject") {
      setSubject(value);
    } else if (name === "description") {
      setDescribe(value);
    }
  }

  function handleSearch(e) {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    const results = performSearch(searchValue);
    setSearchResults(results);
  }

  function handleSearch2(e) {
    // Setting search state, toggling boolean, and performing search for 'search2'
    setSearch(e.target.value);
    setMenu(false);
    setShow3(true);

    const results = performSearch2(e.target.value);
    setSearchResults2(results);
  }

  function handleCategorySelect(category) {
    // Updating selected category, search text, and search results
    // Toggling visibility of a component
    setSelectedCategory(category.toUpperCase());
    setSearchText("");
    setSearchResults([]);
    setShow(false);
  }

  function handleCategorySelect2(category) {
    // Resetting states, setting search, and performing search for 'search2'
    setSelectedValue("");
    setSearch(category);
    setSearchResults2([]);
    searchBar(category);
  }

  function performSearch(searchValue) {
    // Filtering categories and returning results
    const filteredCategories =
      categories &&
      categories.filter((category) =>
        category.toLowerCase().startsWith(searchValue.toLowerCase())
      );

    return filteredCategories;
  }

  function performSearch2(searchValue) {
    // Filtering 'randomCat' and returning results
    const filteredCategories =
      randomCat &&
      randomCat.filter((category) =>
        category.toLowerCase().startsWith(searchValue.toLowerCase())
      );

    return filteredCategories;
  }

  function clear() {
    // Resetting states to empty values
    setSubject("");
    setDescribe("");
    setSearchText("");
    setSelectedCategory("");
  }

  function handleSubmit(e) {
    // Generating random ID and creating data object
    // Pushing data to database
    // Checking and adding new category to list if necessary
    // Alerting user
    const random = Math.random() * 4;
    e.preventDefault();
    const Data = {
      subject: subject,
      description: describe,
      category: selectedCategory,
      timeStamp: getCurrentDateTime(),
      id: random,
    };

    if (subject && describe && selectedCategory) {
      push(ref(database, `List/${selectedCategory}`), Data);

      if (selectedCategory) {
        if (
          newCat &&
          !newCat.some(
            (item) => item.toLowerCase() === selectedCategory.toLowerCase()
          )
        ) {
          push(cat, selectedCategory);
        }
        clear();
      }
    }
    alert("Done");

    // setContent(false)
  }

  function handleShow() {
    setShow((prev) => !prev);
  }

  function handleAdd() {
    setSelectedCategory(searchText.toUpperCase());
    setSearchText("");
    setSearchResults([]);
    setShow(false);

    if (searchText) {
      if (
        initialCategories &&
        !initialCategories.some(
          (item) => item.toLowerCase() === searchText.toLowerCase()
        )
      ) {
        setCategories((prevCategories) => [...prevCategories, searchText]);
        initialCategories.push(searchText);
      }
    }
  }
  const handleButtonClick = () => {
    // Generate the link using the selected category name
    const link = `https://category/${selectedCategory}`;
    // Set the category URL and category name in the state
    setCategoryUrl(link);
    // Do something with the category name, such as using it for analytics
    console.log("Selected category:", selectedCategory);
    // Show the copy link popup
    setShowCopyLinkPopup(true);
  };

  function searchBar(cat) {
    cat && setMenu(true);
    setShow3(false);
    setShow4(false);
  }

  function handleClick() {
    setShow3((prev) => !prev);
    setShow4(false);
  }

  function handleClick2() {
    setShow4((prev) => !prev);
    setShow3(false);
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    windowWidth > 425 ? setContent(true) : setContent(false);
  }, [windowWidth]);

  function handleflip() {
    // Toggling flipped state
    setFlipped((prev) => !prev);
  }

  function handleChildValue(value) {
    // Updating selected value and clearing search
    setSelectedValue(value);
    setSearch("");
  }
  // Function to format time string
  function formattedDate(dateTimeString) {
    // Extracting date components
    const dateTimeParts = dateTimeString.split("-");

    const day = dateTimeParts[0];
    const month = dateTimeParts[1];
    const year = dateTimeParts[2];

    return `${day}-${month}-${year}`;
  }

  function formattedDate2(dateTimeString) {
    const dateTimeParts = dateTimeString.split("-");

    const day = dateTimeParts[0];
    const month = dateTimeParts[1];
    const year = dateTimeParts[2];

    return `${month}-${day}-${year}`;
  }

  function formattedTime(dateTimeString) {
    const dateTimeParts = dateTimeString.split("-");

    const hours = dateTimeParts[3];
    const minutes = dateTimeParts[4];
    const seconds = dateTimeParts[5];

    return `${hours}-${minutes}-${seconds}`;
  }

  useEffect(() => {
    // Conditional logic to handle responsive behavior based on window width
    if (windowWidth > 425) {
      setReveal({});
    } else if (windowWidth <= 425) {
      setShow4(false);
      setShow(false);
    }
  }, [windowWidth]);

  function togglePara(itemId) {
    //Function to toggle paragraph visibility based on window width
    windowWidth > 425
      ? setExpandedSections((prevExpandedSections) => ({
          ...prevExpandedSections,
          [itemId]: !prevExpandedSections[itemId],
        }))
      : setReveal((prevReveal) => ({
          ...prevReveal,
          [itemId]: !prevReveal[itemId],
        }));
  }
// Style object for main reveal section

  const revealMain = {
    position: "absolute",
    top: "0px",
    left: windowWidth > 375 ? "-75px" : windowWidth > 320 ? "-90px" : "-80px",
    width: windowWidth > 320 ? "283px" : "250px",
    height: "257px",
    boxShadow: "1px 1px 0px #000000",
  };

  const revealhead = {
    alignSelf: "center",
    width: "194px",
    marginBottom: "8px",
  };

  const revealPara = {
    marginTop: "initial",
    width: "215px",
    overflowY: reveal ? "auto" : "hidden",
    maxHeight: "112px",
    fontSize: "0.625rem",
  };

  function goback() {
    setReveal({});
  }

  useEffect(() => {
    if (selectedValue) {
      onValue(
        ref(database, `List/${selectedValue.toUpperCase()}`),
        function (snapshot) {
          if (snapshot.exists()) {
            setStories(Object.entries(snapshot.val()).length);
            setMappable(Object.entries(snapshot.val()));
          }
        }
      );
    }
    setReveal({});
  }, [selectedValue]);

  useEffect(() => {
    if (check) {
      onValue(
        ref(database, `List/${check.toUpperCase()}`),
        function (snapshot) {
          if (snapshot.exists()) {
            setStories(Object.entries(snapshot.val()).length);
            setMappable(Object.entries(snapshot.val()));
          }
        }
      );
    }

    setReveal({});
  }, [check]);

  useEffect(() => {
    if (search) {
      onValue(
        ref(database, `List/${search.toUpperCase()}`),
        function (snapshot) {
          if (snapshot.exists()) {
            setStories(Object.entries(snapshot.val()).length);
            setMappable(Object.entries(snapshot.val()));
          } else {
            // If no stories found in the searched category
            setStories(0);
            setMappable([]);
          }
        }
      );
    }
    setReveal({});
  }, [search]);

  function showContent() {
    setContent((prev) => !prev);
  }

  function paragraph(item) {
    if (item) {
      const words = item[1].split(" ");
      const isExpanded = expandedSections[item[2]];
      const isRevealed = reveal[item[2]];

      if (words.length > 24 && !isExpanded) {
        return (
          <div
            className="item-section"
            key={item[2]}
            style={isRevealed ? revealMain : {}}
          >
            <div className="item-category">
              <h3>{item[0]}</h3>
              <p>{formattedDate(item[4])}</p>
            </div>
            {isRevealed && (
              <BsArrowLeft className="left-arrow" onClick={goback} />
            )}
            <h2 style={isRevealed ? revealhead : {}}>{item[3]}</h2>
            <div className="show-para">
              {isRevealed ? (
                <p style={isRevealed ? revealPara : {}}>
                  {item[1].slice(0, item[1].length)}...
                </p>
              ) : (
                <p>{item[1].slice(0, 300)}...</p>
              )}
            </div>
            {windowWidth > 425 ? (
              <span className="read-more" onClick={() => togglePara([item[2]])}>
                Read more...
              </span>
            ) : (
              !isRevealed && (
                <span
                  className="read-more"
                  onClick={() => togglePara([item[2]])}
                >
                  Read more...
                </span>
              )
            )}
          </div>
        );
      } else {
        return (
          <div
            className="item-section"
            key={item[2]}
            style={isRevealed ? revealMain : {}}
          >
            <div className="item-category">
              <h3>{item[0]}</h3>
              <p>{formattedDate(item[4])}</p>
            </div>
            {isRevealed && (
              <BsArrowLeft className="left-arrow" onClick={goback} />
            )}
            <h2 style={isRevealed ? revealhead : {}}>{item[3]}</h2>
            <div className="show-para">
              <p style={isRevealed ? revealPara : {}}>{item[1]}</p>
            </div>
            {words.length > 24 && windowWidth > 425 ? (
              <span className="read-more" onClick={() => togglePara(item[2])}>
                <br />
                <br />
                Read less
              </span>
            ) : (
              words.length > 24 &&
              !isRevealed && (
                <span className="read-more" onClick={() => togglePara(item[2])}>
                  Read more...
                </span>
              )
            )}
          </div>
        );
      }
    }
  }

  function sorted(mappable) {
    const sortedMappable = mappable.sort((a, b) => {
      const dateA = new Date(formattedDate2(Object.values(a[1])[4]));
      const dateB = new Date(formattedDate2(Object.values(b[1])[4]));

      if (dateA < dateB) {
        return flipped ? 1 : -1;
      }

      if (dateA > dateB) {
        return flipped ? -1 : 1;
      }

      const timeA = formattedTime(Object.values(a[1])[4]);
      const timeB = formattedTime(Object.values(b[1])[4]);

      if (timeA < timeB) {
        return flipped ? 1 : -1;
      }
      if (timeA > timeB) {
        return flipped ? -1 : 1;
      }
    });

    return sortedMappable.map((items, index) => {
      const random = Math.random() * 4;
      return (
        <div key={random} className="single-items">
          {paragraph(Object.values(items[1]))}
        </div>
      );
    });
  }

  const toggleStar = () => {
    // Toggle the state to indicate whether the category is starred or not
    setIsCategoryStarred((prevIsCategoryStarred) => !prevIsCategoryStarred);

    // Save the action in local storage
    localStorage.setItem("isCategoryStarred", !isCategoryStarred);
  };

  useEffect(() => {
    // Fetch the star action from local storage when component mounts
    const storedIsCategoryStarred = localStorage.getItem("isCategoryStarred");
    if (storedIsCategoryStarred) {
      setIsCategoryStarred(JSON.parse(storedIsCategoryStarred));
    }
  }, []);

  const topRowName = isCategoryStarred ? "Favorite Topic" : "Popular Topic";
  const [favoriteCategories, setFavoriteCategories] = useState([]);
  useEffect(() => {
    // Fetch starred categories from local storage
    const storedStarredCategories = localStorage.getItem("starredCategories");
    if (storedStarredCategories) {
      const parsedStarredCategories = JSON.parse(storedStarredCategories);
      setStarredCategories(parsedStarredCategories);
    }

    // Fetch popular categories from your data source
    // For example:
    // const fetchedPopularCategories = fetchPopularCategories();
    // setPopularCategories(fetchedPopularCategories);
  }, []);

  useEffect(() => {
    // Append popular categories to starred categories until total count reaches 10
    const getFavoriteCategories = () => {
      const favoriteCategories = [...starredCategories];

      let remainingCount = 10 - starredCategories.length;
      const popularCategoriesToAdd = popularCategories
        .filter((category) => !starredCategories.includes(category))
        .slice(0, remainingCount);

      favoriteCategories.push(...popularCategoriesToAdd);

      return favoriteCategories;
    };

    // Update favorite categories state
    setFavoriteCategories(getFavoriteCategories());
  }, [starredCategories, popularCategories]);

  const [categoryContent, setCategoryContent] = useState({});

  useEffect(() => {
    const fetchCategoryContent = async () => {
      const categoryContentData = {};

      for (const category of favoriteCategories) {
        try {
          const snapshot = await get(ref(database, `List/${category}`));
          if (snapshot.exists()) {
            categoryContentData[category] = Object.entries(snapshot.val());
          } else {
            categoryContentData[category] = [];
          }
        } catch (error) {
          console.error("Error fetching category content:", error);
          // Handle error if necessary
        }
      }

      setCategoryContent(categoryContentData);
    };

    fetchCategoryContent();
  }, [favoriteCategories]);
  return (
    <div className="flex">
      <Popular
        onChildValue={handleChildValue}
        popularCategories={sortedPopularCategories}
      />
      <div className="story-section">
        <form className="section-1" id="post">
          <div className="section-1-head">
            <h1>Write your own story</h1>
            <BsPen className="pen" onClick={showContent} />
          </div>
          {content && (
            <div className="section-1-content">
              <div className="subject">
                <label htmlFor="subject">
                  <h3>Topic</h3>
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="write the topic for your story "
                  value={subject}
                  onChange={(e) => handleValue(e)}
                  required
                />
              </div>

              <div className="selectCategory">
                <div className="select-btn" onClick={handleShow}>
                  {selectedCategory ? (
                    <span>{selectedCategory.toUpperCase()}</span>
                  ) : (
                    <span>Select a category</span>
                  )}
                  <BiChevronDown className="down" />
                </div>

                {show && (
                  <div className="content">
                    <div className="search">
                      <AiOutlineSearch className="search-btn" />
                      <input
                        type="text"
                        id="category"
                        placeholder="Search"
                        value={searchText}
                        onChange={handleSearch}
                        required
                      />
                    </div>

                    {searchText.length === 0 ? (
                      <ul className="search-list">
                        {initialCategories.map((category) => (
                          <li
                            key={category}
                            onClick={() => handleCategorySelect(category)}
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    ) : searchResults.length > 0 ? (
                      <ul className="search-list">
                        {searchResults.map((category) => (
                          <li
                            key={category}
                            onClick={() => handleCategorySelect(category)}
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="search-list">
                        <li onClick={handleAdd}>Add new category</li>
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          <br />
          <div className="description">
            <label htmlFor="describe">
              <h3>Description</h3>
            </label>
            <textarea
              value={describe}
              name="description"
              id="describe"
              placeholder="write what your story is about here"
              onChange={(e) => handleValue(e)}
              required
            />
          </div>
          <button className="button" onClick={handleButtonClick}>
            Get Link
          </button>

          {/* Small pop-up to display the category URL and option to copy */}
          {showCopyLinkPopup && (
            <div className="copy-link-popup">
              <p>Category URL: {categoryUrl}</p>
              <div class="category-button">
                <button className="button" onClick={copyCategoryUrl}>
                  Copy Link
                </button>
                {/* <button
                  className="button"
                  onClick={() => setShowSharePopup(false)}
                >
                  Close
                </button> */}
              </div>
            </div>
          )}

          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            PUBLISH YOUR STORY
          </button>
        </form>

        <section className="section-2" id="popular">
          <div className="section-2-head">
            <div ref={dropdownRef}>
              <h1>
                Read stories on{" "}
                {selectedCategory ? selectedCategory.toUpperCase() : "Category"}
                {"   "}
                <CiShare1 onClick={handleShareClick} />
              </h1>
              <h1>{topRowName}</h1>
              {showSharePopup && (
                <div className="share-popup">
                  <p>Category URL: {categoryUrl}</p>
                  <div className="popup-button">
                    <button className="button" onClick={copyCategoryUrl}>
                      Copy Link
                    </button>
                    <button
                      className="button"
                      onClick={() => setShowSharePopup(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              <div className="looking">
                <div className="choose">
                  <label htmlFor="choose">
                    <h3>What are you looking for?</h3>
                  </label>
                  <input
                    className="search_input"
                    type="text"
                    id="choose"
                    placeholder="Browse a Category"
                    value={search}
                    onClick={handleClick}
                    onChange={handleSearch2}
                    required
                  />
                  <BiChevronDown className="btn-2" onClick={handleClick2} />
                </div>

                {show4 ? (
                  <ul className="search-list search-list-2">
                    {initialCategories.map((category) => (
                      <li
                        key={category}
                        onClick={() => handleCategorySelect2(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                ) : show3 && search.length === 0 ? (
                  <ul className="search-list search-list-2">
                    {initialCategories.map((category) => (
                      <li
                        key={category}
                        onClick={() => handleCategorySelect2(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                ) : (
                  show3 &&
                  searchResults2.length > 0 && (
                    <ul className="search-list search-list-2">
                      {searchResults2.map((category) => (
                        <li
                          key={category}
                          onClick={() => handleCategorySelect2(category)}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </div>
            </div>
            <section>
              {Object.entries(categoryContent).map(([category, content]) => (
                <div key={category}>
                  <h2>{category}</h2>
                  {content.length > 0 ? (
                    content.map((item) => (
                      <div key={item[0]}>
                        <h3>{item[1].subject}</h3>
                        <p>{item[1].description}</p>
                        {/* Render other properties as needed */}
                      </div>
                    ))
                  ) : (
                    <p>No stories found for this category.</p>
                  )}
                </div>
              ))}
            </section>
            <div className="filter">
              <h1 className="total-story">
                <span>
                  {stories === 1
                    ? `${stories} story`
                    : stories === 0
                    ? `No story`
                    : `${stories} stories`}
                </span>{" "}
                for you to read
              </h1>
              <div className="flex-filter">
                <center>
                  <AiFillStar
                    className={isCategoryStarred ? "starred" : ""}
                    onClick={toggleStar}
                  />
                </center>
                <h2 className="filter-heading">
                  Sort:
                  <span onClick={handleflip}>
                    {flipped ? `Newest to Oldest` : `Oldest to Newest`}
                  </span>
                </h2>
                <CgArrowsExchangeAltV
                  className="filterarrow"
                  onClick={handleflip}
                />
              </div>
            </div>

            {windowWidth > 425 ? (
              <div>
                {selectedValue && (
                  <div className="container">
                    <section className="item-section-main">
                      <div className="item-section-container">
                        {check && mappable && sorted(mappable)}
                      </div>
                    </section>
                  </div>
                )}

                {(!menu || search.length === 0) && (
                  <div className="container">
                    <section className="item-section-main">
                      <div className="item-section-container">
                        {check && mappable && sorted(mappable)}
                      </div>
                    </section>
                  </div>
                )}

                {search.length > 0 && menu && (
                  <div className="container">
                    <section className="item-section-main">
                      <div className="item-section-container">
                        {sorted(mappable)}
                        <button className="button" onClick={toggleStar1}>
                          Star a category{" "}
                          <AiFillStar
                            className={isCategoryStarred ? "starred" : ""}
                            onClick={toggleStar}
                          />
                        </button>
                      </div>
                    </section>
                  </div>
                )}
              </div>
            ) : (
              <div className="container">
                <section className="item-section-main">
                  <Swiper
                    effect="coverflow"
                    // grabCursor='true'
                    centeredSlides="true"
                    slidesPerView={3}
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 0,
                      depth: 200,
                      modifier: 1,
                      slideShadows: false,
                    }}
                    // onSwiper={handleSwiperInit}
                    // onSlideChange={handleSlideChange}
                  >
                    <div className="swiper-wrapper">
                      {(() => {
                        const sortedMappable = mappable.sort((a, b) => {
                          const dateA = new Date(
                            formattedDate2(Object.values(a[1])[4])
                          );
                          const dateB = new Date(
                            formattedDate2(Object.values(b[1])[4])
                          );

                          if (dateA < dateB) {
                            return flipped ? 1 : -1;
                          }

                          if (dateA > dateB) {
                            return flipped ? -1 : 1;
                          }

                          const timeA = formattedTime(Object.values(a[1])[4]);
                          const timeB = formattedTime(Object.values(b[1])[4]);

                          if (timeA < timeB) {
                            return flipped ? 1 : -1;
                          }
                          if (timeA > timeB) {
                            return flipped ? -1 : 1;
                          }
                        });

                        return sortedMappable.map((items, index) => {
                          const random = Math.random() * 4;
                          return (
                            <SwiperSlide key={random} className="swiper-slide">
                              {paragraph(Object.values(items[1]))}
                            </SwiperSlide>
                          );
                        });
                      })()}
                    </div>
                  </Swiper>
                </section>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
