
import React from 'react';
import { Copy, Check, Download, Info } from 'lucide-react';

interface TranscriptViewProps {
  content: string;
}

export const TranscriptView: React.FC<TranscriptViewProps> = ({ content }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "classroom-transcript.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!content) return (
    <div className="flex flex-col items-center justify-center h-full text-slate-400 p-12 text-center border-2 border-dashed border-slate-200 rounded-xl">
      <div className="bg-slate-50 p-4 rounded-full mb-4">
        <Info className="w-8 h-8 text-slate-300" />
      </div>
      <p className="max-w-xs">Fill out the form to simulate a 30-minute K-12 classroom session.</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-700 flex items-center gap-2">
          Classroom Transcript
          <span className="text-xs font-normal bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">30 Minutes Simulator</span>
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-slate-200 rounded-md transition-colors text-slate-600 flex items-center gap-1 text-sm"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-slate-200 rounded-md transition-colors text-slate-600 flex items-center gap-1 text-sm"
            title="Download as .txt"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
      <div className="p-8 overflow-y-auto flex-1 bg-slate-50/30">
        <div className="max-w-2xl mx-auto transcript-font text-slate-800 text-lg leading-relaxed whitespace-pre-wrap selection:bg-blue-100">
          {content}
        </div>
      </div>
    </div>
  );
};
