import Paper from "@mui/material/Paper";
import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  // Button,
} from "reactstrap";

const FeedData = [
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "primary",
    date: "6 minute ago",
  },
  {
    title: "New user registered.",
    icon: "bi bi-person",
    color: "info",
    date: "6 minute ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "danger",
    date: "6 minute ago",
  },
  {
    title: "New order received.",
    icon: "bi bi-bag-check",
    color: "success",
    date: "6 minute ago",
  },
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "dark",
    date: "6 minute ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "warning",
    date: "6 minute ago",
  },
];

const Feeds = () => {
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   // Handle click event
  //   console.log("Feed item clicked");
  // };

  return (
    <Paper className="p-5">
      <CardBody>
        <CardTitle tag="h5">Feeds</CardTitle>
        <CardSubtitle className="mb-2 text-gray-500" tag="h6">
          Your news feeds
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {FeedData.map((feed, index) => (
            <ListGroupItem
              key={index}
              action
              href="/"
              tag="a"
              className="flex items-center p-3 border-0"
              // onClick={handleClick} // Handle click event here
            >
              <button
                className="rounded-full me-3"
                // size="sm"
                color={feed.color}
              >
                <i className={feed.icon}></i>
              </button>
              {feed.title}
              <small className="ms-auto text-gray-500 text-sm">
                {feed.date}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Paper>
  );
};

export default Feeds;
