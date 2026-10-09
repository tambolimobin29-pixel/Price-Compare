import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@/services/productService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';

    if (!q || q.trim().length < 2) {
      return NextResponse.json({ success: true, count: 0, data: [] });
    }

    const suggestions = await productService.getSearchSuggestions(q);

    return NextResponse.json(
      {
        success: true,
        count: suggestions.length,
        data: suggestions,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=180',
        },
      }
    );
  } catch (error: any) {
    console.error('API /api/search error:', error);
    return NextResponse.json(
      { success: false, error: 'Search autocomplete error.' },
      { status: 500 }
    );
  }
}
