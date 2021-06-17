import request from 'supertest';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";

import svr from '../../../index.js'
import { User }  from  "../../../models/user.js";

let server;
describe("/api/auth", () => {
  beforeEach(() => {
    server = svr;
  });

  afterEach(async () => {
      await User.remove({});
      server.close();
  });

  let email;
  let password;
  let user;

  const exec = () => {
    return request(server).post("/api/auth").send({ email, password });
  };
  beforeEach(async () => {
    email = "user1@domain.com";
    password = "12345";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ email, password: hashedPassword });
    await user.save();
  });
  it("should return 400 if email is invalid", async () => {
    email = "1234";

    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return 400 if email has more than 50 characters", async () => {
    const newEmail = new Array(50).join("a");
    email = newEmail;

    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return 400 if user with the given email is not found", async () => {
    email = "user2@domain.com";

    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return 400 if password is invalid", async () => {
    password = "123456";

    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return 400 if password is less than 5 characters", async () => {
    password = "1234";

    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return 200 if password is less than 5 characters", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
  it("should return valid token if email and password is valid", async () => {
    const res = await exec();

    const token = res.text;
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));

    expect(decoded).not.toBeNull();
    expect(decoded).toHaveProperty("_id");
    expect(decoded).toHaveProperty("email", email);
  });
});
