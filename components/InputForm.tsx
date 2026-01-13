
import React from 'react';
import { GRADES } from '../constants';
import { ClassroomInputs } from '../types';
import { BookOpen, GraduationCap, FileText, Sparkles } from 'lucide-react';

interface InputFormProps {
  onGenerate: (inputs: ClassroomInputs) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [inputs, setInputs] = React.useState<ClassroomInputs>({
    grade: GRADES[0],
    subject: '',
    standard: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(inputs);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
          <GraduationCap className="w-4 h-4 text-blue-500" />
          Grade Level
        </label>
        <select
          value={inputs.grade}
          onChange={(e) => setInputs({ ...inputs, grade: e.target.value })}
          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
        >
          {GRADES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
          <BookOpen className="w-4 h-4 text-blue-500" />
          Subject
        </label>
        <input
          type="text"
          placeholder="e.g. 5th Grade Fractions"
          value={inputs.subject}
          onChange={(e) => setInputs({ ...inputs, subject: e.target.value })}
          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
          <FileText className="w-4 h-4 text-blue-500" />
          Learning Standard (CCSS, TEKS, etc.)
        </label>
        <textarea
          placeholder="e.g. CCSS.MATH.CONTENT.5.NF.A.1 - Add and subtract fractions with unlike denominators..."
          value={inputs.standard}
          onChange={(e) => setInputs({ ...inputs, standard: e.target.value })}
          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none min-h-[100px]"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-200"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Generating Session...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Transcript
          </>
        )}
      </button>
    </form>
  );
};
