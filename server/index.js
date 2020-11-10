import express from "express";
import { readFileSync } from "fs";
import React from "react";
import { renderToString } from "react-dom/server";

import { App } from "../client/App";
import { handlemodify } from "../shared/utility";

const data = {
  questions: [
    {
      questionId: "Q1",
      content: "Should we use Jquert or Fetch for Ajax?",
    },
    {
      questionId: "Q2",
      content: "What is the best feature of React?",
    },
  ],

  answers: [
    {
      answerId: "A1",
      questions: "Q1",
      upvotes: 2,
      content: "JQuery",
    },
    {
      answerId: "A2",
      questions: "Q1",
      upvotes: 1,
      content: "Fetch",
    },
    {
      answerId: "A3",
      questions: "Q2",
      upvotes: 1,
      content: "Performance",
    },
    {
      answerId: "A4",
      questions: "Q2",
      upvotes: 2,
      content: "Scalability",
    },
  ],
};

const app = express();

//anythig in dist folder served as static file
app.use(express.static("dist"));

app.get("/data", async (req, res) => {
  res.json(data);
});

app.get("/vote/:answerId", (req, res) => {
  const { query, params } = req;
  data.answers = handlemodify(data.answers, params.answerId, +query.increment);
  res.send("ok");
});

app.get("/", async (_req, res) => {
  const index = readFileSync(`public/index.html`, "utf8");
  const rendered = renderToString(<App {...data} />);
  res.send(index.replace("{{root}}", rendered));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listing at port ${PORT}`);
});
