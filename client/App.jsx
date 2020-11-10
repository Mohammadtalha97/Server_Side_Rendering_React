import React from "react";

export const App = ({ questions, answers, handlemodify }) => {
  return (
    <div>
      <h1>Qestion and answer Tool</h1>

      {questions.map(({ questionId, content }) => (
        <div key={questionId}>
          <h3>{content}</h3>
          <div>
            {answers
              .filter((answer) => answer.questions === questionId)
              .map(({ upvotes, content, answerId }) => (
                <div key={answerId}>
                  <span>
                    {content} - {upvotes}
                  </span>
                  <button onClick={() => handlemodify(answerId, 1)}> + </button>
                  <button onClick={() => handlemodify(answerId, -1)}>-</button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
