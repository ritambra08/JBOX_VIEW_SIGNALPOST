import type {Metadata} from 'next';
import Link from 'next/link';
import {getCompanies,toIndex} from '@/lib/data';
import {formatDate,readable,stateLabels} from '@/lib/format';
import {SourceMarks} from '@/components/site/source-marks';
import {HomeView} from '@/components/directory/home-view';
import styles from '@/components/directory/home.module.css';

export const metadata:Metadata={title:'Signalpost — Check a Norwegian company',description:'Find Norwegian companies, compare facts and check every original source.',openGraph:{title:'Signalpost — Check a Norwegian company',description:'Every fact shows where it came from.'}};
export const revalidate=3600;

export default async function Home(){
 const companies=await getCompanies();
 const fullest=[...companies].sort((a,b)=>b.completeness-a.completeness)[0];
 const specimen=fullest?<div className={styles.specimenWrap}><article className={styles.specimen} aria-label="A real company, with its sources"><div className={styles.specimenHeading}><span className={styles.exampleLabel}>A company, fact by fact</span><Link href={`/company/${fullest.org}`}>{fullest.name} <span aria-hidden="true">↗</span></Link><small>Org. nr {fullest.org}</small></div><div className={styles.specimenRows}>{[['revenue','Revenue'],['chief_executive','Chief executive'],['business_address','Business address']].map(([key,label])=>{const fact=fullest.facts[key];if(!fact)return <div className={styles.specimenRow} key={key}><span>{label}</span><strong>Not found</strong></div>;const evidence=(fact.ev??[]).map(i=>fullest.E[i]).filter(Boolean);const localFact={...fact,ev:evidence.map((_,i)=>i)};return <div className={styles.specimenRow} key={key}><span>{label}</span><strong>{fact.state==='available'?(fact.text||readable(fact.value)):`${stateLabels[fact.state]}${fact.reason?` — ${fact.reason}`:''}`}</strong><SourceMarks company={{name:fullest.name,org:fullest.org}} fact={localFact} evidence={evidence}/></div>;})}</div>{(()=>{const fact=fullest.facts.revenue;if(fact?.state!=='available')return null;const item=(fact.ev??[]).map(i=>fullest.E[i]).filter(Boolean).find(e=>!/\.(valuta|regnskapsperiode|regnskapstype)$/.test(e.l));if(!item)return null;let quote=item.x;try{quote=readable(JSON.parse(item.x));}catch{}return <div className={styles.openExtract}><div className={styles.extractLabel}><span aria-hidden="true">↳</span> Source extract</div><p>Operating revenue in the filed accounts</p><blockquote>{quote}</blockquote><small>{item.s} · Retrieved {formatDate(item.t)}</small></div>;})()}</article><p className={styles.caption}>Every fact has a source mark. Select one to see the original.</p></div>:null;
 return <HomeView index={companies.map(toIndex)} specimen={specimen} unavailable={!companies.length}/>;
}
