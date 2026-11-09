import React from 'react';
import { AlertCircle, ArrowRight, Bell, CalendarDays, Check, CheckCircle2, ChevronRight, CircleUserRound, Filter, Home, LayoutGrid, Lock, Mail, Menu, MousePointer2, Search, ShoppingBag, Star, UserRound } from 'lucide-react';
import { examples } from '../content/examples.js';
import './examples.css';

function MiniVisual({ kind }) {
  if (kind === 'navtop') return <div className="mini-browser"><div className="mini-browser-head"><b>studio<span>.</span></b><span>Work&nbsp;&nbsp; About&nbsp;&nbsp; Contact</span><Menu size={17}/></div><div className="mini-browser-body"><i/><i/><i/></div></div>;
  if (kind === 'navbottom') return <div className="mini-phone"><div className="mini-phone-content"><div className="mini-row wide"/><div className="mini-row"/><div className="mini-tile-row"><i/><i/></div></div><div className="mini-bottom-nav"><Home size={17} fill="currentColor"/><Search size={17}/><ShoppingBag size={17}/><UserRound size={17}/></div></div>;
  if (kind === 'filters') return <div className="mini-search-visual"><div className="mini-search-bar"><Search size={15}/><span>Search collection</span><Filter size={15}/></div><div className="mini-chip-row"><b>All</b><i>Popular</i><i>New</i></div><div className="mini-result-row"><i/><i/><i/></div></div>;
  if (kind === 'button' || kind === 'disabled' || kind === 'loading') return <div className="mini-button-visual"><div className="mini-row"/><div className="mini-row small"/><div className={`mini-cta ${kind}`}>{kind === 'loading' ? <><span className="spinner"/> Loading</> : kind === 'disabled' ? 'Continue' : <>Continue <ArrowRight size={14}/></>}</div></div>;
  if (kind === 'steps' || kind === 'branch') return <div className="mini-flow"><span><b>1</b><i/></span><ChevronRight size={16}/><span><b>2</b><i/></span><ChevronRight size={16}/><span><b>3</b><i/></span>{kind === 'branch' && <small>or try another route ↗</small>}</div>;
  if (kind === 'success' || kind === 'error' || kind === 'empty') return <div className="mini-state"><span className={`mini-state-icon ${kind}`}>{kind === 'success' ? <CheckCircle2/> : kind === 'error' ? <AlertCircle/> : <Search/>}</span><div className="mini-row"/><div className="mini-row small"/><div className="mini-state-action"/></div>;
  if (kind === 'notes' || kind === 'test' || kind === 'quote') return <div className="mini-note"><span className="mini-quote">{kind === 'quote' ? '“' : kind === 'test' ? '✓' : '✎'}</span><div className="mini-row wide"/><div className="mini-row"/><div className="mini-row small"/><div className="mini-note-dots"><i/><i/><i/></div></div>;
  if (kind === 'persona') return <div className="mini-persona"><CircleUserRound size={38}/><div><div className="mini-row wide"/><div className="mini-row"/><div className="mini-row small"/></div></div>;
  if (kind === 'sitemap') return <div className="mini-sitemap"><div className="mini-node root"/><div className="mini-sitemap-lines"><i/><i/><i/></div><div className="mini-node-row"><span/><span/><span/></div></div>;
  if (kind === 'wireframe' || kind === 'phone') return <div className="mini-wirephone"><div className="mini-wirebar"/><div className="mini-wirehero"/><div className="mini-row wide"/><div className="mini-row"/><div className="mini-wirebutton"/></div>;
  if (kind === 'form') return <div className="mini-form"><div className="mini-row small"/><div className="mini-input"><Mail size={13}/></div><div className="mini-input"><Lock size={13}/></div><div className="mini-wirebutton"/></div>;
  if (kind === 'type' || kind === 'article') return <div className="mini-type"><strong>Aa</strong><div className="mini-row wide"/><div className="mini-row"/><div className="mini-row small"/></div>;
  if (kind === 'palette') return <div className="mini-palette"><i/><i/><i/><i/><div className="mini-row wide"/></div>;
  if (kind === 'grid' || kind === 'responsive') return <div className="mini-grid"><div className="mini-grid-wide"><i/><i/><i/></div><ArrowRight size={15}/><div className="mini-grid-narrow"><i/><i/><i/></div></div>;
  if (kind === 'calendar') return <div className="mini-calendar"><div><CalendarDays size={18}/> October</div><section>{Array.from({length: 12}, (_,i)=><i key={i} className={i===7?'chosen':''}/>)}</section></div>;
  if (kind === 'chart') return <div className="mini-chart"><div className="mini-chart-bars"><i/><i/><i/><i/></div><div className="mini-row wide"/><div className="mini-row small"/></div>;
  if (kind === 'compare') return <div className="mini-compare"><div><div className="mini-row"/><i/><i/></div><span>↔</span><div><div className="mini-row"/><i/><i/></div></div>;
  if (kind === 'browser') return <div className="mini-browser"><div className="mini-browser-head"><b>hello<span>.</span></b><span>Features&nbsp;&nbsp; About</span></div><div className="mini-browser-hero"><div><div className="mini-row wide"/><div className="mini-row"/><div className="mini-wirebutton"/></div><i/></div></div>;
  return <div className="mini-wirephone"><div className="mini-wirebar"/><div className="mini-wirehero"/><div className="mini-row wide"/><div className="mini-row"/><div className="mini-wirebutton"/></div>;
}

export default function ExampleSlide({ day }) {
  const item = examples[day];
  if (!item) return null;
  return <section className="example-slide" aria-label={`Illustrated examples for day ${day}`}>
    <div className="example-top"><span>DESIGNERKID / LEARN BY SEEING</span><span>DAY {String(day).padStart(2,'0')} · EXAMPLES</span></div>
    <h2>{item.heading}</h2>
    <div className="example-cards">{item.cards.map(([title, caption, kind], index) => <div className={`example-card tone-${index}`} key={title}>
      <div className="example-visual" aria-hidden="true"><MiniVisual kind={kind}/></div>
      <div className="example-copy"><h3>{title}</h3><p>{caption}</p></div>
    </div>)}</div>
    <p className="example-takeaway"><span>✦</span>{item.takeaway}</p>
  </section>;
}
