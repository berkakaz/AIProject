const axios = require("axios");
require("dotenv").config();

const API_URL = "https://api.openai.com/v1/chat/completions" ;

const apiKey = process.env.OPENAI_API_KEY ;

const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
    },
};

const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: 'Say this is a test!' }],
    temperature: 0.7,
};
    
axios
.post(API_URL, requestBody, config)
.then((response) => {
    console.log(response.data.choices[0].message.content);
})
.catch((error) => {
    console.log(error);
});