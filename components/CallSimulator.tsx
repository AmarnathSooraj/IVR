
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { decode, encode, decodeAudioData, createBlob } from '../lib/audioUtils';
import { Staff, Student, CallLog } from '../lib/types';

interface CallSimulatorProps {
  staffList: Staff[];
  studentList: Student[];
  onCallEnd: (log: CallLog) => void;
}

const CallSimulator: React.FC<CallSimulatorProps> = ({ staffList, studentList, onCallEnd }) => {
  const [active, setActive] = useState(false);
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [forwardedTo, setForwardedTo] = useState<Staff | null>(null);
  const [duration, setDuration] = useState(0);
  const timerRef = useRef<number | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  useEffect(() => {
    if (active) {
      timerRef.current = window.setInterval(() => setDuration(d => d + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setDuration(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [active]);

  const formatDuration = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const systemInstruction = `
    You are the "EduCall AI" IVR system for a college. 
    Current Students in Database: ${JSON.stringify(studentList)}
    Available Staff members: ${JSON.stringify(staffList)}
    
    GUIDELINES:
    1. Greeting: "Welcome to EduCall AI. This call may be recorded for quality purposes. How can I help you?"
    2. Data Privacy: If someone asks about a student, ask for their name and enrollment number first.
    3. Assistance: Give precise info about GPA, attendance, or fees from the student list.
    4. Call Forwarding: If user says "agent", "human", or names a specific staff member like "${staffList[0]?.name}", say "I am forwarding your call to [Name] in the [Department] department. Please hold."
    5. Always be polite and professional.
  `;

  const startCall = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
          systemInstruction,
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setActive(true);
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const audioBase64 = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioBase64 && outAudioContextRef.current) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outAudioContextRef.current.currentTime);
              const buffer = await decodeAudioData(decode(audioBase64), outAudioContextRef.current, 24000, 1);
              const source = outAudioContextRef.current.createBufferSource();
              source.buffer = buffer;
              source.connect(outAudioContextRef.current.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (msg.serverContent?.outputTranscription) {
              const txt = msg.serverContent.outputTranscription.text;
              setTranscripts(prev => [...prev, `AI: ${txt}`].slice(-6));
              const lowerTxt = txt.toLowerCase();
              if (lowerTxt.includes("forwarding your call to")) {
                const found = staffList.find(s => lowerTxt.includes(s.name.toLowerCase()));
                if (found) setForwardedTo(found);
              }
            }
          },
          onerror: (e) => { console.error(e); setActive(false); },
          onclose: () => setActive(false)
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      alert("Please ensure your microphone is allowed and API Key is valid.");
    }
  };

  const endCall = () => {
    if (sessionRef.current) sessionRef.current.close();
    
    // Create actual log entry
    onCallEnd({
      id: 'log' + Date.now(),
      caller: 'Simulator User',
      timestamp: new Date(),
      duration: formatDuration(duration),
      type: forwardedTo ? 'Forwarded' : 'AI Resolved',
      assignedStaff: forwardedTo?.name,
      transcriptSnippet: transcripts[transcripts.length - 1] || "Automated query resolution"
    });

    setActive(false);
    setForwardedTo(null);
    setTranscripts([]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden h-full flex flex-col min-h-[500px]">
      <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
        <div>
          <h3 className="font-bold flex items-center gap-2 text-lg">
            <i className={`fas fa-phone-alt ${active ? 'text-green-400 animate-pulse' : 'text-slate-400'}`}></i>
            College IVR Line (Live)
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">Simulated SIP Trunk</p>
        </div>
        {active && <span className="text-xl font-mono text-indigo-400 font-bold">{formatDuration(duration)}</span>}
      </div>
      
      <div className="flex-1 p-8 flex flex-col items-center justify-center space-y-8 bg-slate-50/50">
        {!active ? (
          <div className="text-center space-y-6">
            <div className="w-40 h-40 rounded-full bg-white shadow-2xl flex items-center justify-center mx-auto relative group cursor-pointer" onClick={startCall}>
              <div className="absolute inset-0 rounded-full bg-indigo-500/10 scale-110 animate-ping"></div>
              <div className="w-32 h-32 rounded-full bg-indigo-600 text-white flex flex-col items-center justify-center group-hover:bg-indigo-700 transition-all shadow-inner">
                <i className="fas fa-phone text-4xl mb-2"></i>
                <span className="text-[10px] font-black uppercase tracking-widest">Connect</span>
              </div>
            </div>
            <div className="max-w-xs mx-auto">
              <p className="text-slate-600 font-medium">Ready to test the IVR system?</p>
              <p className="text-xs text-slate-400 mt-2">Click the button to start a voice session with the EduCall AI agent.</p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-2xl rotate-3">
                  <i className="fas fa-robot text-4xl text-white"></i>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center text-white text-[10px]">
                  <i className="fas fa-signal"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Real-time Transcript</span>
              </div>
              <div className="space-y-4 h-48 overflow-y-auto pr-2 scrollbar-thin">
                {transcripts.map((t, i) => (
                   <div key={i} className={`p-3 rounded-2xl text-sm ${t.startsWith('AI') ? 'bg-slate-50 text-slate-700 rounded-tl-none mr-8 border border-slate-100' : 'bg-indigo-600 text-white rounded-tr-none ml-8'}`}>
                     {t.replace('AI: ', '')}
                   </div>
                ))}
                {transcripts.length === 0 && <p className="text-center text-slate-300 italic py-12">System listening...</p>}
              </div>
            </div>

            {forwardedTo && (
              <div className="bg-emerald-50 border-2 border-emerald-100 p-4 rounded-2xl flex items-center gap-4 animate-bounce">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                  <i className="fas fa-headset text-xl"></i>
                </div>
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">Connection Transferred</p>
                  <p className="font-bold text-slate-800 text-lg leading-none mt-1">{forwardedTo.name}</p>
                  <p className="text-xs text-emerald-700 mt-1 font-medium">{forwardedTo.department} • Ext {forwardedTo.extension}</p>
                </div>
              </div>
            )}

            <button 
              onClick={endCall}
              className="w-full py-4 rounded-2xl bg-red-500 text-white font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-200 flex items-center justify-center gap-3"
            >
              <i className="fas fa-phone-slash text-xl"></i>
              Disconnect Call
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallSimulator;
