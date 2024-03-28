import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      return data.json();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        console.log(data);
        setUserData(data);
      })
      .catch((err) => {
        window.alert("failed to fetch data");
        console.log(err);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = userData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(userData.length / recordPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCurrentPage = (id) => {
    if (currentPage !== userData.length) {
      setCurrentPage(id);
    }
  };

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead
          style={{ height: "50px", backgroundColor: "#009879", color: "#fff" }}
        >
          <tr>
            <td>#</td>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
          </tr>
        </thead>

        <tbody>
          {records.map((data) => {
            return (
              <tr
                key={data.id}
                style={{ height: "50px", borderBottom: "1px solid #eeeeee" }}
              >
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        style={{
          width: "100%",
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button className="btn" onClick={prevPage}>
        Previous
        </button>

        {numbers.map((n, i) => {
          return (
            <button
              className={`page-number ${currentPage === n ? "active" : ""}`}
              key={i}
              onClick={() => changeCurrentPage(n)}
            >
              {n}
            </button>
          );
        })}

        <button className="btn" onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
