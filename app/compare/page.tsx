import {getDirectory,getCompany} from '@/lib/data';
import {CompareView} from '@/components/compare/compare-view';
import {RevenueHistory} from '@/components/company/revenue-history';
export const metadata={title:'Compare two companies',openGraph:{title:'Compare companies | Signalpost'}};
export default async function Page({searchParams}:{searchParams:Promise<{a?:string;b?:string}>}){const q=await searchParams;const [index,a,b]=await Promise.all([getDirectory(),q.a?getCompany(q.a):undefined,q.b?getCompany(q.b):undefined]);const ah=a?.facts.annual_accounts_history?.value;const bh=b?.facts.annual_accounts_history?.value;return <main><CompareView index={index} a={a} b={b}/>{a&&b&&Array.isArray(ah)&&Array.isArray(bh)&&ah.length>=2&&bh.length>=2&&<div className="content-card compare-chart"><RevenueHistory series={[{name:a.name,periods:ah,color:'#1F5FA8'},{name:b.name,periods:bh,color:'#2E7D5B'}]}/></div>}</main>;}
