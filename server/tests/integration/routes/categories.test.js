import request from "supertest";
import mongoose from "mongoose";

import { Category } from "../../../models/category.js";
import { User } from "../../../models/user.js";
import { Type }  from "../../../models/type.js";
import { Item }  from "../../../models/item.js";
import svr from '../../../index.js'

let server;
describe("/api/categories", () => {
  beforeEach(() => {
    server = svr;
  });

  afterEach(async () => {
      await Category.remove({});
      await Item.remove({});
      await Type.remove({})
      server.close();
  });
  describe("GET / ", () => {
    it("should return all categories", async () => {
      await Category.collection.insertMany([
        { name: "category1" },
        { name: "category2" },
      ]);

      const res = await request(server).get("/api/categories");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((c) => c.name === "category1")).toBeTruthy();
      expect(res.body.some((c) => c.name === "category2")).toBeTruthy();
    });
  });
  describe("GET /:id", () => {
    it("should return category if valid id is passed", async () => {
      const category = new Category({ name: "category1" });
      await category.save();

      const res = await request(server).get(`/api/categories/${category._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", category.name);
    });

    it("should return status code 404 not found if invalid id is passed", async () => {
      const res = await request(server).get(`/api/categories/1234`);

      expect(res.status).toBe(404);
    });

    it("should return status code 404 if no category with the given id is found", async () => {
      const _id = mongoose.Types.ObjectId().toHexString();

      const res = await request(server).get(`/api/categories/${_id}`);

      expect(res.status).toBe(404);
    });
  });
  describe("POST /", () => {
    let token;
    let name;
    const exec = () => {
      return request(server)
        .post("/api/categories")
        .set("x-auth-token", token)
        .send({ name });
    };
    beforeEach(() => {
      token = new User({isAdmin:true}).generateAuthToken();
      name = "category1";
    });

    it("should return 401 if user is not logged in", async () => {
      token = "";
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if category is less than 3 characters", async () => {
      name = "12";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if category is more than 50 characters", async () => {
      name = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return the category if input is valid", async () => {
      await exec();

      const category = await Category.find({ name: "category1" });

      expect(category).not.toBeNull();
    });
    it("should return the category in response if it is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "category1");
    });
  });
  describe("PUT /", () => {
    let token;
    let id;
    let category;
    let newName;
    let type;
    let item;
    let itemId;

    const exec = () => {
      return request(server)
        .put(`/api/categories/${id}`)
        .set("x-auth-token", token)
        .send({ name: newName });
    };

    beforeEach(async () => {
      token = new User({ isAdmin: true }).generateAuthToken();
      category = new Category({ name: "category1" });
      await category.save();

      type = new Type({ name: "type1" });
      await type.save();

      item = new Item({
        name: "item1",
        type,
        category,
        price: 13,
      });
      item.save();

      id = category._id;
      itemId = item._id;
      newName = "updatedName";
    });

    it("should return 401 if user is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });


    it("should return 400 if category is less than 3 charaters", async () => {
      newName = "12";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if category is more than 50 characters", async () => {
      newName = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 404 if id is invalid", async () => {
      id = "1234";

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should return 404 if category is not found", async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should update category if input is valid", async () => {
      await exec();

      const updatedCategory = await Category.findById(id);

      expect(updatedCategory.name).toBe(newName);
    });

    it("should return response with update category if input is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", newName);
    });
    it("should return item  with updated category if input is valid", async () => {
      await exec();

      const updatedItem = await Item.findById(itemId);

      expect(updatedItem.category.name).toBe(newName);
    });
  });

  describe("DELETE /", () => {
    let token;
    let category;
    let id;
    let type;
    let item;
    let itemId;

    const exec = () => {
      return request(server)
        .delete(`/api/categories/${id}`)
        .set("x-auth-token", token)
        .send();
    };

    beforeEach(async () => {
      category = new Category({ name: "category1" });
      await category.save();

      type = new Type({ name: "type1" });
      type.save();

      item = new Item({
        name: "item1",
        type,
        category,
        price: 13,
      });
      item.save();

      token = new User({ isAdmin: true }).generateAuthToken();
      itemId = item._id;
      id = category._id;
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

    it("should return 404 if category is not found", async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should delete category if id is valid", async () => {
      await exec();

      const deleteCategory = await Category.findById(id);

      expect(deleteCategory).toBeNull();
    });

    it("should return deleted category if id is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id", category._id.toHexString());
      expect(res.body).toHaveProperty("name", category.name);
    });
    it("should delete item with deleted category if id is valid", async () => {
      await exec();

      const deletedItem = await Item.findById(itemId);

      expect(deletedItem).toBeNull();
    });
  });
});
