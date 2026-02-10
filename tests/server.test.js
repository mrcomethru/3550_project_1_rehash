const request = require("supertest");
const app = require("../server")

describe("JWKS Tests", () => {
    test("GET Request test to return JWKS",async () => {
        const res = await request(app).get("/.well-known/jwks.json");
        expect(res.statusCode).toBe(200);
        expect(res.body.keys).toBeDefined();
        expect(res.body.keys.length).toBeGreaterThan(0);
    });

    test ("POST Request to test valid return JWT.", async() => {
        const res = await request(app).post("/auth");
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.token.split(".")).toHaveLength(3);
    });

    test ("POST Request to test expired token", async ()=>{
        const res = await request(app).post("/auth?expired=true");
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.token.split(".")).toHaveLength(3);
    });
});