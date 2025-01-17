import React from "react";

export default function AddresBox({data}) {
  return (
    <div className="addresbox w-full mx-auto border-solid border-gmain border-y-2 rounded-lg p-2">
      <div className="flex flex-col gap-3">
        <h1>{data.title}</h1>
        <h1>{`${data.state}/${data.city}/${data.details}/پلاک${data.pelak}/واحد${data.unit}/کد پستی${data.postalcode}`}</h1>
        <div className="flex gap-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3996 15.7H9.59961C8.99961 15.7 8.59961 15.3 8.59961 14.7V11.9C8.59961 11.6 8.69961 11.4 8.89961 11.2L19.4996 0.599988C19.6996 0.399988 19.8996 0.299988 20.1996 0.299988C20.4996 0.299988 20.6996 0.399988 20.8996 0.599988L23.6996 3.39999C24.0996 3.79999 24.0996 4.39999 23.6996 4.79999L13.0996 15.4C12.8996 15.6 12.6996 15.7 12.3996 15.7Z"
              fill="#519D9E"
            />
            <path
              d="M14.4996 16.8C13.8996 17.4 13.1996 17.7 12.3996 17.7H9.59961C7.89961 17.7 6.59961 16.4 6.59961 14.7V11.9C6.59961 11.1 6.89961 10.3 7.49961 9.80001L13.4996 3.70001H3.59961C1.89961 3.70001 0.599609 5.00001 0.599609 6.70001V20.7C0.599609 22.4 1.89961 23.7 3.59961 23.7H17.5996C19.2996 23.7 20.5996 22.4 20.5996 20.7V10.8L14.4996 16.8Z"
              fill="#519D9E"
            />
          </svg>
          <h1>تغییر آدرس</h1>
        </div>
      </div>
    </div>
  );
}
