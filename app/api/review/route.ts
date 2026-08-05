import { NextResponse } from "next/server";

const LAMBDA_URL =
  "https://ou2tbcy2v4q4zgqbhboz2zwqcu0yckdc.lambda-url.us-east-1.on.aws/";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(LAMBDA_URL, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    console.log("========= LAMBDA RESPONSE =========");
    console.log(result);
    console.log("===================================");

    return NextResponse.json(result);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}