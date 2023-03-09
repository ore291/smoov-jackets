import axios from "axios";
import JacketCard from "components/JacketCard";
import { Layout } from "components/Layout";
import { ProductCard } from "components/ProductCard";
import { Button, Modal } from "flowbite-react";
import Image from "next/legacy/image";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function Index({ products = [] }) {
  const renderProducts = () => {
    if (products.length === 0) return <h1>No Products</h1>;
    return products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  const [selectedSize, setSelectedSize] = useState("md");
  const [selectedColor, setSelectedColor] = useState("black");
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
  };

  const sizes = [
    { name: "Small", value: "sm" },
    { name: "Medium", value: "md" },
    { name: "Large", value: "lg" },
    { name: "Extra Large", value: "xl" },
    { name: "Double Extra Large", value: "xxl" },
  ];

  const colors = [
    { name: "Black", value: "black" },
    { name: "White", value: "white" },
  ];

  const [selectedJacket, setSelectedJacket] = useState(0);
  const [result, setResult] = useState(null);

  const jackets = ["red", "blue", "yellow", "indigo"];

  const reset = () => {
    setSelectedSize("md");
    setSelectedColor("black");
    setName("");
    setSelectedJacket(0);
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (name.length < 2) {
      return toast.error("FullName is required", {
        position: "top-right",
      });
    }
    try {
      setLoading(true);
      const res = await axios.post("/api/orders", {
        size: selectedSize,
        color: selectedColor,
        name: name,
      });

      if (res.status == 200) {
        setResult(res.data);
        setLoading(false);
        toast.success("Order Saved", {
          position: "top-right",
        });
        reset();
        setShowModal(true);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      
    }
  };

  const copyText = ()=>{
    navigator.clipboard.writeText(result.order_id);
    toast.success("Copied", {
      position: "top-right",
    });
  }

  return (
    <div className="max-w-full mx-auto">
      <div
        className="flex flex-col md:flex-row items-center w-full justify-center p-2 md:py-4 space-x-2 border-b border-[#E9EBF0]
"
      >
        <Image src="/unilag.png" alt="" className="" width={60} height={60} />
        <h1 className=" text-[#333333] font-semibold leading-9 text-xl text-center">
          Department of History, University of lagos
        </h1>
      </div>
      <div className="w-full py-2 ">
        <div className="w-full flex justify-center">
          <h2 className="text-center md:w-[400px] text-[#666666] text-sm font-medium">
            Welcome to the department of history final year varsity jacket sign
            out designs, please select your preferred design choice for your
            jacket below
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 p-1 gap-y-3 md:p-5">
          <div className="col-span-2 flex justify-center md:justify-end items-center h-full">
            <div className="flex flex-row justify-center items-center w-full md:max-w-[80px] space-x-2 md:flex-col md:space-y-3 md:border md:border-[#DDDDDD] p-4">
              {jackets.map((jacket, i) => (
                <JacketCard
                  key={i}
                  id={i}
                  setSelectedJacket={setSelectedJacket}
                  selectedJacket={selectedJacket}
                />
              ))}

              <button
                onClick={() => reset()}
                className="border hidden md:flex items-center justify-center p-1 px-2 hover:bg-red-500 group"
              >
                <span className="text-[#666666] group-hover:text-white text-xs font-semibold">
                  Reset
                </span>
              </button>
            </div>
          </div>

          <div className="col-span-7">
            <div className="w-full flex justify-center">
              <Image
                src={`/jacket.png`}
                alt=""
                width={400}
                height={450}
                className="object-cover"
              />
            </div>
          </div>
          <div className="col-span-3 flex flex-col space-y-2 h-full items-center ">
            <div className="border rounded-md border-[#DDDDDD] p-2 md:p-4 w-full">
              <h3 className="mb-4 font-semibold text-[#666666] pb-1 dark:text-white border-b border-gray-200 ">
                Select Size
              </h3>
              <ul className="w-full text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {sizes.map((size, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between w-full border-b border-gray-200  dark:border-gray-600"
                  >
                    <label
                      htmlFor={`size-${size.value}`}
                      className="w-full py-2 ml-2 text-sm font-light text-[#666666] dark:text-gray-300"
                    >
                      {size.name}
                    </label>
                    <input
                      id={`size-${size.value}`}
                      name="size"
                      type="radio"
                      checked={selectedSize === size.value}
                      value={size.value}
                      onChange={(e) => setSelectedSize(e.currentTarget.value)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full my-4 p-1 md:p-0">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-[#666666] dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.currentTarget.value)}
                value={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => handleSubmit()}
              type="button"
              disabled={loading}
              className="text-white flex justify-center w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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

            {/* <div className="border rounded-md border-[#DDDDDD] p-2 md:p-4 w-full">
              <h3 className="mb-4 font-semibold text-[#666666] pb-1 dark:text-white border-b border-gray-200 ">
                Select Color
              </h3>

              <div>
                <select
                  id="color"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0  block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 "
                >
                  {colors.map((color, i) => (
                    <option
                      key={i}
                      defaultValue
                      value={color.value}
                      onChange={(e) => setSelectedColor(e.currentTarget.value)}
                      className="  bg-gray-100 border-gray-300  focus:ring-0 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500"
                    >
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Toaster />
      {typeof window !== "undefined" && result !== null && (
        <React.Fragment>
          <Modal size="md" popup={true} show={showModal} onClose={onClose}>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Order Confirmed
                </h3>
                <h3 className="my-5 text-2xl font-normal text-black dark:text-gray-400">
                  Order ID: {result.order_id}
                </h3>

                <div className="flex justify-center gap-4">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://wa.me/2348181493942?text=Hello%2C+I+want+to+book+my+custom+varsity+jacket%2C+my+order+ID+is+${result.order_id}`}
                  >
                    <Button color="success">Message Course Rep</Button>
                  </a>
                  <Button
                    color="gray"
                    onClick={() => copyText()}
                  >
                    Copy ID
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </React.Fragment>
      )}
    </div>
  );
}

export default Index;

export const getServerSideProps = async () => {
  const { data: products } = await axios.get(
    "/api/products"
  );

  return {
    props: {
      products,
    },
  };
};

// <ul className="w-full text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
// {colors.map((color, i) => (
//   <li
//     key={i}
//     className="flex items-center justify-between w-full border-b border-gray-200  dark:border-gray-600"
//   >
//     <label
//       htmlFor={`size-${color.value}`}
//       className="w-full py-2 ml-2 text-sm font-light text-[#666666] dark:text-gray-300"
//     >
//       {color.name}
//     </label>
//     <input
//       id={`size-${color.value}`}
//       name="size"
//       type="radio"
//       defaultValue
//       value={color.value}
//       onChange={(e) => setSelectedSize(e.currentTarget.value)}
//       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500"
//     />
//   </li>
// ))}
// </ul>
