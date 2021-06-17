import request from "supertest";
import jwt from "jsonwebtoken";
import config from "config";

import { User } from "../../../models/user.js";
import svr from '../../../index.js'

let server;
describe("/api/register", () => {
  beforeEach(() => {
    server = svr;
  });
  afterEach(async () => {
    server.close();
    await User.remove({});
  });

  let token;
  let email;
  let password;

  const exec = () => {
    return request(server)
      .post("/api/users")
      .set("x-auth-token", token)
      .send({ email, password });
  };
  beforeEach(() => {
    token = new User({ isAdmin: true }).generateAuthToken();
    email = "user1234@domain.com";
    password = "12345";
  });
  it("should return 401 if user is not logged in", async () => {
    token = "";

    const res = await exec();

    expect(res.status).toBe(401);
  });
  it("should return 403 if user is not admin ", async () => {
    token = new User({ isAdmin: false }).generateAuthToken();

    const res = await exec();

    expect(res.status).toBe(403);
  });
  it("should return 400 if email is invalid ", async () => {
    email = "12345";

    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return 400 if email is more than 50 characters ", async () => {
    const username = new Array(51).join("a");
    email = `${username}@domain.com`;

    const res = await exec();
    expect(res.status).toBe(400);
  });
  it("should return 400 if password is less than 5 characters ", async () => {
    password = "1234";

    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return 400 if email is already registered ", async () => {
    const user = new User({ email, password });
    await user.save();

    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return registered user if input is valid", async () => {
    await exec();

    const user = User.find({ email });

    expect(user).not.toBeNull();
  });
  it("should return response with registered user if input is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("email", email);
  });
  it("should return header with valid token if input is valid", async () => {
    const res = await exec();

    const tokenReceived = res.header["x-auth-token"];
    const decoded = jwt.verify(tokenReceived, config.get('jwtPrivateKey'));

    expect(decoded).toHaveProperty("_id");
    expect(decoded).toHaveProperty("email", email);
  });
});
