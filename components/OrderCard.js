import Link from "next/link";

export function OrderCard({ order }) {
  return (
    <>
      <a
        className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-3"
        key={order.id}
      >
        <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
          {order.name}
        </h5>
        <p className="font-normal text-gray-800 dark:text-gray-100 text-xl">
          Order ID: {order.order_id}
        </p>
        <p className="font-normal text-gray-800 dark:text-gray-100 text-xl">
          Size: {order.size}
        </p>
        <p className="font-normal text-gray-800 dark:text-gray-100 text-xl">
          Color: {order.color}
        </p>
        <p className="font-normal text-gray-800 dark:text-gray-100 text-xl">
          Order Date: {new Date(order.order_date).toDateString()}
        </p>
      </a>
    </>
  );
}
