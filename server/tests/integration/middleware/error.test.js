import svr from '../../../index.js'
import request from "supertest";
import { Category } from "../../../models/category.js";
import {User }  from "../../../models/user.js";
let server;

describe("Error middleware", () => {
  beforeEach(() => {
    server = svr;
  });

  afterEach(async () => {
    server.close();
    await Category.remove({});
  });

  it("should return 500 if id is invalid", async () => {
    const category = new Category({ name: "category1" });
    await category.save();

    const token = new User({ isAdmin: true }).generateAuthToken();
    const res = await request(server)
      .delete(`/api/categories/1234`)
      .set("x-auth-token", token)
      .send();
    expect(res.status).toBe(500);
  });
});
