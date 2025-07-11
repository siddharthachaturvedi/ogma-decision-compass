import React, { useState, useCallback } from 'react';
import { useDocumentProcess } from '@/hooks/useDemoData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Upload, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Download,
  Eye,
  Brain,
  Sparkles,
  Clock,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';

export function DocumentsView() {
  const [dragActive, setDragActive] = useState(false);
  const [processedDocs, setProcessedDocs] = useState<any[]>([]);
  const documentProcess = useDocumentProcess();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File size must be less than 10MB');
      return;
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/csv'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error('Unsupported file type. Please upload PDF, DOC, DOCX, TXT, or CSV files.');
      return;
    }

    try {
      const result = await documentProcess.mutateAsync(file);
      setProcessedDocs(prev => [{ ...result, id: Date.now(), uploadedAt: new Date() }, ...prev]);
      toast.success('Document processed successfully!');
    } catch (error) {
      toast.error('Failed to process document. Please try again.');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <FileText className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">
              Document Intelligence
            </h1>
            <p className="text-muted-foreground">
              Upload and analyze documents with AI-powered insights
            </p>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <Card className="border-border/50">
        <CardContent className="p-8">
          <div
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-primary-400 bg-primary-50' 
                : 'border-border hover:border-primary-300 hover:bg-primary-50/30'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileInput}
              accept=".pdf,.doc,.docx,.txt,.csv"
              disabled={documentProcess.isPending}
            />
            
            <div className="space-y-4">
              {documentProcess.isPending ? (
                <>
                  <Loader2 className="h-12 w-12 mx-auto text-primary-600 animate-spin" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Processing Document...
                    </h3>
                    <p className="text-muted-foreground">
                      AI is analyzing your document and extracting insights
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Upload className="h-12 w-12 mx-auto text-primary-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Upload Document
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Drag and drop your file here, or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF, DOC, DOCX, TXT, CSV • Max 10MB
                    </p>
                  </div>
                  <Button variant="outline" className="mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processed Documents */}
      {processedDocs.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Recent Documents</h2>
          
          <div className="grid gap-6">
            {processedDocs.map((doc) => (
              <Card key={doc.id} className="border-border/50 hover:shadow-medium transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-3 rounded-xl bg-green-50">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{doc.fileName}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span>{formatFileSize(doc.fileSize)}</span>
                          <span>•</span>
                          <span>Processed {Math.floor(doc.processingTime / 1000)}s ago</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <Brain className="h-3 w-3" />
                            <span>{Math.round(doc.confidence * 100)}% confidence</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Summary */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-primary-600" />
                      <span>AI Summary</span>
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {doc.summary}
                    </p>
                  </div>

                  {/* Key Insights */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                      <span>Key Insights</span>
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {doc.insights.slice(0, 4).map((insight: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30">
                          <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-foreground">{insight}</p>
                        </div>
                      ))}
                    </div>
                    
                    {doc.insights.length > 4 && (
                      <Button variant="ghost" size="sm" className="mt-3">
                        View all {doc.insights.length} insights
                      </Button>
                    )}
                  </div>

                  {/* Processing Stats */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/30">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Processed in {(doc.processingTime / 1000).toFixed(1)}s
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Brain className="h-4 w-4 text-primary-600" />
                        <span className="text-sm text-foreground">
                          {Math.round(doc.confidence * 100)}% AI Confidence
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${doc.confidence * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {processedDocs.length === 0 && !documentProcess.isPending && (
        <Card className="border-border/50">
          <CardContent className="p-12 text-center">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No documents processed yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Upload your first document to see AI-powered analysis and insights
            </p>
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { icon: Brain, title: 'AI Analysis', desc: 'Extract key themes and insights' },
                { icon: Sparkles, title: 'Smart Summary', desc: 'Get concise document summaries' },
                { icon: BarChart3, title: 'Data Insights', desc: 'Identify patterns and trends' }
              ].map((feature, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/20 border border-border/30">
                  <feature.icon className="h-8 w-8 mx-auto text-primary-600 mb-2" />
                  <h4 className="font-medium text-foreground mb-1">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}