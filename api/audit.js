// Vercel Serverless Function — /api/audit
// This endpoint accepts Solidity smart contract code and returns
// an AI-powered security audit report using Groq's LLM API.

export default async function handler(req, res) {
  // CORS headers for local dev & production
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { contractCode } = req.body;

  if (!contractCode || typeof contractCode !== "string" || contractCode.trim().length === 0) {
    return res.status(400).json({
      error: "Missing or empty 'contractCode' in request body.",
    });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  if (!GROQ_API_KEY) {
    return res.status(500).json({
      error: "Server configuration error: GROQ_API_KEY is not set.",
    });
  }

  const systemPrompt = `You are Aegis-Net, an elite AI Validator for a Bittensor Subnet specializing in smart contract security. You are brutal, precise, and technical. 

Your task: Analyze the provided Solidity smart contract code and identify ALL security vulnerabilities.

Focus on:
- Reentrancy attacks
- Flash Loan attack vectors
- Integer overflow/underflow  
- Unchecked external calls
- Logic flaws & access control issues
- Oracle manipulation
- Front-running vulnerabilities
- Privilege escalation
- Denial of Service vectors
- Storage collision & delegate call issues

Output Format (strict Markdown):
1. Start with a severity badge: 🔴 CRITICAL, 🟠 MEDIUM, 🟢 LOW, or ✅ SECURE
2. Provide a "Threat Summary" section
3. For each vulnerability found:
   - Vulnerability name and type
   - Exact line/function affected
   - Technical explanation 
   - Exploit scenario
   - Recommended fix with code snippet
4. End with an "Overall Risk Score" out of 100
5. If the contract is secure, explicitly state it is secure with reasoning.

Be concise yet devastating. No fluff. Think like a hacker, report like a professional auditor.`;

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Audit the following Solidity smart contract:\n\n\`\`\`solidity\n${contractCode}\n\`\`\``,
            },
          ],
          temperature: 0.3,
          max_tokens: 4096,
          top_p: 0.9,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Groq API Error:", response.status, errorData);
      return res.status(response.status).json({
        error: `Groq API returned ${response.status}: ${errorData?.error?.message || "Unknown error"}`,
      });
    }

    const data = await response.json();
    const auditReport = data.choices?.[0]?.message?.content;

    if (!auditReport) {
      return res.status(500).json({
        error: "No response content received from AI model.",
      });
    }

    return res.status(200).json({
      report: auditReport,
      model: data.model,
      usage: data.usage,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Audit API Error:", error);
    return res.status(500).json({
      error: "Internal server error while processing audit request.",
    });
  }
}
