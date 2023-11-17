import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <g fill="#000" clipPath="url(#a)">
      <path d="M20.625 11.25a5.625 5.625 0 1 1-11.25 0 5.625 5.625 0 0 1 11.25 0Z" />
      <path
        fillRule="evenodd"
        d="M0 15a15 15 0 1 1 30 0 15 15 0 0 1-30 0ZM15 1.875A13.125 13.125 0 0 0 4.747 23.194C6.08 21.049 9.01 18.75 15 18.75c5.99 0 8.92 2.297 10.253 4.444A13.124 13.124 0 0 0 15 1.875Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h30v30H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgComponent
