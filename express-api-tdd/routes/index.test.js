const request = require("supertest");
const app = require("../app");
const db = require("../db");

describe("[Route::Base]", () => {

    it("should call a external api successfully",()=>{
        request(app)
        .get("/external")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
    })

});