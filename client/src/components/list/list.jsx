import React from "react";
import "./list.scss";
import { listData } from "../../lib/dummydata";
import Card from "../card/card";

function List({ posts }) {
  return (
    <div className="list">
      {posts.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List;
