import svr from '../../../index.js';
import request from 'supertest';
import {Category} from '../../../models/category.js';
import { User } from "../../../models/user";

let server;
describe("Auth middleware", () => {
  beforeEach(() => {
    server = svr;
  });

  afterEach(async () => {
    await Category.remove({});
    server.close();
  });

  let token;
  const exec = () => {
    return request(server)
      .post("/api/categories")
      .set("x-auth-token", token)
      .send({ name: "category1" });
  };

  beforeEach(() => {
    token = new User({isAdmin:true}).generateAuthToken();
  });
  it("should return 401 if no token provided", async () => {
    token = "";

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});
