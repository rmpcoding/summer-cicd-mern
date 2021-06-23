const mocha = require("mocha");
const chai = require("chai");
const mongoose = require("mongoose");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const restaurantController = require("../../controllers/restaurantController");

const expect = chai.expect;
chai.use(sinonChai);

describe("restaurantController", () => {
  describe("findById", () => {
    it("should return a model if found", async () => {
      //TODO: Write the unit test.
      // Arrange

      const sandbox = sinon.createSandbox();

      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        json: sinon.spy(),
      };

      mongoose.Model.findById = sandbox
        .stub()
        .returns(Promise.resolve("resolved"));

      // Act
      await restaurantController.findById(req, res);
      // Assert
      expect(res.json).to.have.been.calledWith("resolved");
    });
    it("should return an error message if an error occurs", async () => {
      // TODO: Write the unit test.

      // Arrange
      const sandbox = sinon.createSandbox();
      const statusJsonSpy = sinon.spy();

      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returns({ json: statusJsonSpy }),
      };

      mongoose.Model.findById = sandbox
        .stub()
        .returns(Promise.reject("error message"));

      // Act

      await restaurantController.findById(req, res);
      await console.log("---");
      // Assert
      expect(res.status).to.have.been.calledWith(422);
      expect(statusJsonSpy).to.have.been.calledWith("error message");
    });
  });
});
