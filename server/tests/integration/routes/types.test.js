import request from "supertest";
import mongoose from "mongoose";

import { Type } from "../../../models/type.js";
import { User } from "../../../models/user.js";
import { Category } from "../../../models/category.js";
import { Item } from "../../../models/item.js";
import svr from '../../../index.js'

let server;
describe("/api/types", () => {
  beforeEach(() => {
    server = svr;
  });

  afterEach(async () => {
      await Type.remove({});
      await Item.remove({});
      await Category.remove({});
    server.close();
  });
  describe("GET /", () => {
    it("should return all types", async () => {
      await Type.collection.insertMany([{ name: "type1" }, { name: "type2" }]);

      const res = await request(server).get("/api/types");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((t) => t.name === "type1")).toBeTruthy();
      expect(res.body.some((t) => t.name === "type2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return type if valid id is passed", async () => {
      const type = new Type({ name: "type1" });
      await type.save();

      const res = await request(server).get(`/api/types/${type._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", type.name);
    });
    it("should return 404 if invalid id is passed", async () => {
      const type = new Type({ name: "type1" });
      await type.save();

      const res = await request(server).get(`/api/types/1234`);

      expect(res.status).toBe(404);
    });
    it("should return 404 if type with the given id is not found", async () => {
      const id = mongoose.Types.ObjectId().toHexString();

      const type = new Type({ name: "type1" });
      await type.save();

      const res = await request(server).get(`/api/types/${id}`);

      expect(res.status).toBe(404);
    });
  });
  describe("POST /", () => {
    let token;
    let name;

    const exec = () => {
      return request(server)
        .post("/api/types")
        .set("x-auth-token", token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User({ isAdmin: true }).generateAuthToken();
      name = "type1";
    });

    it("should return 400 if input is invalid", async () => {
      name = 123;

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if input is less than 3 characters", async () => {
      name = "12";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if input is more than 50 characters", async () => {
      name = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 401 if user is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });
    it("should return 403 if user is not admin", async () => {
      token = new User({ isAdmin: false }).generateAuthToken();

      const res = await exec();

      expect(res.status).toBe(403);
    });
    it("should return type if user is logged in and input is valid", async () => {
      await exec();

      const type = Type.find({ name });

      expect(type).toHaveProperty("name", type.name);
      expect(type).not.toBeNull();
    });
    it("should return type in response if user is logged in and input is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", name);
    });
  });
  describe("PUT /", () => {
    let token;
    let newName;
    let id;
    let type;
    let category;
    let item;
    let itemId;

    const exec = () => {
      return request(server)
        .put(`/api/types/${id}`)
        .set("x-auth-token", token)
        .send({ name: newName });
    };
    beforeEach(async () => {
      token = new User({ isAdmin: true }).generateAuthToken();
      type = new Type({ name: "type1" });
      await type.save();

      category = new Category({ name: "category1" });
      await category.save();

      item = new Item({
        name: "item1",
        type,
        category,
        price: 13,
      });
      item.save();

      id = type._id;
      itemId = item._id;
      newName = "updatedName";
    });

    it("should return 400 if input is invalid", async () => {
      newName = 1234;

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if input is less than 3 characters", async () => {
      newName = "12";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if input is more than 50 characters", async () => {
      newName = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 401 if user is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });
   
    it("should return 404 if id is invalid", async () => {
      id = "1234";

      const res = await exec();

      expect(res.status).toBe(404);
    });
    it("should return 404 if type with the given id is not found", async () => {
      id = mongoose.Types.ObjectId().toHexString();

      const res = await exec();
      expect(res.status).toBe(404);
    });
    it("should return updated type if input is valid", async () => {
      const res = await exec();

      const updatedType = await Type.findById(id);

      expect(res.status).toBe(200);
      expect(updatedType.name).toBe(newName);
    });
    it("should return response with updated type if input is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", newName);
    });
    it("should return item with updated type if input is valid", async () => {
      await exec();

      const updatedItem = await Item.findById(itemId);

      expect(updatedItem.type.name).toBe(newName);
    });
  });
  describe("DELETE /", () => {
    let token;
    let id;
    let type;
    let category;
    let item;
    let itemId;

    beforeEach(async () => {
      token = new User({ isAdmin: true }).generateAuthToken();
      type = new Type({ name: "type1" });
      await type.save();

      category = new Category({ name: "category1" });
      await category.save();

      item = new Item({
        name: "item1",
        type,
        category,
        price: 13,
      });
      item.save();

      id = type._id;
      itemId = item._id;
    });

    const exec = () => {
      return request(server)
        .delete(`/api/types/${id}`)
        .set("x-auth-token", token)
        .send();
    };
    it("should return 401 if user is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });
    it("should return 403 if user is not admin", async () => {
      token = new User({ isAdmin: false }).generateAuthToken();

      const res = await exec();

      expect(res.status).toBe(403);
    });
    it("should return 404 if id is invalid", async () => {
      id = "1234";

      const res = await exec();

      expect(res.status).toBe(404);
    });
    it("should return 404 if type with the given id is not found", async () => {
      id = mongoose.Types.ObjectId().toHexString();

      const res = await exec();
      expect(res.status).toBe(404);
    });
    it("should delete type if id is valid", async () => {
      await exec();

      const deletedType = await Type.findById(id);

      expect(deletedType).toBeNull();
    });

    it("should return response of deleted type if id is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        _id: type._id.toHexString(),
        name: type.name,
      });
    });
    it("should delete item with deleted type if id is valid", async () => {
      await exec();

      const deletedItem = await Item.findById(itemId);

      expect(deletedItem).toBeNull();
    });
  });
});
