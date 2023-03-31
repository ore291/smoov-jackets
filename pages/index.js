import axios from "axios";
import JacketCard from "components/JacketCard";
import { Layout } from "components/Layout";
import { ProductCard } from "components/ProductCard";
import { Accordion, Button, Carousel, Modal } from "flowbite-react";
import { CirclePicker } from "react-color";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsCheckCircle } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import absoluteUrl from "next-absolute-url";
import Checked from "components/Checked";
import Unchecked from "components/Unchecked";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { MdContentCopy } from "react-icons/md";
import { FaTimesCircle } from "react-icons/fa";
import { SampleNextArrow, SamplePrevArrow } from "components/Arrows";
import Whatsapp from "components/Whatsapp";
import { isMobile } from "react-device-detect";

function Index({ base_url }) {
  const jackets = [
    {
      "#1879ae": [
        "/0/#1879ae-front.svg",
        "/0/#1879ae-back.svg",
        "/0/#1879ae-side.svg",
      ],
      "#562b25": [
        "/0/#562b25-front.svg",
        "/0/#562b25-back.svg",
        "/0/#562b25-side.svg",
      ],
      "#000000": [
        "/0/#000000-front.svg",
        "/0/#000000-back.svg",
        "/0/#000000-side.svg",
      ],
      "#1d9533": [
        "/0/#1d9533-front.svg",
        "/0/#1d9533-back.svg",
        "/0/#1d9533-side.svg",
      ],
      "#ef331a": [
        "/0/#ef331a-front.svg",
        "/0/#ef331a-back.svg",
        "/0/#ef331a-side.svg",
      ],
    },
    {
      "#1879ae": [
        "/1/#1879ae-front.svg",
        "/1/#1879ae-back.svg",
        "/1/#1879ae-side.svg",
      ],
      "#562b25": [
        "/1/#562b25-front.svg",
        "/1/#562b25-back.svg",
        "/1/#562b25-side.svg",
      ],
      "#000000": [
        "/1/#000000-front.svg",
        "/1/#000000-back.svg",
        "/1/#000000-side.svg",
      ],
      "#1d9533": [
        "/1/#1d9533-front.svg",
        "/1/#1d9533-back.svg",
        "/1/#1d9533-side.svg",
      ],
      "#ef331a": [
        "/1/#ef331a-front.svg",
        "/1/#ef331a-back.svg",
        "/1/#ef331a-side.svg",
      ],
    },
    {
      "#1879ae": [
        "/2/#1879ae-front.svg",
        "/2/#1879ae-back.svg",
        "/2/#1879ae-side.svg",
      ],
      "#562b25": [
        "/2/#562b25-front.svg",
        "/2/#562b25-back.svg",
        "/2/#562b25-side.svg",
      ],
      "#000000": [
        "/2/#000000-front.svg",
        "/2/#000000-back.svg",
        "/2/#000000-side.svg",
      ],
      "#1d9533": [
        "/2/#1d9533-front.svg",
        "/2/#1d9533-back.svg",
        "/2/#1d9533-side.svg",
      ],
      "#ef331a": [
        "/2/#ef331a-front.svg",
        "/2/#ef331a-back.svg",
        "/2/#ef331a-side.svg",
      ],
    },
    {
      "#1879ae": [
        "/3/#1879ae-front.svg",
        "/3/#1879ae-back.svg",
        "/3/#1879ae-side.svg",
      ],
      "#562b25": [
        "/3/#562b25-front.svg",
        "/3/#562b25-back.svg",
        "/3/#562b25-side.svg",
      ],
      "#000000": [
        "/3/#000000-front.svg",
        "/3/#000000-back.svg",
        "/3/#000000-side.svg",
      ],
      "#1d9533": [
        "/3/#1d9533-front.svg",
        "/3/#1d9533-back.svg",
        "/3/#1d9533-side.svg",
      ],
      "#ef331a": [
        "/3/#ef331a-front.svg",
        "/3/#ef331a-back.svg",
        "/3/#ef331a-side.svg",
      ],
    },
  ];

  
  



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: isMobile ? false : true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const renderProducts = () => {
    if (products.length === 0) return <h1>No Products</h1>;
    return products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  const [selectedSize, setSelectedSize] = useState("m");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
  };

  const sizes = [
    { name: "Small", value: "s" },
    { name: "Medium", value: "m" },
    { name: "Large", value: "l" },
    { name: "Extra Large", value: "xl" },
    { name: "Double Extra Large", value: "xxl" },
  ];

  const [selectedJacket, setSelectedJacket] = useState(0);
  const [result, setResult] = useState(null);

  const reset = () => {
    setSelectedSize("m");
    setSelectedColor("#000000");
    setName("");
    setSelectedJacket(0);
    setPhone("");
    setEmail("");
  };

  const onErrorClose = () => {
    reset();
    setShowErrorModal(false);
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length < 2) {
      return toast.error("FullName is required", {
        position: "top-right",
      });
    }
    try {
      setLoading(true);
      const res = await axios.post(base_url + "/api/orders", {
        product_id: selectedJacket,
        size: selectedSize,
        color: selectedColor,
        name: name,
        email: email,
        phone: phone,
      });

      if (res.status == 200) {
        setResult(res.data);
        setLoading(false);
        // toast.success("Order Saved", {
        //   position: "top-right",
        // });
        reset();
        setShowModal(true);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      setShowErrorModal(true);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(result?.order_id);
    toast.success("Copied", {
      position: "top-right",
    });
  };



  return (
    <div className="max-w-full mx-auto">
      <div
        className="flex flex-col md:flex-row items-start md:items-center w-full justify-center p-3  space-x-2 border-b border-[#E9EBF0]
"
      >
        <Image
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCADSALIDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAQACAwT/xAAWEAEBAQAAAAAAAAAAAAAAAAAAARH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APEklEkQRBAkGAWoIYBIIFJAAUDLNaooM1mtVmgyiACSApIEUQRDUBQxQyAYYpDICKw4CRxAyK0KDNZrVFBis1us0GQagCSApIEUYCjUgjUgKRqRSGQFI1IpGpAGHDhwGcWNYMBnBW8ZsBis1us0GKK1WaDNDVABFAkiCMUMAwyKRqQFI1IpGpAUhkMhkBYsOHAZxY1gwGbGbG7BYDFYrpYxQYrNbrNBmhqgGUUCRQGGCNQDGpBGoBkakUjUgKRqRSGQFhxYcBnFjQBmxmt1mgxWK6VigxWa3WaDFDVABFACiCjUEagGNxmNQGo1BGoBhihgFIgA0AZrNaooMVit1mgxWa3WaDFDVABFACUCjUEagGNQRqAY3GY1AMaZjQFJIIEVQVmtVmgzWa1WaDFFarNBmhqgAkgOIoFDEQMajMagNRqMRqA1CzGgJZIEIAqzSKDNZrVFBiitVmgyGgARQFFAkiCjUZhBqFk6DWnWdOg1pZ1aDSGjQIqACims0BWa1RQZRABFA0igCIBEICdZWg3q1nVoN6dY06DWpnToELQCBACggACASSB0RAAFAAQCWgaDWnWNOg1p1jToN6tZ06B1DUBCQIJAEkCSQOiIACkUGaKazQQ1ADq1nVoN6tZ06DWnWSDRZIFBAkkASQJJA6pIGaKaKDNZrVZoM0GsgkkBLJBqEGASCBQIJJAEkCSQOtSQM0VIGKKkDNZSBJIEUgLUSAlIEUgSSAJIEkgf/9k="
          src="/unilag.png"
          alt=""
          className=""
          width={60}
          height={60}
        />
        <h1 className=" text-[#333333] hidden md:block font-semibold leading-9 text-xl text-center">
          Department of History, University of lagos
        </h1>
      </div>
      <div className="w-full py-2 ">
        <div className="w-full flex flex-col justify-center md:items-center space-y-4 p-2 my-4">
          <h1 className="md:hidden text-center font-semibold text-3xl">
            Department of History, University of lagos
          </h1>
          <h2 className="text-center md:max-w-[600px] text-[#667085] text-sm font-normal">
            Welcome to the department of history final year varsity jacket sign
            out designs, please select your preferred design choice for your
            jacket below
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 p-2 gap-y-3 md:p-10 md:px-16 md:gap-x-3">
          <div className="md:col-span-1 flex justify-center md:justify-end items-start h-full">
            <div className="overflow-hidden flex flex-row justify-center items-center  max-w-[80%] md:max-w-[80px] space-x-2 md:flex-col md:space-y-3 border border-[#DDDDDD] p-2 rounded md:rounded-none md:p-4">
              {jackets.map((jacket, i) => (
                <JacketCard
                  key={i}
                  id={i}
                  jacket={jacket}
                  setSelectedJacket={setSelectedJacket}
                  selectedJacket={selectedJacket}
                  selectedColor={selectedColor}
                />
              ))}

              <button
                onClick={() => reset()}
                className="border flex items-center justify-center p-1 px-2 hover:bg-red-500 group"
              >
                <span className="text-[#666666] group-hover:text-white text-xs font-semibold">
                  Reset
                </span>
              </button>
            </div>
          </div>

          <div className="col-span-7  md:px-10  ">
            {jackets.length > 0 && (
              <Slider {...settings}>
                {jackets[selectedJacket][selectedColor] &&
                  jackets[selectedJacket][selectedColor].map((jacket, i) => (
                    <div key={i} className=" !flex items-center justify-center">
                      <div className="relative w-[380px] h-[380px]">
                        {/* <img
                          placeholder="blur"
                          src={`/${encodeURIComponent(jacket)}`}
                          alt=""
                          className="object-fit "
                        /> */}
                        <Image
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCADSALIDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAQACAwT/xAAWEAEBAQAAAAAAAAAAAAAAAAAAARH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APEklEkQRBAkGAWoIYBIIFJAAUDLNaooM1mtVmgyiACSApIEUQRDUBQxQyAYYpDICKw4CRxAyK0KDNZrVFBis1us0GQagCSApIEUYCjUgjUgKRqRSGQFI1IpGpAGHDhwGcWNYMBnBW8ZsBis1us0GKK1WaDNDVABFAkiCMUMAwyKRqQFI1IpGpAUhkMhkBYsOHAZxY1gwGbGbG7BYDFYrpYxQYrNbrNBmhqgGUUCRQGGCNQDGpBGoBkakUjUgKRqRSGQFhxYcBnFjQBmxmt1mgxWK6VigxWa3WaDFDVABFACiCjUEagGNxmNQGo1BGoBhihgFIgA0AZrNaooMVit1mgxWa3WaDFDVABFACUCjUEagGNQRqAY3GY1AMaZjQFJIIEVQVmtVmgzWa1WaDFFarNBmhqgAkgOIoFDEQMajMagNRqMRqA1CzGgJZIEIAqzSKDNZrVFBiitVmgyGgARQFFAkiCjUZhBqFk6DWnWdOg1pZ1aDSGjQIqACims0BWa1RQZRABFA0igCIBEICdZWg3q1nVoN6dY06DWpnToELQCBACggACASSB0RAAFAAQCWgaDWnWNOg1p1jToN6tZ06B1DUBCQIJAEkCSQOiIACkUGaKazQQ1ADq1nVoN6tZ06DWnWSDRZIFBAkkASQJJA6pIGaKaKDNZrVZoM0GsgkkBLJBqEGASCBQIJJAEkCSQOtSQM0VIGKKkDNZSBJIEUgLUSAlIEUgSSAJIEkgf/9k="
                          src={`/${encodeURIComponent(jacket)}`}
                          alt=""
                          fill
                          className="object-fit "
                        />
                      </div>
                    </div>
                  ))}
              </Slider>
            )}
            <div className="w-full flex flex-col items-center space-y-4 justify-center my-10  ">
              <p className="text-center font-semibold text-2xl">Select Color</p>
              <div className="border p-2 rounded-md bg-white shadow-lg">
                <CirclePicker
                  colors={[
                    "#000000",
                    "#1879ae",
                    "#562b25",
                    "#1d9533",
                    "#ef331a",
                  ]}
                  onChange={(color) => setSelectedColor(color.hex)}
                  color={selectedColor}
                />
              </div>
            </div>
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="col-span-4 flex flex-col p-2  mb-5 md:mb-0 space-y-3 h-full items-center "
          >
            <div className="border rounded-md border-[#DDDDDD]  w-full">
              <Accordion alwaysOpen={true} flush={true}>
                <Accordion.Panel className="!py-2">
                  <Accordion.Title>
                    <span className="font-semibold text-black">
                      Select Size
                    </span>
                  </Accordion.Title>
                  <Accordion.Content className="">
                    <ul className="w-full text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      {sizes.map((size, i) => (
                        <li
                          key={i}
                          className={`${
                            selectedSize === size.value
                              ? "bg-[#EFF4FF]"
                              : "bg-white"
                          } p-2  drop-shadow-sm flex items-center justify-between w-full rounded `}
                          onClick={(e) => setSelectedSize(size.value)}
                        >
                          <label
                            htmlFor={`size-${size.value}`}
                            className="w-full font-semibold text-[16px] leading-4 text-black dark:text-gray-300"
                          >
                            {size.name}
                            <span className="uppercase ml-1 text-[#2970FF]">
                              ({size.value})
                            </span>
                          </label>
                          {selectedSize === size.value ? (
                            <Checked />
                          ) : (
                            <Unchecked />
                          )}
                        </li>
                      ))}
                    </ul>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </div>
            <div className="w-full my-4 p-2 md:p-0">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-[#333333] dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                required
                id="name"
                name="name"
                onChange={(e) => setName(e.currentTarget.value)}
                value={name}
                placeholder="Enter full name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="w-full my-4 p-1 md:p-0">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-[#333333] dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.currentTarget.value)}
                value={email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="w-full my-4 p-1 md:p-0">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-[#333333] dark:text-white"
              >
                Phone Number
              </label>
              <PhoneInput
                defaultCountry="NG"
                placeholder="Enter phone number"
                value={phone}
                onChange={setPhone}
              />
            </div>
            <div className="py-5 md:my-0 w-full">
              {" "}
              <button
                type="submit"
                disabled={loading}
                className="text-white flex justify-center w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3   dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                {loading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
      {typeof window !== "undefined" && (
        <Modal size="md" popup={true} show={showModal} onClose={onClose}>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <BsCheckCircle className="mx-auto mb-4 h-14 w-14 text-[#1FAF38] dark:text-gray-200" />
              <h3 className="mb-5 text-2xl font-medium text-[#333333] dark:text-gray-400">
                Submitted Successfully
              </h3>
              <p className="flex items-center space-x-1 justify-center text-center my-2 text-sm font-normal text-[#667085] dark:text-gray-400">
                Confirmation ID:{" "}
                <span className="text-[#2970FF]">{result?.order_id}</span>{" "}
                <button color="gray" onClick={() => copyText()}>
                  <MdContentCopy />
                </button>
              </p>
              <p className="my-3 text-sm text-[#667085] text-center font-medium">
                Thank you for your time! 🙂. Kindly Pay your final year jacket
                money to your class representative before the deadline. Click
                the button below to share your confirmation ID to your class
                representative
              </p>

              <div className="flex justify-center gap-4">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://wa.me/2348181493942?text=Hello%2C+I+want+to+book+my+custom+varsity+jacket%2C+my+Confirmation+ID+is+${result?.order_id}`}
                >
                  <button className=" flex justify-center bg-[#1FAF38]  w-[280px] my-5 h-12 p-1 rounded cursor-pointer items-center space-x-2">
                    <Whatsapp className="mr-2" />{" "}
                    <span className="text-white font-bold text-lg">
                      Whatsapp
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {typeof window !== "undefined" && (
        <Modal
          size="md"
          popup={true}
          show={showErrorModal}
          onClose={onErrorClose}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <FaTimesCircle className="mx-auto mb-4 h-14 w-14 text-[#F04438] dark:text-gray-200" />
              <h3 className="mb-5 text-2xl font-medium text-[#333333] dark:text-gray-400">
                Submission Failed
              </h3>

              <p className="my-3 text-sm text-[#667085] text-center font-medium">
                Something went wrong. Click the button below to try again
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => onErrorClose()}
                  className=" flex justify-center bg-[#2970FF]  w-[250px] my-5 h-12 p-1 rounded cursor-pointer items-center space-x-2"
                >
                  <span className="text-white font-bold text-lg">
                    Try again
                  </span>
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default Index;

export const getServerSideProps = async ({ req, res }) => {
  const { origin } = absoluteUrl(req);
  const { data: products } = await axios.get(origin + "/api/products");

  return {
    props: {
      jackets: products,
      base_url: origin,
    },
  };
};
