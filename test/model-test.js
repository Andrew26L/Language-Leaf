const { User, Sentence } = require("../server/db");
const { expect } = require("chai");
const jwt = require("jsonwebtoken")

describe("User Model", () => {
  beforeEach(async () => {
    const user = new User({
      username: "Emma",
      password: "PasswordTest@#$",
      email: "test@test.com"
    })
    user.save()
  })
  describe("Authentication", () => {
    it("Generates a token when correct credentials are entered", async () => {
      const user = await User.findOne({ username: "Emma" })
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
  it("Generates an instance with an English translation", async () => {
    expect(sentence.english[0]).to.be.a("string");
    expect(sentence.english[0]).to.equal("How are you?")
  })
  it("Generates an instance with a German translation", async () => {
    expect(sentence.german[0]).to.be.a("string");
    expect(sentence.german[0]).to.equal("Wie geht es ihnen?")
  })
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
})
