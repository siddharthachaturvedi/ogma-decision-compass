
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  AlertTriangle, 
  CheckCircle,
  Download,
  Share
} from 'lucide-react';

const DocDigest = () => {
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [digestResult, setDigestResult] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    setProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setProcessing(false);
      setDigestResult({
        fileName: file.name,
        situation: "Q4 budget review document outlines proposed 15% increase in marketing spend, with focus on digital advertising campaigns. Current performance metrics show 3.2x ROAS on existing campaigns.",
        numbers: [
          "Marketing budget: $2.4M → $2.76M (+15%)",
          "Digital advertising: 65% of total spend",
          "Expected ROAS: 3.2x (current) → 3.8x (projected)",
          "Campaign duration: 6 months"
        ],
        recommendations: [
          "Approve the budget increase with performance milestones",
          "Request monthly performance reviews",
          "Consider A/B testing new creative approaches",
          "Implement enhanced attribution tracking"
        ],
        risks: [
          { level: "Medium", text: "Market saturation in target demographics" },
          { level: "Low", text: "Attribution tracking gaps in current setup" },
          { level: "High", text: "Dependency on single advertising channel" }
        ],
        citations: [
          "Page 3: Budget allocation breakdown",
          "Page 7: Performance metrics Q3 2024",
          "Page 12: Projected ROI calculations"
        ]
      });
    }, 3000);
  };

  const mockDigests = [
    {
      id: 1,
      title: "Market Analysis Report",
      date: "2024-01-15",
      risk: "Medium",
      summary: "Comprehensive analysis of Q4 market trends showing positive growth indicators."
    },
    {
      id: 2,
      title: "Partnership Agreement",
      date: "2024-01-14",
      risk: "High",
      summary: "Legal review of partnership terms reveals potential liability concerns."
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Document Digest</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Area */}
        <div className="lg:col-span-2">
          {!digestResult ? (
            <Card className="h-96">
              <CardContent className="p-6 h-full">
                <div
                  className={`h-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${
                    dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {processing ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-slate-600">Processing document...</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="text-slate-400 mb-4" size={48} />
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        Drop your document here
                      </h3>
                      <p className="text-slate-600 mb-4 text-center">
                        Supports PDF, DOCX, PPTX files up to 10MB
                      </p>
                      <Button>
                        <Upload size={16} className="mr-2" />
                        Choose File
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText size={24} />
                      <span>{digestResult.fileName}</span>
                    </CardTitle>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Download size={16} className="mr-2" />
                      Export
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share size={16} className="mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Situation */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Situation</h3>
                  <p className="text-slate-700">{digestResult.situation}</p>
                </div>

                {/* Numbers */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Key Numbers</h3>
                  <ul className="space-y-2">
                    {digestResult.numbers.map((number, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-slate-700">{number}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Recommendations</h3>
                  <div className="space-y-2">
                    {digestResult.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="text-green-600 mt-0.5" size={16} />
                        <span className="text-slate-700">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Analysis */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Risk Analysis</h3>
                  <div className="space-y-3">
                    {digestResult.risks.map((risk, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <AlertTriangle 
                          className={`mt-0.5 ${
                            risk.level === 'High' ? 'text-red-600' : 
                            risk.level === 'Medium' ? 'text-yellow-600' : 
                            'text-green-600'
                          }`} 
                          size={16} 
                        />
                        <div>
                          <Badge 
                            variant={
                              risk.level === 'High' ? 'destructive' : 
                              risk.level === 'Medium' ? 'default' : 
                              'secondary'
                            }
                            className="mr-2"
                          >
                            {risk.level}
                          </Badge>
                          <span className="text-slate-700">{risk.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Citations */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Citations</h3>
                  <div className="space-y-1">
                    {digestResult.citations.map((citation, idx) => (
                      <button 
                        key={idx} 
                        className="block text-blue-600 hover:text-blue-800 text-sm underline"
                      >
                        {citation}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Digests */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Digests</h2>
          <div className="space-y-4">
            {mockDigests.map((digest) => (
              <Card key={digest.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-slate-900">{digest.title}</h3>
                    <Badge 
                      variant={digest.risk === 'High' ? 'destructive' : 'default'}
                    >
                      {digest.risk}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{digest.summary}</p>
                  <p className="text-xs text-slate-500">{digest.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocDigest;
