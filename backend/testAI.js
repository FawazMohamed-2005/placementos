const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const test = async () => {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: "Say hello in one sentence"
                }
            ],
            model: "llama-3.1-8b-instant"
        });
        console.log(
            "AI Response:",
            completion.choices[0].message.content
        );
    } catch (err) {
        console.error("Error:", err.message);
    }
};

test();