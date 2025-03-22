"use client";
import React, { useEffect, useState } from "react";
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";

export default function InputField({
  label,
  type,
  name,
  icon,
}: {
  label: string;
  type: string;
  name: string;
  icon?: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const [types, setTypes] = useState(type);

  const toggle = () => {
    setShow(!show);
    if (types === "password") {
      setTypes("text");
    } else {
      setTypes("password");
    }
  };

  useEffect(() => {
    if (type !== "password" && type !== "text") {
      setTypes(type);
    }
  }, [type]);

  return (
    <div>
      <label className="label pb-0">
        <span className="text-sm mb-1 font-inter text-slate-800">{label}</span>
      </label>
      <div className="flex items-center gap-2 w-full rounded-md border border-gray-200  px-3">
        {icon && <span className="h-5 opacity-70 text-xl">{icon}</span>}

        <input
          type={types ?? "text"}
          className="w-full text-base border-none outline-none  py-3"
          name={name ?? "text"}
          placeholder={label}
          required
        />
        {type === "password" &&
          (show ? (
            <HiEyeOff
              className="h-5 opacity-70 text-xl cursor-pointer"
              onClick={toggle}
            />
          ) : (
            <HiEye
              className="h-5 opacity-70 text-xl cursor-pointer"
              onClick={toggle}
            />
          ))}
      </div>
    </div>
  );
}
