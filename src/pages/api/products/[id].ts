import nc from "next-connect";
import client from "@utils/client";

const handler = nc();

handler.get(async (req, res) => {
  const id = req.query.id;

  const query = `*[_type == "Product" && _id == $id] [0]`;
  const queryParams = { id };

  const product = await client.fetch(query, queryParams);
  
  res.send(product);
});

export default handler