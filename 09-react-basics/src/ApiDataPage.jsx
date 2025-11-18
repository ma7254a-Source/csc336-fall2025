//ApiDataPage.jsx

import {useEffect, useState} from "react";

//original ApiDataPage for routing
/*function ApiDataPage() {
    return (
        <section classname="app-container">
            <h2>API data</h2>
            <p>
                This page will fetch and dsiplay data from the API we select. Nothing is here for now. 
                <code>useEffect</code> We'll add this later
            </p>
        </section>
    );
}*/

function ApiDataPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [status, setStatus] = useState("idle");
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchDog() {
      setStatus("loading");
      try {
        const res = await fetch("https://dog.ceo/api/breeds/image/random");
        if (!res.ok) {
          throw new Error("Network response was not okay.");
        }
        const data = await res.json();
        if (!cancelled) {
          setImageUrl(data.message);
          setStatus("success");
        }
      } catch (err) {
        if (!cancelled) {
          console.error("failed to fetch dog image", err);
          setStatus("error");
        }
      }
    }

    fetchDog();

    return () => {
      cancelled = true;
    };
  }, [reloadCount]); 

  function handleNewDog() {
    setReloadCount((prev) => prev + 1);
  }

  return (
    <section className="app-container">
      <h2>Random Dog Viewer</h2>
      <p>Woof.</p>

      <button onClick={handleNewDog} className="dog-button">
        Uno Mas Perro
      </button>

      <div className="dog-image-wrapper">
        {status === "loading" && <p>Loading a dog...</p>}
        {status === "error" && <p>No dogs for you sir!</p>}
        {status === "success" && imageUrl && (
          <img src={imageUrl} alt="a random dog" className="dog-image" />
        )}
      </div>
    </section>
  );
}

export default ApiDataPage;
