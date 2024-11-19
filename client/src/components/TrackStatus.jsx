import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const TrackStatus = () => {
  const [searchParams] = useSearchParams();
  const [statusData, setStatusData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fileNo = searchParams.get("fileNo");

    fetch(`http://localhost:5000/track-status?fileNo=${fileNo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setStatusData(data);
        } else {
          setError(data.message);
        }
      })
      .catch(() => setError("An error occurred while fetching the status."));
  }, [searchParams]);

  return (
    <div className="text-center">
      {statusData ? (
        <div>
          <h3>File Status: {statusData.status}</h3>
          <p>First Name: {statusData.fname}</p>
          <p>Last Name: {statusData.lname}</p>
        </div>
      ) : (
        <p>{error || "Loading..."}</p>
      )}
    </div>
  );
};

export default TrackStatus;
