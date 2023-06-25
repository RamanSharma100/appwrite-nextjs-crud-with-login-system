"use client";

import Link from "next/link";
import { useState, type FC, useEffect } from "react";

interface FormProps {
  handleClick: (e: any, data: any) => void;
  dataFields: any;
  btnTitle: string;
  data?: any;
}

const Form: FC<FormProps> = ({
  handleClick,
  dataFields,
  btnTitle,
  data: filledData,
}) => {
  const [data, setData] = useState<any>(
    filledData
      ? filledData
      : dataFields.reduce(
          (acc: any, field: any) => ({
            ...acc,
            [field.name]: "",
          }),
          {}
        )
  );

  useEffect(() => {
    if (filledData) {
      setData(filledData);
    }
  }, [filledData]);

  return (
    <form
      onSubmit={(e: any) => handleClick(e, data)}
      className="w-full flex flex-col items-center max-w-sm"
    >
      {dataFields.map((field: any, index: number) => (
        <input
          key={index}
          className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type={field.type}
          placeholder={field.placeholder}
          name={field.name}
          value={data[field.name]}
          onChange={(e) =>
            setData({
              ...data,
              [field.name]: e.target.value,
            })
          }
        />
      ))}

      {(btnTitle.includes("Login") || btnTitle.includes("Register")) && (
        <p className="text-gray-500 text-xs flex w-full items-center justify-end gap-2 italic">
          {btnTitle === "Login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <Link
            href={btnTitle === "Login" ? "/register" : "/login"}
            className="text-blue-500 hover:text-blue-800"
          >
            {btnTitle === "Login" ? "register" : "login"}
          </Link>
        </p>
      )}
      <button className="capitalize mt-5 flex items-center justify-center bg-black hover:bg-opacity-80 text-white font-bold py-2 px-8 rounded">
        {btnTitle.toUpperCase()}
      </button>
    </form>
  );
};

export default Form;
