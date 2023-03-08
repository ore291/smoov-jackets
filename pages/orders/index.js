import axios from "axios";
import { Layout } from "components/Layout";
import { OrderCard } from "components/OrderCard";
import { ProductCard } from "components/ProductCard";

function OrdersPage({ orders = [] }) {
  const renderProducts = () => {
    if (orders.length === 0) return <h1>No orders</h1>;
    return orders.map((order) => <OrderCard key={order.id} order={order} />);
  };

  return (
    <div className="p-2 md:p-5">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderProducts()}
      </div>
    </div>
  );
}

export default OrdersPage;

export const getServerSideProps = async () => {
  const { data: orders } = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders,
    },
  };
};
