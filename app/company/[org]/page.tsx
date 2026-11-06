import type {Metadata} from 'next';
import Link from 'next/link';
import {getCompany,getDataStatus} from '@/lib/data';
import {CompanyView} from '@/components/company/company-view';
import styles from '@/components/company/company.module.css';
type Props={params:Promise<{org:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {org}=await params;const company=await getCompany(org);const title=company?`${company.name} — Signalpost`:'Company not found — Signalpost';const description=company?`Check ${company.name}, fact by fact. Company information, filed accounts and the original sources.`:'Find and check Norwegian companies with original sources.';return {title,description,openGraph:{title,description,type:'website'}};}
export default async function CompanyPage({params}:Props){const {org}=await params;const company=await getCompany(org);if(!company){const status=await getDataStatus();return <main className={`${styles.page} ${styles.error}`}><h1>{status.available?'Company not found':'Data temporarily unavailable'}</h1><p>{status.available?`We couldn't find a company with organisation number ${org}. Try searching by name, city or industry.`:'The public data file could not be loaded. Please try again shortly.'}</p><Link href="/">← Back to company search</Link>{!status.available&&<p><a href={`/company/${encodeURIComponent(org)}`}>Try again</a></p>}</main>;}return <CompanyView company={company}/>;}
