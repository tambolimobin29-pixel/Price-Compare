import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@/services/productService';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const product = await productService.getProductBySlug(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: `Product with identifier '${id}' was not found.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: product,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error: any) {
    console.error('API /api/products/[id] error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve product details.',
      },
      { status: 500 }
    );
  }
}
