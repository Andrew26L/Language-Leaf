const seed = require("../seed");
const app = require("../server/app");
const request = require("supertest");
const { expect } = require("chai");

describe("API Routes", () => {
  // beforeEach(async () => {
  //   await seed();
  // })
  describe("API route for /api/sentences", () => {
    it("Receives a response to GET request to /api/sentences", async() => {
      const res = await request(app).get("/api/sentences").expect(200)

    })
    it("API returns an array of four sentence objects", async() => {
      const res = await request(app).get("/api/sentences")
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.be.an("object");
      expect(res.body.length).to.equal(4);
    })
    it("Each sentence object contains an 'english' property with an array of sentences", async() => {
      const res = await request(app).get("/api/sentences")
      expect(res.body[0].english).to.be.an("array");
      expect(res.body[0].english[0]).to.be.an("string");
      expect(res.body[0].english[0].length).to.be.greaterThan(0);
    })
  })
});
