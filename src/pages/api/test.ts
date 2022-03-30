import nc from "next-connect";

const handler = nc();

// handler.get(async (req, res) => {
//   const _id = req.query.id;
//   console.log(req);
  
//   const query = `*[_type == "Product" && _id == $id] [0]`;
//   const queryParams = { _id };

//   const product = await client.fetch(query, queryParams);

//   res.send(product);
// });

handler.get((req,res) => {
  res.send("HelloWorld")
})  

export default handler