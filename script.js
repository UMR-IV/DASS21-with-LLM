import OpenAI from "openai";

const openaiAPI = process.env.API_KEY;                    //Assign a varible to handle the API key
const openai = new OpenAI({ apiKey: openaiAPI});          //Access openai using the var that handles the API

async function main() {
  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: "Say this is a test.",
    max_tokens: 7,
    temperature: 0,
  });

  console.log(completion); // use the POST type instead like how shown in the YT video=========
  //make a golbal var to save the 'completion' to display in html?=========
}
main();
