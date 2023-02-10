import { rest } from "msw";
import productsData from "./data/products";

export const handlers = [
  // fetch offer by id
  rest.get("https://api.deepspacestore.com/offers/:code", (req, res, ctx) => {
    const { code } = req.params;
    const prodObj = productsData.find((obj) => obj.id == code);
    // console.log("prodObj", prodObj);
    return res(ctx.status(200), ctx.json(prodObj));
  }),

  // fetch cep mocking viacep service
  rest.get("https://viacep.com.br/ws/:zipcode/json/", (req, res, ctx) => {
    const { zipcode } = req.params;
    const cep = `${zipcode.substring(0, 5)}-${zipcode.substring(
      zipcode.length - 3
    )}`;
    return res(
      ctx.status(200),
      ctx.json({
        cep: cep,
        logradouro: "Praça da Sé",
        complemento: "lado ímpar",
        bairro: "Sé",
        localidade: "São Paulo",
        uf: "SP",
        ibge: "3550308",
        gia: "1004",
        ddd: "11",
        siafi: "7107",
      })
    );
  }),

  // post offer order
  rest.post(
    "https://api.deepspacestore.com/offers/:code/create_order",
    async (req, res, ctx) => {
      const { code } = req.params;
      const oderData = await req.json();
      console.log("code", code);
      console.log("oderData", oderData);
      return res(
        // Respond with a 200 status code
        ctx.status(200)
      );
    }
  ),
];
