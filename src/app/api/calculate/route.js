// server/api/calculate.js
const url = require("url");
import middleware from "../../middleware";

export async function GET(req, res) {
  try {
    // Execute middleware
    const response = await middleware(req);
    if (response) {
      // If middleware returns a response, return it
      return new Response("Too many requests");
    }
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    console.log(query);
    const { weight, height } = query;

    // Validate input
    if (!weight || isNaN(weight) || !height || isNaN(height)) {
      return new Response({ error: "Invalid weight or height provided." });
    }

    const weightInKg = parseFloat(weight);
    const heightInM = parseFloat(height) / 100;

    // Check if weight and height are valid numbers
    if (
      !isNaN(weightInKg) &&
      !isNaN(heightInM) &&
      weightInKg > 0 &&
      heightInM > 0
    ) {
      // Calculate BMI
      const bmi = weightInKg / (heightInM * heightInM);
      return new Response(bmi);
    } else {
      return new Response({ error: "Invalid weight or height provided." });
    }
  } catch (error) {
    console.error("Error calculating BMI:", error);
    return new Response({ error: "Internal server error" });
  }
}
