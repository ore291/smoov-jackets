import Link from "next/link";

export function OrderCard({ order }) {
  return (
    <>
  
      <a
        className="block p-2 md:max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-3"
        key={order.id}
      >
        <h5 className="mb-2 text-2xl capitalize font-normal tracking-tight text-gray-900 dark:text-white">
          {order.name}
        </h5>
        <table className="table-auto">
          
          <tbody>
            <tr>
              <td className="font-normal">Design:</td>
              <td>{order.product_id} </td>
      
            </tr>
            <tr>
              <td>Phone:</td>
              <td>{order.phone}</td>
      
            </tr>
            <tr>
              <td>Email:</td>
              <td>{order.email}</td>
            </tr>
            <tr>
              <td>Order ID:</td>
              <td>{order.order_id}</td>
            </tr>
            <tr>
              <td>Size:</td>
              <td className="uppercase font-bold ">{order.size}</td>
            </tr>
            <tr>
              <td>Color:</td>
              <td className={`uppercase font-bold `} style={{color: order.color}}>{order.color}</td>
            </tr>
            <tr>
              <td>Order Date:</td>
              <td className="uppercase  ">{new Date(order.order_date).toDateString()}</td>
            </tr>
            <tr>
              <td>Department:</td>
              <td className=" ">{order.dept_name}</td>
            </tr>
          </tbody>
        </table>

        {/* <p className="font-normal text-gray-800 dark:text-gray-100 text-xl">
          Phone: 
        </p>
        <p className="font-normal text-gray-800 dark:text-gray-100 text-xl">
          Email: {order.email}
        </p>
        <p className="font-normal text-gray-800 dark:text-gray-100 text-xl">
          Order ID: {order.order_id}
        </p>
        <div className="flex items-center justify-between w-full">
          <p className="font-normal text-gray-800 dark:text-gray-100 text-xl">
            Size: {order.size}
          </p>
          <p className="font-normal text-gray-800 dark:text-gray-100 text-xl">
            Color: {order.color}
          </p>
        </div>

        <p className="font-normal text-gray-800 dark:text-gray-100 text-xl">
          Order Date: {new Date(order.order_date).toDateString()}
        </p>
        <p className="font-normal text-gray-800 dark:text-gray-100 text-xl">
          Department: {order.dept_name}
        </p> */}
      </a>
    </>
  );
}
