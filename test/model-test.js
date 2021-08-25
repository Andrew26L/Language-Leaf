const { User } = require("../server/db");
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
