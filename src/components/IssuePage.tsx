"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function IssuePage() {
  const params = useParams();
  const owner = params.owner as string;
  const repo = params.repo as string;
  const issue = params.issue as string;
  
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!owner || !repo || !issue) return;

    fetch(`/api/generate-report?owner=${owner}&repo=${repo}&issue=${issue}`)
      .then((res) => res.json())
      .then((data) => {
        setSummary(data.summary);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [owner, repo, issue]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0e0e10] text-white p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-4xl bg-[#18181b] border border-gray-700 rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-300">📝 Issue Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-[500px] overflow-y-auto">
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-5/6" />
                  <Skeleton className="h-6 w-2/3" />
                </div>
              ) : summary ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 0.3 }}
                  className="prose prose-invert text-white"
                >
                  <ReactMarkdown>{summary}</ReactMarkdown>
                </motion.div>
              ) : (
                <p className="text-gray-400 text-center">No summary available.</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
