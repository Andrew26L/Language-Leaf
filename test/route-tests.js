const seed = require("../seed");
const app = require("../server/app");
const request = require("supertest");
const { expect } = require("chai");

describe("API Routes", () => {
  // beforeEach(async () => {
  //   await seed();
  // })
  describe("Word routes - /api/words", () => {
    it("GET responds successfully with status code 200", async() => {
      const res = await request(app).get("/api/words").expect(200)

    })
    it("GET responds with an array of word objects", async() => {
      const res = await request(app).get("/api/words")
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.be.an("object");
      expect(res.body.length).to.equal(4);
    })
    it("Each word object in the array contains an english property with an array of strings", async() => {
      const res = await request(app).get("/api/words")
      expect(res.body[0].english).to.be.an("array");
      expect(res.body[0].english[0]).to.be.an("string");
      expect(res.body[0].english[0].length).to.be.greaterThan(0);
    })
  })
  describe("Sentence routes - /api/sentences", () => {
    it("GET responds successfully with status code 200", async() => {
      const res = await request(app).get("/api/sentences").expect(200)

    })
    it("GET responds with an array of sentence objects", async() => {
      const res = await request(app).get("/api/sentences")
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.be.an("object");
      expect(res.body.length).to.equal(4);
    })
    it("Each sentence object in the array contains an english property with an array of strings", async() => {
      const res = await request(app).get("/api/sentences")
      expect(res.body[0].english).to.be.an("array");
      expect(res.body[0].english[0]).to.be.an("string");
      expect(res.body[0].english[0].length).to.be.greaterThan(0);
    })
  })
});
