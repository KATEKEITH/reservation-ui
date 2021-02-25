"use strict";
console.log("mainpage.js");

// import server from "../../server.js";

const API_ENDPOINT = "http://localhost:8080";

const api = {
  fetchCategory: () => {
    return fetch(`${API_ENDPOINT}/reservation/api/categories`).then((res) =>
      res.json()
    );
  },
  fetchDisplayinfos: (categoryId, start) => {
    return fetch(
      `${API_ENDPOINT}/reservation/api/displayinfos?categoryId=${categoryId}&start=${start}`
    ).then((res) => res.json());
  },
};

// api.fetchDisplayinfos(1, 1);

function savePreference(arr) {
  const filterString = JSON.stringify([...arr]);
  sessionStorage.setItem("로그", filterString);
}

function retrivePreferences() {
  const preferenses = JSON.parse(sessionStorage.getItem("로그"));
  return preferenses;
}

let filters = new Map();

function addFilters(filters, key, value) {
  filters.set(key, value);
}

function deleteFilters(filters, key) {
  filters.delete(key);
}

function request(options) {
  console.log(">>> request: in", options);

  fetch(`${API_ENDPOINT}/reservation/kafka/publish`, options).then((data) => {
    if (!data.ok) {
      delay *= 2;
      console.log("error!!!!!!!!");
      // throw Error(data.status);
    }
    arr = [];
    sessionStorage.clear();
    return data;
  });
}

let time;
let arr = [];

const target = document.getElementsByClassName("event");
target[0].addEventListener("click", function (event) {
  console.log(">>>> event", event);

  const update = {
    영역: event.target.classList[0],
    키워드: event.target.innerText,
  };

  arr.push(update);
  savePreference(arr);

  setInterval(() => {
    const options = {
      method: "POST",
      header: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JSON.parse(sessionStorage.getItem("로그"))),
    };
    console.log(
      ">>>> request: before",
      options,
      sessionStorage.getItem("로그")
    );
    request(options);
  }, 20000);
});
