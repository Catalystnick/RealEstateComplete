import React, { Suspense } from "react";
import "./ListPage.scss";
import Filter from "../../components/filter/filter";
import Card from "../../components/card/card";
import Map from "../../components/map/map";
import { Await, useLoaderData } from "react-router-dom";

function ListPage() {
  const data = useLoaderData();

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="listWrapper">
          <Filter />
          <Suspense fallback={<p>...Loading</p>}>
            {/* Loader components using react suspense await */}
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading data</p>}
            >
              {(postResponse) =>
                /* Checking to see if returned data is empty or not */
                postResponse.data.length > 0 ? (
                  postResponse.data.map((post) => (
                    <Card key={post.id} item={post} />
                  ))
                ) : (
                  <p>
                    {/* If empty we show this message */}
                    We do not have property that match current criteria, try
                    different values!
                  </p>
                )
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>...Loading</p>}>
          {/* Loading map using Suspense await */}
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading data</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
