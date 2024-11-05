import sinon from "sinon";
import { expect } from "chai";
import "../CategoriesMethods";
import { CategoriesCollection } from "../../iso/db/CategoriesCollection";

describe("categories methods", function () {
  beforeEach(async function () {
    // clear the database
    await CategoriesCollection.remove({});

    // stub Meteor.userId and Meteor.user
    sinon.stub(Meteor, "userId").returns("testId");
    sinon.stub(Meteor, "userAsync").resolves({ _id: "testId" });
  });

  afterEach(function () {
    // restore the stubs
    sinon.restore();
  });

  describe("insert", function () {
    it("throws an error if not authorized", async function () {
      const title = "Test Category";

      Meteor.userId.returns(null);
      Meteor.userAsync.resolves(null);

      let error;
      try {
        await Meteor.callAsync("categories.insert", title);
      } catch (e) {
        error = e;
      }
      expect(error).to.exist;
    });

    it("inserts a category with title and meta data", async function () {
      const title = "Test Category";

      await Meteor.callAsync("categories.insert", title);

      const category = await CategoriesCollection.findOneAsync({ title });
      expect(category).to.exist;
      expect(category.title).to.equal(title);
      expect(category.createdAt).to.be.a("date");
      expect(category.userId).to.equal("testId");
    });

    it("throws an error if title is empty", async function () {
      let error;
      try {
        await Meteor.callAsync("categories.insert", "");
      } catch (e) {
        error = e;
      }
      expect(error).to.exist;
    });

    it("trims the title", async function () {
      const title = "  Test Category  ";

      await Meteor.callAsync("categories.insert", title);

      const category = await CategoriesCollection.findOneAsync({
        title: title.trim(),
      });
      expect(category).to.exist;
    });

    it("throws an error if title is empty after trimming", async function () {
      let error;
      try {
        await Meteor.callAsync("categories.insert", "  ");
      } catch (e) {
        error = e;
      }
      expect(error).to.exist;
    });

    it("throws an error if title is not a string", async function () {
      let error;
      try {
        await Meteor.callAsync("categories.insert", 123);
      } catch (e) {
        error = e;
      }
      expect(error).to.exist;
    });

    it("throws an error if title is not provided", async function () {
      let error;
      try {
        await Meteor.callAsync("categories.insert");
      } catch (e) {
        error = e;
      }
      expect(error).to.exist;
    });
  });

  describe("remove", function () {
    it("throws an error if not authorized", async function () {
      const title = "Test Category";

      Meteor.userId.returns(null);
      Meteor.userAsync.resolves(null);

      const id = await CategoriesCollection.insertAsync({
        title,
        createdAt: new Date(),
        userId: "testId",
      });

      let error;
      try {
        await Meteor.callAsync("categories.remove", id);
      } catch (e) {
        error = e;
      }
      expect(error).to.exist;
    });

    it("removes a category", async function () {
      const title = "Test Category";

      const id = await CategoriesCollection.insertAsync({
        title,
        createdAt: new Date(),
        userId: "testId",
      });

      await Meteor.callAsync("categories.remove", id);

      const category = await CategoriesCollection.findOneAsync({ _id: id });
      expect(category).to.not.exist;
    });
  });
});
