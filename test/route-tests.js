const app = require("../server/app");
const request = require("supertest");
const { expect } = require("chai");
const seed = require("../seed");
const { Sentence, Word } = require("../server/db");

describe("API Routes", () => {
  beforeEach(async () => {
    await seed();
  })
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
  describe("Word Report routes - /api/report/word", () => {
    let word;
    let report;
    beforeEach(async () => {
      const train = new Word({
        english: ["Train"],
        german: ["Bahn"],
        type: "noun"
      })
      word = await Word.create(train);

      report = {
        _id: word._id,
        guess: "train",
        language: "english"
      }
    })
    it("POST responds successfully with status code 200", async() => {
      const res = await request(app).post("/api/report/word").send(report).expect(200)
    })
    it("POST responds with a word object with updated reports array", async() => {
      const res = await request(app).post("/api/report/word").send(report)
      expect(res.body).to.be.an("object");
      expect(res.body.reports).to.be.an("array");
      expect(res.body.reports[0].guess).to.equal("train");
      expect(res.body.reports[0].language).to.equal("english");
    })
  })
  describe("Sentence Report routes - /api/report/sentence", () => {
    let sentence;
    let report;
    beforeEach(async () => {
      const greeting = new Sentence({
        english: ["How are you?"],
        german: ["Wie geht es ihnen?"]
      })
      sentence = await Sentence.create(greeting);

      report = {
        _id: sentence._id,
        guess: "Wie gehts?",
        language: "german"
      }
    })
    it("POST responds successfully with status code 200", async() => {
      const res = await request(app).post("/api/report/sentence").send(report).expect(200)
    })
    it("POST responds with a sentence object with updated reports array", async() => {
      const res = await request(app).post("/api/report/sentence").send(report)
      expect(res.body).to.be.an("object");
      expect(res.body.reports).to.be.an("array");
      expect(res.body.reports[0].guess).to.equal("Wie gehts?");
      expect(res.body.reports[0].language).to.equal("german");
    })
  })
});
