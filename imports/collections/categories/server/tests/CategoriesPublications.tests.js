import { Meteor } from "meteor/meteor";
import sinon from "sinon";
import { expect } from "chai";

import "../CategoriesPublications";
import { CategoriesCollection } from "../../iso/db/CategoriesCollection";

if (Meteor.isServer) {
  describe("categories publications", function () {
    beforeEach(async function () {
      // clear the database
      await CategoriesCollection.removeAsync({});

      // stub Meteor.userId and Meteor.user
      sinon.stub(Meteor, "userId").returns("testId");
      sinon.stub(Meteor, "userAsync").resolves({ _id: "testId" });
    });

    afterEach(function () {
      // restore the stubs
      sinon.restore();
    });

    it("publishes the current users categories", async function () {
      // insert a category
      await CategoriesCollection.insertAsync({
        title: "Test Category",
        createdAt: new Date(),
        userId: "testId",
      });

      const userId = "testId";
      const context = { userId };
      const args = [];

      const publicationHandler = Meteor.server.publish_handlers["categories"];

      const result = await publicationHandler.apply(context, args).fetchAsync();

      expect(result).to.have.lengthOf(1);
    });

    it("returns no results if not authorized", async function () {
      // insert a categor

      Meteor.userId.returns(null);
      Meteor.userAsync.resolves(null);

      await CategoriesCollection.insertAsync({
        title: "Test Category",
        createdAt: new Date(),
        userId: "testId",
      });

      await CategoriesCollection.insertAsync({
        title: "Test Category",
        createdAt: new Date(),
        userId: null,
      });

      const userId = null;
      const context = { userId, ready: () => {} };
      const args = [];

      const publicationHandler = Meteor.server.publish_handlers["categories"];

      let error;
      try {
        const result = await publicationHandler
          .apply(context, args)
          .fetchAsync();
      } catch (e) {
        error = e;
      }

      expect(error).to.exist;
    });
  });
}
