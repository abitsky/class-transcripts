
import React from 'react';
import { InputForm } from './components/InputForm';
import { TranscriptView } from './components/TranscriptView';
import { ClassroomInputs, TranscriptState } from './types';
import { generateClassroomTranscript } from './services/geminiService';
import { School, AlertCircle, History } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = React.useState<TranscriptState>({
    content: '',
    isLoading: false,
    error: null
  });

  const handleGenerate = async (inputs: ClassroomInputs) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await generateClassroomTranscript(inputs);
      setState({
        content: result,
        isLoading: false,
        error: null
      });
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err.message || 'An unexpected error occurred while generating the transcript.'
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <School className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              EduScript <span className="text-blue-600">Sim</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-1">
              <History className="w-4 h-4" />
              Realistic K-12 Dynamics
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
            <h2 className="text-sm font-bold text-blue-800 mb-1 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Simulator Instructions
            </h2>
            <p className="text-xs text-blue-700 leading-relaxed">
              Define the grade, subject, and standard. The AI will generate a 30-minute pure dialogue session. 
              <strong> No labels, no action descriptions, no sound effects—only spoken words.</strong>
            </p>
          </div>
          
          <InputForm onGenerate={handleGenerate} isLoading={state.isLoading} />

          {state.error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold">Generation Failed</p>
                <p className="text-xs opacity-90">{state.error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-8 flex flex-col min-h-[600px]">
          <TranscriptView content={state.content} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} EduScript Simulator. Developed for realistic classroom analysis and training.</p>
          <p className="mt-1">Powered by Gemini 3 Pro reasoning engine.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
