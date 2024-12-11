import axios from "axios";

const URL = "https://api.shipnow.com.ar";

const apiToken = "cc5ghy7uhqYujQQ9cNZ8EHppeQO3VYmpdItx9HwgXSowIN4pNw";

const getShipnowPrice = async (weight: Number, zip_code: Number) => {
  const response = await axios(
    `${URL}/shipping_options?weight=${weight}&to_zip_code=${zip_code}&types=ship_pap`,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  // console.log(response.data)
  // console.log(response.data.results[0].tax_price);
  return response.data.results[0].tax_price;
};

export default getShipnowPrice;
