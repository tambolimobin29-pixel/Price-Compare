import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@/services/productService';

export async function GET(request: NextRequest) {
  try {
    const deals = await productService.getTopDeals();

    return NextResponse.json(
      {
        success: true,
        count: deals.length,
        data: deals,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=180, stale-while-revalidate=360',
        },
      }
    );
  } catch (error: any) {
    console.error('API /api/deals error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve deals.' },
      { status: 500 }
    );
  }
}
