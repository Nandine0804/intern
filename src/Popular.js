import React from "react";

// Define a functional component named ListItem
function ListItem({ value, onChildValue }) {
  // Define a function handleClick, which invokes onChildValue with the value of the ListItem
  const handleClick = () => {
    onChildValue(value); // Hey, this is the part where we trigger the parent's function and pass in our value
  };

  // Render a list item with an onClick event that calls handleClick when clicked
  return <li onClick={handleClick}>{value}</li>; // This is where we show our value in a list item
}

// Define the Popular component
export default function Popular({ onChildValue }) {
  // Render the Popular component
  return (
    <div className="popular">
      <h1>What’s popular right now?</h1>{" "}
      {/* title for our popular items list */}
      <div className="list">
        <ul className="list-items">
          {/* Render ListItem components with different values */}
          <ListItem value="ENGINEERING DAYS" onChildValue={onChildValue} />{" "}
          {/* Showing our first popular item */}
          <ListItem
            value="BANGALORE STORIES"
            onChildValue={onChildValue}
          />{" "}
          <ListItem value="GOA DIARIES" onChildValue={onChildValue} />{" "}
          <ListItem value="NITK STUFFS" onChildValue={onChildValue} />{" "}
          <ListItem value="IIM THINGS" onChildValue={onChildValue} />{" "}
          <ListItem value="IIMB FACTS" onChildValue={onChildValue} />{" "}
          <ListItem value="SHAYARI" onChildValue={onChildValue} />{" "}
          <ListItem value="VIKAS MEENA" onChildValue={onChildValue} />{" "}
          <ListItem value="BEACH" onChildValue={onChildValue} />{" "}
        </ul>
      </div>
    </div>
  );
}
