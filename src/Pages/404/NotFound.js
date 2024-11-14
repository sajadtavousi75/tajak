import React from "react";

import "./NotFound.css";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="bg-bg">
      <div className=" container NotFound h-[100vh] flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-gmain text-xl lg:text-5xl	font-roya font-bold	">صفحه یافت نشد !</h1>
        <svg
          width="348"
          height="336"
          viewBox="0 0 348 336"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M218.895 300.733C218.895 298.576 217.147 296.829 214.991 296.829H4.18314C2.02744 296.829 0.279297 298.576 0.279297 300.733C0.279297 302.889 2.02744 304.637 4.18314 304.637H214.991C217.147 304.637 218.895 302.889 218.895 300.733Z"
            fill="#519D9E"
          />
          <path
            d="M293.068 312.444H179.856C177.7 312.444 175.952 314.192 175.952 316.348C175.952 318.504 177.7 320.252 179.856 320.252H293.068C295.224 320.252 296.971 318.504 296.971 316.348C296.971 314.192 295.224 312.444 293.068 312.444Z"
            fill="#519D9E"
          />
          <path
            d="M230.606 328.06H82.2603C80.1046 328.06 78.3564 329.807 78.3564 331.963C78.3564 334.119 80.1046 335.867 82.2603 335.867H230.606C232.763 335.867 234.51 334.119 234.51 331.963C234.51 329.807 232.763 328.06 230.606 328.06Z"
            fill="#519D9E"
          />
          <path
            d="M304.779 320.25C306.935 320.25 308.683 318.502 308.683 316.346C308.683 314.19 306.935 312.442 304.779 312.442C302.623 312.442 300.875 314.19 300.875 316.346C300.875 318.502 302.623 320.25 304.779 320.25Z"
            fill="#519D9E"
          />
          <path
            d="M322.347 175.808C325.581 175.808 328.203 173.187 328.203 169.952C328.203 166.718 325.581 164.097 322.347 164.097C319.113 164.097 316.491 166.718 316.491 169.952C316.491 173.187 319.113 175.808 322.347 175.808Z"
            fill="#519D9E"
          />
          <path
            d="M248.173 23.5582C251.407 23.5582 254.029 20.9365 254.029 17.7024C254.029 14.4684 251.407 11.8467 248.173 11.8467C244.939 11.8467 242.317 14.4684 242.317 17.7024C242.317 20.9365 244.939 23.5582 248.173 23.5582Z"
            fill="#519D9E"
          />
          <path
            d="M334.058 11.8463C337.292 11.8463 339.914 9.22459 339.914 5.99053C339.914 2.75648 337.292 0.134766 334.058 0.134766C330.824 0.134766 328.202 2.75648 328.202 5.99053C328.202 9.22459 330.824 11.8463 334.058 11.8463Z"
            fill="#519D9E"
          />
          <path
            d="M72.5003 11.8463C75.7344 11.8463 78.3561 9.22459 78.3561 5.99053C78.3561 2.75648 75.7344 0.134766 72.5003 0.134766C69.2662 0.134766 66.6445 2.75648 66.6445 5.99053C66.6445 9.22459 69.2662 11.8463 72.5003 11.8463Z"
            fill="#519D9E"
          />
          <path
            d="M92.0198 66.5006C95.2539 66.5006 97.8756 63.8789 97.8756 60.6448C97.8756 57.4108 95.2539 54.7891 92.0198 54.7891C88.7858 54.7891 86.1641 57.4108 86.1641 60.6448C86.1641 63.8789 88.7858 66.5006 92.0198 66.5006Z"
            fill="#519D9E"
          />
          <path
            d="M17.847 171.904C21.081 171.904 23.7027 169.282 23.7027 166.048C23.7027 162.814 21.081 160.192 17.847 160.192C14.6129 160.192 11.9912 162.814 11.9912 166.048C11.9912 169.282 14.6129 171.904 17.847 171.904Z"
            fill="#519D9E"
          />
          <path
            d="M33.4622 261.692C36.6963 261.692 39.318 259.07 39.318 255.836C39.318 252.602 36.6963 249.98 33.4622 249.98C30.2282 249.98 27.6064 252.602 27.6064 255.836C27.6064 259.07 30.2282 261.692 33.4622 261.692Z"
            fill="#519D9E"
          />
          <path
            d="M70.5484 335.865C72.7044 335.865 74.4522 334.117 74.4522 331.961C74.4522 329.805 72.7044 328.058 70.5484 328.058C68.3923 328.058 66.6445 329.805 66.6445 331.961C66.6445 334.117 68.3923 335.865 70.5484 335.865Z"
            fill="#519D9E"
          />
          <path
            d="M343.818 312.444H316.491C314.334 312.444 312.587 314.192 312.587 316.348C312.587 318.504 314.334 320.252 316.491 320.252H343.818C345.974 320.252 347.722 318.504 347.722 316.348C347.722 314.192 345.974 312.444 343.818 312.444Z"
            fill="#519D9E"
          />
          <path
            d="M88.666 266.843H255.432C290.467 266.843 312.398 228.932 294.859 198.554L211.476 54.1295C193.96 23.7888 150.162 23.7498 132.622 54.1295L49.2395 198.554C31.719 228.895 53.5907 266.843 88.666 266.843ZM56.0009 202.458L139.383 58.0334C153.897 32.8957 190.182 32.8637 204.714 58.0334L288.096 202.458C302.61 227.596 284.493 259.035 255.431 259.035H88.666C59.637 259.035 41.4692 227.623 56.0009 202.458Z"
            fill="#519D9E"
          />
          <path
            d="M88.6652 244.202H255.431C273.042 244.202 284.066 225.147 275.25 209.876L191.867 65.4513C183.062 50.2005 161.046 50.181 152.23 65.4513L68.8469 209.876C60.0422 225.126 71.0323 244.202 88.6652 244.202ZM75.6084 213.779L158.991 69.3551C164.793 59.3074 179.296 59.2949 185.104 69.3551L268.487 213.779C274.288 223.827 267.048 236.394 255.43 236.394H88.6652C77.0637 236.394 69.8003 223.84 75.6084 213.779Z"
            fill="#519D9E"
          />
          <path
            d="M170.097 187.521C179.783 187.521 187.664 179.64 187.664 169.954V111.395C187.664 101.708 179.783 93.8281 170.097 93.8281C160.41 93.8281 152.529 101.708 152.529 111.395V169.954C152.529 179.64 160.41 187.521 170.097 187.521ZM160.337 111.395C160.337 106.014 164.715 101.636 170.097 101.636C175.478 101.636 179.856 106.014 179.856 111.395V169.954C179.856 175.335 175.478 179.714 170.097 179.714C164.715 179.714 160.337 175.335 160.337 169.954V111.395Z"
            fill="#519D9E"
          />
          <path
            d="M170.097 226.559C179.783 226.559 187.664 218.678 187.664 208.992C187.664 199.305 179.783 191.425 170.097 191.425C160.41 191.425 152.529 199.305 152.529 208.992C152.529 218.678 160.41 226.559 170.097 226.559ZM170.097 199.232C175.478 199.232 179.856 203.61 179.856 208.992C179.856 214.373 175.478 218.752 170.097 218.752C164.715 218.752 160.337 214.373 160.337 208.992C160.337 203.61 164.715 199.232 170.097 199.232Z"
            fill="#519D9E"
          />
          <path
            d="M31.51 121.155C44.4255 121.155 54.9331 110.647 54.9331 97.7317C54.9331 84.8162 44.4255 74.3086 31.51 74.3086C18.5945 74.3086 8.08691 84.8162 8.08691 97.7317C8.08691 110.647 18.5945 121.155 31.51 121.155ZM31.51 82.1163C40.1203 82.1163 47.1254 89.1213 47.1254 97.7317C47.1254 106.342 40.1203 113.347 31.51 113.347C22.8997 113.347 15.8946 106.342 15.8946 97.7317C15.8946 89.1221 22.8997 82.1163 31.51 82.1163Z"
            fill="#519D9E"
          />
          <path
            d="M300.875 97.7321C318.096 97.7321 332.106 83.7219 332.106 66.5013C332.106 49.2806 318.096 35.2705 300.875 35.2705C283.655 35.2705 269.645 49.2806 269.645 66.5013C269.645 83.7227 283.655 97.7321 300.875 97.7321ZM300.875 43.079C313.791 43.079 324.298 53.5866 324.298 66.5021C324.298 79.4175 313.791 89.9251 300.875 89.9251C287.96 89.9251 277.452 79.4175 277.452 66.5021C277.452 53.5866 287.96 43.079 300.875 43.079Z"
            fill="#519D9E"
          />
        </svg>
        <p className="text-gmain text-xl lg:text-3xl font-roya"><Link className="text-gmain text-3xl font-roya font-bold" to='/'>اینجا</Link> را کلیک کنید تا به صفحه اصلی بروید .</p>
      </div>
    </div>
    </div>
  );
}
