import React from "react";
import "./Logo.scss";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="128px"
      height="128px"
      className={className}
    >
      <linearGradient
        id="nM3rJQALWWcfXByfo5uePa"
        x1="28"
        x2="28"
        y1="38.167"
        y2="49.844"
        gradientUnits="userSpaceOnUse"
        spreadMethod="reflect"
      >
        <stop offset="0" stop-color="#6dc7ff" />
        <stop offset="1" stop-color="#e6abff" />
      </linearGradient>
      <path
        fill="url(#nM3rJQALWWcfXByfo5uePa)"
        d="M28 39A5 5 0 1 0 28 49A5 5 0 1 0 28 39Z"
      />
      <linearGradient
        id="nM3rJQALWWcfXByfo5uePb"
        x1="32"
        x2="32"
        y1="10"
        y2="56.363"
        gradientUnits="userSpaceOnUse"
        spreadMethod="reflect"
      >
        <stop offset="0" stop-color="#1a6dff" />
        <stop offset="1" stop-color="#c822ff" />
      </linearGradient>
      <path
        fill="url(#nM3rJQALWWcfXByfo5uePb)"
        d="M49,11c-6.617,0-12,5.383-12,12c0,2.949,1.074,5.649,2.845,7.741l-6.234,6.234 C32.071,35.742,30.122,35,28,35s-4.071,0.742-5.611,1.975l-5.077-5.077C18.366,30.542,19,28.846,19,27c0-4.411-3.589-8-8-8 s-8,3.589-8,8s3.589,8,8,8c1.846,0,3.542-0.634,4.897-1.688l5.077,5.077C19.742,39.929,19,41.878,19,44c0,4.963,4.037,9,9,9 s9-4.037,9-9c0-2.122-0.742-4.071-1.975-5.611l6.234-6.234C43.351,33.926,46.051,35,49,35c6.617,0,12-5.383,12-12S55.617,11,49,11z M11,33c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S14.309,33,11,33z M28,51c-3.859,0-7-3.141-7-7s3.141-7,7-7s7,3.141,7,7 S31.859,51,28,51z M49,33c-5.514,0-10-4.486-10-10s4.486-10,10-10s10,4.486,10,10S54.514,33,49,33z"
      />
      <linearGradient
        id="nM3rJQALWWcfXByfo5uePc"
        x1="49"
        x2="49"
        y1="10"
        y2="56.363"
        gradientUnits="userSpaceOnUse"
        spreadMethod="reflect"
      >
        <stop offset="0" stop-color="#1a6dff" />
        <stop offset="1" stop-color="#c822ff" />
      </linearGradient>
      <path
        fill="url(#nM3rJQALWWcfXByfo5uePc)"
        d="M49,15c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S53.411,15,49,15z M49,29 c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S52.309,29,49,29z"
      />
    </svg>
  );
};

export default Logo;
