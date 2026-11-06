'use client';
import type {Company,Fact,Evidence} from '@/lib/types';
import {useSource} from './source-context';
export function sourceKind(s:string){return /Regnskapsregisteret/i.test(s)?'RR':/Enhetsregisteret|Brønnøysund/i.test(s)?'ER':/NAV|arbeidsplassen/i.test(s)?'NAV':'WEB';}
export function SourceMarks({company,fact,evidence}:{company:Pick<Company,'name'|'org'>;fact:Fact;evidence:Evidence[]}){const open=useSource();if(fact.state!=='available')return null;const items=(fact.ev??[]).map(i=>evidence[i]).filter(Boolean);const kinds=[...new Set(items.map(e=>sourceKind(e.s)))];return <span className="source-marks">{(kinds.length?kinds:['Source']).map(kind=><button key={kind} type="button" className={`source-mark mark-${kind}`} aria-label={`Source: ${fact.label} (${kind})`} onClick={()=>open({company,fact,evidence:items})}>{kind}</button>)}</span>;}
