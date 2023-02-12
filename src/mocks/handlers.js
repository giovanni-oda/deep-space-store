import { rest } from "msw";
import productsData from "./data/products";
import mockedZip from "./data/viaCepResponse.json";

export const handlers = [
  // fetch offer by id
  rest.get("https://api.deepspacestore.com/offers/:code", (req, res, ctx) => {
    const { code } = req.params;
    const prodObj = productsData.find((obj) => obj.id == code);
    // console.log("prodObj", prodObj);
    return res(ctx.status(200), ctx.delay(700), ctx.json(prodObj));
  }),

  // fetch cep mocking viacep service
  rest.get("https://viacep.com.br/ws/:zipcode/json/", async (req, res, ctx) => {
    const { zipcode } = req.params;
    const cep = `${zipcode.substring(0, 5)}-${zipcode.substring(
      zipcode.length - 3
    )}`;
    return res(
      ctx.status(200),
      ctx.delay(700),
      ctx.json({
        cep: cep,
        ...mockedZip,
      })
    );
  }),

  // post offer order
  rest.post(
    "https://api.deepspacestore.com/offers/:code/create_order",
    async (req, res, ctx) => {
      const { code } = req.params;
      const orderData = await req.json();
      // console.log("orderData", orderData);
      const { cpf } = orderData;
      let resCode = null;
      let resBody = {};
      if (!code || !orderData || !cpf || cpf === "00000000000") {
        resCode = 403;
        resBody = { error: true, errorMessage: "CPF is invalid" };
      } else {
        resBody = {
          successMessage: "Payment Processed",
          paymentStatus: "PAID",
        };
        resCode = 200;
      }
      return res(ctx.status(resCode), ctx.delay(1000), ctx.json(resBody));
    }
  ),

  // fallback in case the fakestoreapi is down
  rest.get("https://fakestoreapi.com/products", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(700), ctx.json(productsData));
  }),
  rest.get("https://fakestoreapi.com/products/:code", (req, res, ctx) => {
    const { code } = req.params;
    const prodObj = productsData.find((obj) => obj.id == code);
    return res(ctx.status(200), ctx.delay(700), ctx.json(prodObj));
  }),
];
