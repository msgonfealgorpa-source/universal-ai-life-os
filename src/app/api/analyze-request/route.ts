import { NextRequest, NextResponse } from 'next/server';
import { analyzeQuery } from '@/lib/core-brain';
import { saveSearchHistory } from '@/lib/learning-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;
    
    if (!query) {
      return NextResponse.json({ success: false, error: 'Query required' }, { status: 400 });
    }

    const analysis = await analyzeQuery(query);
    
    saveSearchHistory({
      id: `search-${Date.now()}`,
      query,
      intent: analysis.intent,
      timestamp: Date.now()
    });

    return NextResponse.json({ success: true, data: analysis });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Analysis failed' }, { status: 500 });
  }
}
