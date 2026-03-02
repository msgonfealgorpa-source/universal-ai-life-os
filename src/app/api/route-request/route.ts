import { NextRequest, NextResponse } from 'next/server';
import productsData from '@/data/products.json';
import jobsData from '@/data/jobs.json';
import servicesData from '@/data/services.json';
import { IntentType, ExtractedEntities, Product, Job, Service } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, intent, entities }: { query: string; intent: IntentType; entities: ExtractedEntities } = body;
    
    if (!query) {
      return NextResponse.json({ success: false, error: 'Query required' }, { status: 400 });
    }

    let results: (Product | Job | Service)[] = [];

    switch (intent) {
      case 'product_search':
      case 'comparison':
      case 'recommendation':
        results = searchProducts(query, entities);
        break;
      case 'job_search':
        results = searchJobs(query, entities);
        break;
      case 'service_search':
      case 'website_builder':
        results = searchServices(query, entities);
        break;
      default:
        results = [
          ...searchProducts(query, entities).slice(0, 3),
          ...searchJobs(query, entities).slice(0, 3),
          ...searchServices(query, entities).slice(0, 3)
        ];
    }

    return NextResponse.json({ success: true, data: { results, totalResults: results.length } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Routing failed' }, { status: 500 });
  }
}

function searchProducts(query: string, entities: ExtractedEntities): Product[] {
  let products = [...productsData.products] as Product[];
  const q = query.toLowerCase();
  
  products = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.nameAr.includes(query) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    p.brand.toLowerCase().includes(q)
  );
  
  if (entities.category) products = products.filter(p => p.category === entities.category);
  if (entities.brand) products = products.filter(p => p.brand.toLowerCase() === entities.brand!.toLowerCase());
  if (entities.budget?.max) products = products.filter(p => p.price <= entities.budget!.max!);
  
  return products.sort((a, b) => b.rating - a.rating).slice(0, 12);
}

function searchJobs(query: string, entities: ExtractedEntities): Job[] {
  let jobs = [...jobsData.jobs] as Job[];
  const q = query.toLowerCase();
  
  jobs = jobs.filter(j =>
    j.title.toLowerCase().includes(q) ||
    j.titleAr.includes(query) ||
    j.skills.some(s => s.toLowerCase().includes(q))
  );
  
  return jobs.sort((a, b) => (a.featured ? -1 : 1) - (b.featured ? -1 : 1)).slice(0, 10);
}

function searchServices(query: string, entities: ExtractedEntities): Service[] {
  let services = [...servicesData.services] as Service[];
  const q = query.toLowerCase();
  
  services = services.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.nameAr.includes(query) ||
    s.tags.some(t => t.toLowerCase().includes(q))
  );
  
  return services.sort((a, b) => b.rating - a.rating).slice(0, 10);
}
