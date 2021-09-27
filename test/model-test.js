const { User, Sentence, Word } = require("../server/db");
const { expect } = require("chai");
const jwt = require("jsonwebtoken")

describe("User Model", () => {
  let user;
  beforeEach(async () => {
    user = new User({
      username: "Emma",
      password: "PasswordTest@#$",
      email: "test@test.com"
    })
  })
  describe("Authentication", () => {
    it("Generates a token when correct credentials are entered", async () => {
      const testToken = await user.generateToken();
      const { id } = await jwt.verify(testToken, process.env.JWT);
      expect(id).to.equal(user.id)
    })
  })
})

describe("Sentence Model", () => {
  let sentence;
  beforeEach(async () => {
    sentence = new Sentence({
      english: ["How are you?"],
      german: ["Wie geht es ihnen?"]
    })
  })
  describe("Translations", () => {
    it("Generates an instance with an English translation", async () => {
      expect(sentence.english[0]).to.be.a("string");
      expect(sentence.english[0]).to.equal("How are you?")
    })
    it("Generates an instance with a German translation", async () => {
      expect(sentence.german[0]).to.be.a("string");
      expect(sentence.german[0]).to.equal("Wie geht es ihnen?")
    })
  })
  describe("Reports", () => {
    it("Generates an empty array for reports", async () => {
      expect(sentence.reports).to.be.an("array");
      expect(sentence.reports.length).to.equal(0)
    })
    it("Reports can be added to the instance", async () => {
      sentence.reports.push({
        language: "german",
        guess: "Wie gehts?"
      })
      expect(sentence.reports[0].guess).to.equal("Wie gehts?")
      expect(sentence.reports[0].language).to.equal("german")
      expect(sentence.reports.length).to.equal(1)
    })
    it("Reports are added as objects", async () => {
      sentence.reports.push({
        language: "german",
        guess: "Wie gehts?"
      })
      expect(sentence.reports[0]).to.be.an("object")
    })
    it(`Reports have "language" and "guess" properties`, async () => {
      sentence.reports.push({
        language: "german",
        guess: "Wie gehts?"
      })
      expect(sentence.reports[0].language).to.be.a("string")
      expect(sentence.reports[0].guess).to.be.a("string")
    })
  })
})
describe("Word Model", () => {
  let word;
  beforeEach(async () => {
    word = new Word({
      english: ["Train"],
      german: ["Bahn"],
      type: "noun"
    })
  })
  describe("Translations", () => {

    it("Generates an instance with an English translation", async () => {
      expect(word.english[0]).to.be.a("string");
      expect(word.english[0]).to.equal("Train")
    })
    it("Generates an instance with a German translation", async () => {
      expect(word.german[0]).to.be.a("string");
      expect(word.german[0]).to.equal("Bahn")
    })
  })
  describe("Reports", () => {
    it("Generates an instance with a word type (i.e. noun, verb, adjective, etc.)", async () => {
      expect(word.type).to.be.a("string");
      expect(word.type).to.equal("noun")
    })
    it("Generates an empty array for reports", async () => {
      expect(word.reports).to.be.an("array");
      expect(word.reports.length).to.equal(0)
    })
    it("Reports can be added to the instance", async () => {
      word.reports.push({
        language: "english",
        guess: "train"
      })
      expect(word.reports[0].guess).to.equal("train")
      expect(word.reports[0].language).to.equal("english")
      expect(word.reports.length).to.equal(1)
    })
    it("Reports are added as objects", async () => {
      word.reports.push({
        language: "english",
        guess: "train"
      })
      expect(word.reports[0]).to.be.an("object")
    })
    it(`Reports have "language" and "guess" properties`, async () => {
      word.reports.push({
        language: "english",
        guess: "train"
      })
      expect(word.reports[0].language).to.be.a("string")
      expect(word.reports[0].guess).to.be.a("string")
    })
  })
})
