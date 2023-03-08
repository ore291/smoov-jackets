import { pool } from "config/db";

const orderid = require('order-id')('smoov');


export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getOrders(req, res);
    case "POST":
      return await saveOrder(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const getOrders = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM orders");
    return res.status(200).json(results);
  } catch (error) {
    console.log("erreur eds");
    return res.status(500).json({ error });
  }
};

const saveOrder = async (req, res) => {
  try {
    const { name, size, color } = req.body;

    const order_id = orderid.generate()

    const result = await pool.query("INSERT INTO orders SET ?", {
      name : name,
      size : size,
      order_id: order_id,
      color: color
    });

    return res.status(200).json({ ...req.body, id: result.insertId , order_id: order_id});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
