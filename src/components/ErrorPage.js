import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="text-center mt-14">
      <h1 className="text-4xl">Whoops! Something's wrong!</h1>
      <h2 className="text-3xl my-2">Let's get you back home</h2>
      <Link to="/">
        <button className="text-2xl mt-6 border rounded-lg p-6 w-full bg-slate-200 hover:bg-slate-300">
          Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
