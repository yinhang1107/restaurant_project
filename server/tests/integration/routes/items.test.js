import request from "supertest"
import mongoose from "mongoose"

import { Type } from "../../../models/type"
import { Category } from "../../../models/category"
import { Item } from "../../../models/item"
import { User } from "../../../models/user"
import svr from '../../../index.js'

let server;
describe("/api/items", () => {
  beforeEach(() => {
    server = svr;
  });

  afterEach(async () => {
      await Item.remove({});
      await Type.remove({});
      await Category.remove({});
      server.close();
  });
  describe("GET /", () => {
    it("should return all items", async () => {
      await Item.collection.insertMany([
        {
          name: "item1",
          category: new Category({ name: "category1" }),
          price: 13,
          type: new Type({ name: "type1" }),
        },
        {
          name: "item2",
          category: new Category({ name: "category2" }),
          price: 10,
          type: new Type({ name: "type2" }),
        },
      ]);
      const res = await request(server).get("/api/menu");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((i) => i.name === "item1")).toBeTruthy();
      expect(res.body.some((i) => i.name === "item2")).toBeTruthy();
    });
  });
  describe("GET /:id", () => {
    it("should return items if valid id is passed", async () => {
      const item = new Item({
        name: "item1",
        category: new Category({ name: "category1" }),
        price: 13,
        type: new Type({ name: "type1" }),
      });
      await item.save();

      const res = await request(server).get(`/api/menu/${item._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id", item._id.toHexString());
      expect(res.body).toHaveProperty("name", item.name);
      expect(res.body).toHaveProperty("category.name", item.category.name);
      expect(res.body).toHaveProperty("price", item.price);
      expect(res.body).toHaveProperty("type.name", item.type.name);
    });
    it("should return status code 404 not found if invalid id is passed", async () => {
      const res = await request(server).get(`/api/menu/1234`);

      expect(res.status).toBe(404);
    });
    it("should return status code 404 if no item with the given id is found", async () => {
      const _id = mongoose.Types.ObjectId().toHexString();

      const res = await request(server).get(`/api/categories/${_id}`);

      expect(res.status).toBe(404);
    });
  });
  describe("POST /", () => {
    let token;
    let name;
    let categoryId;
    let typeId;
    let price;

    const exec = () => {
      return request(server)
        .post("/api/menu")
        .set("x-auth-token", token)
        .send({ name, categoryId, typeId, price });
    };
    beforeEach(async () => {
      token = new User({ isAdmin: true }).generateAuthToken();
      let type = new Type({ name: "type1" });
      let category = new Category({ name: "category1" });
      await type.save();
      await category.save();

      typeId = type._id;
      categoryId = category._id;
      name = "item1";
      price = 13;
    });
    it("should return 401 if user is not logged in", async () => {
      token = "";
      const res = await exec();

      expect(res.status).toBe(401);
    });
    it("should return 403 if user is not an admin", async () => {
      token = new User({ isAdmin: false }).generateAuthToken();

      const res = await exec();

      expect(res.status).toBe(403);
    });
    it("should return 400 if name of item is less than 3 characters", async () => {
      name = "12";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if name of item is more than 100 characters", async () => {
      name = new Array(102).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if price of item is not number", async () => {
      price = "abcd";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if category id is invalid", async () => {
      categoryId = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if category id is invalid", async () => {
      categoryId = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if type id is invalid", async () => {
      typeId = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if type id is invalid", async () => {
      typeId = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return the item if input is valid", async () => {
      await exec();
      const item = await Item.find({ name });

      expect(item).not.toBeNull();
    });
    it("should return the item in response if input is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", name);
      expect(res.body).toHaveProperty("category._id", categoryId.toHexString());
      expect(res.body).toHaveProperty("type._id", typeId.toHexString());
      expect(res.body).toHaveProperty("price", price);
    });
  });
  describe("PUT / ", () => {
    let token;
    let newName;
    let categoryId;
    let typeId;
    let newPrice;
    let itemId;

    const exec = () => {
      return request(server)
        .put(`/api/menu/${itemId}`)
        .set("x-auth-token", token)
        .send({ name: newName, categoryId, typeId, price: newPrice });
    };
    beforeEach(async () => {
      token = new User({ isAdmin: true }).generateAuthToken();
      let type = new Type({ name: "type1" });
      let category = new Category({ name: "category1" });
      let item = new Item({ name: "item1", category, type, price: 10 });
      await type.save();
      await category.save();
      await item.save();

      typeId = type._id;
      categoryId = category._id;
      itemId = item._id;
      newName = "item2";
      newPrice = 13;
    });
    it("should return 401 if user is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });
    it("should return 404 if id is invalid", async () => {
      itemId = "1234";

      const res = await exec();

      expect(res.status).toBe(404);
    });
    it("should return 400 if input name is less than 3 characters", async () => {
      newName = "12";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if input name is more than 100 characters", async () => {
      newName = new Array(102).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if category id is invalid", async () => {
      categoryId = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if type id is invalid", async () => {
      typeId = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if category with the given id is not found", async () => {
      categoryId = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if type with the given id is not found", async () => {
      typeId = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 404 if item with the given id is not found", async () => {
      itemId = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });
    it("should update item if input is valid", async () => {
      await exec();

      const updatedItem = await Item.findById(itemId);

      expect(updatedItem.name).toBe(newName);
      expect(updatedItem.price).toBe(newPrice);
    });
    it("should return response with updated item if input is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", newName);
      expect(res.body).toHaveProperty("price", newPrice);
      expect(res.body).toHaveProperty("category._id", categoryId.toHexString());
      expect(res.body).toHaveProperty("type._id", typeId.toHexString());
    });
    it("should return updated type if input is valid", async () => {
      const newType = new Type({ name: "type2" });
      await newType.save();

      typeId = newType._id;
      await exec();

      const updatedItem = await Item.findById(itemId);

      expect(updatedItem).not.toBeNull();
      expect(updatedItem.type).toHaveProperty("name", newType.name);
      expect(updatedItem.type).toHaveProperty("_id", newType._id);
    });
    it("should return response with updated type if input is valid", async () => {
      const newType = new Type({ name: "type2" });
      await newType.save();

      typeId = newType._id;
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body.type).toHaveProperty("name", newType.name);
      expect(res.body.type).toHaveProperty("_id", newType._id.toHexString());
    });
    it("should return updated category if input is valid", async () => {
      const newCategory = new Category({ name: "category2" });
      await newCategory.save();

      categoryId = newCategory._id;
      await exec();

      const updatedItem = await Item.findById(itemId);

      expect(updatedItem).not.toBeNull();
      expect(updatedItem.category).toHaveProperty("name", newCategory.name);
      expect(updatedItem.category).toHaveProperty("_id", newCategory._id);
    });
    it("should return response with updated category if input is valid", async () => {
      const newCategory = new Category({ name: "category2" });
      await newCategory.save();

      categoryId = newCategory._id;
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body.category).toHaveProperty("name", newCategory.name);
      expect(res.body.category).toHaveProperty(
        "_id",
        newCategory._id.toHexString()
      );
    });
  });
  describe("DELETE /", () => {
    let token;
    let itemId;

    const exec = () => {
      return request(server)
        .delete(`/api/menu/${itemId}`)
        .set("x-auth-token", token)
        .send();
    };
    beforeEach(async () => {
      token = new User({ isAdmin: true }).generateAuthToken();
      let type = new Type({ name: "type1" });
      let category = new Category({ name: "category1" });
      let item = new Item({ name: "item1", category, type, price: 10 });
      await type.save();
      await category.save();
      await item.save();

      itemId = item._id;
    });
    it("should return 401 if client is not logged in", async () => {
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
      itemId = "1234";

      const res = await exec();

      expect(res.status).toBe(404);
    });
    it("should return 404 if item is not found", async () => {
      itemId = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });
    it("should delete item if id is valid", async () => {
      await exec();

      const deleteItem = await Item.findById(itemId);

      expect(deleteItem).toBeNull();
    });
    it("should return deleted item if id is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id", itemId.toHexString());
    });
  });
});
