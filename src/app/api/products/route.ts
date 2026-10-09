import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hduvhpexwnseomkchgmi.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_OKE_Msy0AQdPRccNoN1u2A_RfHohcTg'
);

export async function GET(request: NextRequest) {
  try {
    const { data: dbProducts, error: dbError } = await supabase
      .from('products')
      .select('*');

    if (dbError) {
      return NextResponse.json(
        { success: false, error: dbError.message },
        { status: 500 }
      );
    }

    const products = dbProducts || [];

    return NextResponse.json(
      {
        success: true,
        count: products.length,
        total: products.length,
        data: products,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
        },
      }
    );
  } catch (error: any) {
    console.error('API /api/products error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Database connection failed. Please check Supabase credentials.',
      },
      { status: 500 }
    );
  }
}