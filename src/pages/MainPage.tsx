import { useState } from 'react'
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';
import { FaCopy } from "react-icons/fa";


const MainPage = () => {

    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [commentedCode, setCommentedCode] = useState('');

    const handleGenerateComment = async (code: string) => {
        if (!code.trim()) return;
        setLoading(true)
        try {
            const OPEN_AI_KEY = import.meta.env.VITE_OPENAI_KEY;

            const body = {
                model: "gpt-4",
                messages: [
                  {
                    role: "system",
                    content: "You're an AI that only comments code clearly",
                  },
                  {
                    role: "user",
                    content: `Comment this code:${code}`,
                  },
                ],
              };

              const headers = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${OPEN_AI_KEY}`,
                },
              };

            const response = await axios.post("https://api.openai.com/v1/chat/completions", body, headers);
            setCommentedCode(response.data.choices[0].message.content);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }

    }

    const [copied, setCopied] = useState(false);

  return (
    <div className='flex flex-grow'>
        <div className='flex flex-col justify-center items-center gap-6'>
            <h3 className='text-lg font-bold underline mt-6'>How it works</h3>

            <p className='w-6/12 italic'>Simply paste your code snippet into the provided text box and click the "Generate Comments" button.
            The tool leverages advanced AI to analyze and clearly comment your code, helping you understand and document
            your work effortlessly. Once generated, the enhanced, commented version of your code will appear instantly,
            ready to copy, use, and share.</p>

            <textarea rows={8} 
            placeholder="insert your code here"
            value={code}
            className='w-6/12 h-5/6 bg-neutral-800 p-3 rounded-lg resize-none focus:outline-none my-6 rounded-lg'
            onChange={(e) => setCode(e.target.value)}></textarea>

            <button 
            className="mb-6 bg-neutral-800 cursor-pointer hover:border-white text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={() => handleGenerateComment(code)} disabled={loading}>
            {loading ? "Processing..." : "Generate Comments"}
            </button>

        {commentedCode && (
          <div className='w-6/12 mb-6 relative'>

          <button 
            className='cursor-pointer absolute top-2 right-2'
            onClick={() => {
            navigator.clipboard.writeText(commentedCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          >
            {copied ? "Copied!" : <FaCopy />}
          </button>

            <SyntaxHighlighter style={docco}
              customStyle={{
                background: "transparent",
                border: 'solid 1px white',
                borderRadius: '8px',
                backgroundColor: '#212121',
                color: 'white'
              }}>
              {commentedCode}
            </SyntaxHighlighter>
          </div>
        )}
        </div>
    </div>
  )
}

export default MainPage
