import React, { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, BriefcaseBusiness, CheckCircle2, Coffee, Download, ExternalLink, FileCheck2, FileText, Layers3, MessageSquare, Send, Sparkles, Target, X } from 'lucide-react';
import { blogs, guides } from '../content/resources.js';
import './content-pages.css';
import './cv-visual.css';
import VisualGuide, { hasVisualGuide } from './VisualGuides.jsx';

const reviewEndpoint = 'https://algjumgwfnecbxkscwck.supabase.co/rest/v1/designerkid_reviews';
const publicKey = 'sb_publishable_rwK5OifRmoMpfwBm_z9LVQ_G-425drA';
const base = import.meta.env.BASE_URL;
const linkTo = (page, slug) => `#/${page}${slug ? `/${slug}` : ''}`;

function SourceLinks({ sources }) {
  return <div className="source-list"><h3>Further reading</h3>{sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} <ExternalLink size={14}/></a>)}</div>;
}

function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [form, setForm] = useState({ display_name: '', role: '', rating: 5, body: '', website: '' });
  const [state, setState] = useState('idle');
  const [message, setMessage] = useState('');
  useEffect(() => {
    let alive = true;
    fetch(`${reviewEndpoint}?select=id,display_name,role,rating,body,created_at&order=created_at.desc&limit=12`, {headers: {apikey: publicKey}})
      .then(async response => { if (!response.ok) throw new Error('Could not load reviews'); return response.json(); })
      .then(data => { if (alive) setReviews(data); })
      .catch(() => { if (alive) setLoadError(true); });
    return () => { alive = false; };
  }, []);
  const update = (key, value) => setForm(previous => ({...previous, [key]: value}));
  async function submit(event) {
    event.preventDefault();
    if (form.website) { setState('success'); return; }
    const display_name = form.display_name.trim();
    const role = form.role.trim();
    const body = form.body.trim();
    if (display_name.length < 2 || display_name.length > 60 || role.length > 80 || body.length < 20 || body.length > 800) {
      setMessage('Please use 2–60 characters for your name and 20–800 for your review.');
      return;
    }
    setState('sending'); setMessage('');
    try {
      const response = await fetch(reviewEndpoint, {
        method: 'POST',
        headers: {apikey: publicKey, 'Content-Type': 'application/json', Prefer: 'return=minimal'},
        body: JSON.stringify({display_name, role, rating: Number(form.rating), body})
      });
      if (!response.ok) throw new Error('Submission failed');
      setState('success');
      setForm({display_name: '', role: '', rating: 5, body: '', website: ''});
    } catch {
      setState('idle');
      setMessage('Your review could not be sent. Please try again in a moment.');
    }
  }
  return <section className="content-section reviews-section" id="reviews">
    <div className="content-section-title"><div><span className="section-label">FROM LEARNERS</span><h2>Reviews and reflections</h2><p>Share what helped you learn. New reviews appear after approval.</p></div><MessageSquare size={29}/></div>
    {reviews.length > 0 ? <div className="review-grid">{reviews.map(review => <article className="review-card" key={review.id}><div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</div><p>“{review.body}”</p><div className="review-person"><strong>{review.display_name}</strong>{review.role && <span>{review.role}</span>}</div></article>)}</div> : <div className="review-empty">{loadError ? 'Reviews are temporarily unavailable.' : 'No published reviews yet. Be the first to share your experience.'}</div>}
    <div className="review-form-wrap"><div><span className="section-label">YOUR VOICE</span><h3>Write a review</h3><p>Tell future learners what you found useful. Please share only your own experience. We check submissions before publishing.</p></div>{state === 'success' ? <div className="review-success"><CheckCircle2 size={28}/><strong>Thank you for sharing.</strong><span>Your review has been sent for approval.</span><button onClick={() => setState('idle')}>Write another</button></div> : <form className="review-form" onSubmit={submit}><div className="form-row"><label>Your name<input required minLength="2" maxLength="60" value={form.display_name} onChange={e => update('display_name', e.target.value)} placeholder="Name"/></label><label>Role or background <span>(optional)</span><input maxLength="80" value={form.role} onChange={e => update('role', e.target.value)} placeholder="UX learner"/></label></div><label>Rating<select value={form.rating} onChange={e => update('rating', e.target.value)}><option value="5">★★★★★ · 5 stars</option><option value="4">★★★★☆ · 4 stars</option><option value="3">★★★☆☆ · 3 stars</option><option value="2">★★☆☆☆ · 2 stars</option><option value="1">★☆☆☆☆ · 1 star</option></select></label><label>Your review<textarea required minLength="20" maxLength="800" value={form.body} onChange={e => update('body', e.target.value)} placeholder="What did you learn or enjoy?" rows="4"/></label><label className="honeypot" aria-hidden="true">Website<input tabIndex="-1" autoComplete="off" value={form.website} onChange={e => update('website', e.target.value)}/></label><div className="form-bottom"><span>{form.body.length}/800 characters</span><button type="submit" disabled={state === 'sending'}><Send size={15}/>{state === 'sending' ? 'Sending…' : 'Submit review'}</button></div>{message && <p role="alert" className="form-error">{message}</p>}</form>}</div>
  </section>;
}

export function Landing({ startLesson, progress }) {
  return <main>
    <section className="landing-hero"><div className="landing-hero-inner"><div><span className="hero-kicker"><span className="sparkle">✦</span> A PLACE TO LEARN DESIGN</span><h1>Design is easier<br/>when you <em>make it.</em></h1><p>Designerkid is a free, beginner-friendly space to learn UI and UX through clear lessons, visual examples, and small practical tasks. Spend an hour a day building skills you can explain and use.</p><div className="landing-actions"><a className="primary-button" href="#/lessons">Explore all 30 lessons <ArrowRight size={18}/></a><a className="secondary-button" href="#/guides">Explore career guides</a></div><div className="landing-facts"><span><strong>30</strong> lessons</span><span><strong>1 hour</strong> each</span><span><strong>Free</strong> to learn</span></div></div><div className="landing-preview" aria-hidden="true"><div className="preview-top"><span className="preview-dot"/><span className="preview-dot"/><span className="preview-dot"/><span>DESIGNERKID / LEARN</span></div><div className="preview-body"><div className="preview-side"><span>01</span><span>02</span><span>03</span></div><div className="preview-canvas"><div className="preview-kicker">THE LEARNING LOOP</div><div className="preview-title">Observe.<br/>Make.<br/><i>Improve.</i></div><div className="preview-shapes"><span/><span/><span/></div></div></div><div className="preview-bottom"><span>DAY 01 / 30</span><span>✦</span></div></div></div></section>
    <section className="content-section mission-section"><div className="mission-intro"><span className="section-label">WHY DESIGNERKID</span><h2>Learn the thinking behind the screens.</h2><p>The goal is to help new designers move from “this looks nice” to “here is the problem, the evidence, and why I chose this solution.”</p></div><div className="mission-grid"><article><span className="mission-icon">01</span><h3>Understand people</h3><p>Start with users, context, and the task they are trying to complete.</p></article><article><span className="mission-icon">02</span><h3>Practice in small steps</h3><p>Each lesson has slides, illustrated examples, and something to try.</p></article><article><span className="mission-icon">03</span><h3>Share your thinking</h3><p>Use career guides to present your decisions in a CV, portfolio, and interview.</p></article></div></section>
    <section className="content-section feature-section"><div className="content-section-title"><div><span className="section-label">START EXPLORING</span><h2>Everything in one place</h2></div></div><div className="feature-grid"><a href="#/lessons"><div className="feature-icon"><BookOpen/></div><span>01 / LEARN</span><h3>All lessons</h3><p>Thirty one-hour UI/UX sessions with read-only slide viewers and practical tasks.</p><b>Browse lessons <ArrowRight size={16}/></b></a><a href="#/guides"><div className="feature-icon"><FileText/></div><span>02 / PREPARE</span><h3>Docs & guides</h3><p>Interview prep, CV templates, portfolio structure, and research starters.</p><b>Open guides <ArrowRight size={16}/></b></a><a href="#/blog"><div className="feature-icon"><Sparkles/></div><span>03 / THINK</span><h3>Blog</h3><p>Short reads on UX fundamentals, accessible design, portfolios, and AI.</p><b>Read articles <ArrowRight size={16}/></b></a></div></section>
    <section className="content-section continue-section"><div><span className="section-label">YOUR NEXT STEP</span><h2>{progress ? `You’ve completed ${progress} of 30 lessons.` : 'Ready for your first lesson?'}</h2><p>Pick up where you left off or start with the basics. Progress is saved in this browser.</p></div><button className="primary-button" onClick={startLesson}>{progress ? 'Continue learning' : 'Start day 01'} <ArrowRight size={18}/></button></section>
    <ReviewSection/>
    <section className="content-section support-section"><div className="support-icon"><Coffee size={25}/></div><div><span className="section-label">SUPPORT THE CLASSROOM</span><h2>Enjoying the free lessons?</h2><p>If Designerkid has helped you, you’ll be able to buy the creator a coffee when the support page goes live. Learning is free, and support is always optional.</p></div><span className="support-placeholder">Coffee link coming soon</span></section>
  </main>;
}

function CardIndex({ kind, items }) {
  return <main className="library-page"><div className="library-hero"><span className="section-label">{kind === 'guides' ? 'PRACTICAL RESOURCES' : 'IDEAS & NOTES'}</span><h1>{kind === 'guides' ? 'Docs & guides' : 'The Designerkid blog'}</h1><p>{kind === 'guides' ? 'Clear steps for interviews, CVs, portfolios, and research. Download editable CV templates and build on what you learn in the course.' : 'Thoughtful, beginner-friendly reads about UI, UX, accessibility, portfolios, and AI in design.'}</p></div><div className="library-grid">{items.map(item => <a className="resource-card" href={linkTo(kind === 'guides' ? 'guide' : 'blog', item.slug)} key={item.slug}><div className="resource-meta"><span>{item.category}</span><span>{item.readTime} read</span></div><div className="resource-card-icon">{kind === 'guides' ? <FileText size={22}/> : <Sparkles size={22}/>}</div><h2>{item.title}</h2><p>{item.summary}</p><span className="resource-more">{kind === 'guides' ? 'Open guide' : 'Read article'} <ArrowRight size={16}/></span></a>)}</div></main>;
}
export const Guides = () => <CardIndex kind="guides" items={guides}/>;
export const Blog = () => <CardIndex kind="blog" items={blogs}/>;

const sectionId = (heading) => heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function BulletBuilder() {
  const [fields, setFields] = useState({action:'', work:'', method:'', outcome:''});
  const [copied, setCopied] = useState(false);
  const update = (key, value) => { setFields(previous => ({...previous, [key]: value})); setCopied(false); };
  const ready = fields.action.trim() && fields.work.trim();
  const sentence = ready ? [fields.action.trim(), fields.work.trim(), fields.method.trim() ? `by ${fields.method.trim()}` : '', fields.outcome.trim() ? `and ${fields.outcome.trim()}` : ''].filter(Boolean).join(' ').replace(/[.\s]+$/, '') + '.' : '';
  async function copy() {
    try { await navigator.clipboard.writeText(sentence); setCopied(true); }
    catch { setCopied(false); }
  }
  return <section className="bullet-builder" aria-label="CV bullet builder"><span className="section-label">WRITING TOOL</span><h2>Build an honest CV bullet</h2><p>Describe your real contribution. Add an outcome only when you can explain what happened.</p><div className="bullet-fields"><label>Action verb<input value={fields.action} onChange={e => update('action',e.target.value)} placeholder="Mapped, tested, simplified…"/></label><label>What you worked on<input value={fields.work} onChange={e => update('work',e.target.value)} placeholder="the booking flow for a class project"/></label><label>How you did it <span>(optional)</span><input value={fields.method} onChange={e => update('method',e.target.value)} placeholder="interviewing users and testing a prototype"/></label><label>What changed <span>(optional, only if true)</span><input value={fields.outcome} onChange={e => update('outcome',e.target.value)} placeholder="moving the price beside each option"/></label></div><div className="bullet-preview"><div><small>YOUR BULLET</small><p>{sentence || 'Add an action and what you worked on to see your draft here.'}</p></div><button type="button" onClick={copy} disabled={!ready}>{copied ? 'Copied' : 'Copy bullet'}</button></div><p className="tool-note">This is a writing aid. Check grammar and facts before using the result.</p></section>;
}

function Examples({examples}) {
  return <section className="example-section" id="examples"><span className="section-label">SEE THE DIFFERENCE</span><h2>Before and after examples</h2><p>These are invented examples to show the writing pattern. Use details from your own experience.</p><div className="example-list">{examples.map(example => <div className="writing-example" key={example.title}><h3>{example.title}</h3><div className="example-pair"><div><span>BEFORE</span><p>{example.before}</p></div><div><span>AFTER</span><p>{example.after}</p></div></div><small>{example.note}</small></div>)}</div></section>;
}

function ReferenceCards({cards}) {
  return <section className="cv-references" id="cv-references"><span className="section-label">MORE EXAMPLES</span><h2>Explore UX CV examples</h2><p>Look at how each example organizes its information. Adapt the structure to your experience, and use only claims you can support.</p><div className="cv-reference-grid">{cards.map(card => <a key={card.url} href={card.url} target="_blank" rel="noopener noreferrer"><strong>{card.label} <ExternalLink size={15}/></strong><span>{card.description}</span></a>)}</div></section>;
}

function TemplateGallery({downloads}) {
  return <section className="downloads template-gallery" id="downloads"><span className="section-label">MAKE IT YOURS</span><h2>Preview and download CV templates</h2><p>Open a full-page preview, then download the editable Word file you prefer.</p><div className="template-grid">{downloads.map(download => {
    const preview = `${base}images/downloads/${download.file.replace(/\.docx$/, '-preview.webp')}`;
    const isBeginner = download.file.includes('beginner');
    return <article className="template-card" key={download.file}><a className="template-image-link" href={preview} target="_blank" rel="noopener noreferrer" aria-label={`View full-size preview of ${download.label}`}><img src={preview} alt={`Full-page preview of ${download.label}, showing its headings and editable prompts`} loading="lazy"/><span>View full-size preview <ExternalLink size={15}/></span></a><div className="template-card-info"><h3>{download.label}</h3><p>{isBeginner ? 'Projects first, with space for learning and relevant experience.' : 'UX projects alongside transferable experience from earlier roles.'}</p><a href={`${base}images/downloads/${download.file}`} download><Download size={17}/> Download editable Word file</a></div></article>;
  })}</div><small>Previews show the exact template layout. Replace every bracketed prompt before applying.</small></section>;
}

function GuideHighlights({points}) {
  return <section className="guide-highlights" aria-label="CV guide essentials"><div><span className="section-label">START HERE</span><h2>The essentials</h2></div><ul>{points.map(point => <li key={point}><CheckCircle2 size={17}/><span>{point}</span></li>)}</ul></section>;
}

function ArticleChecklist({slug, items}) {
  const key = `designerkid-guide-checklist-${slug}-${items.join('|')}`;
  const [checked, setChecked] = useState(() => { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(checked)); }, [checked, key]);
  const toggle = (index) => setChecked(previous => previous.includes(index) ? previous.filter(value => value !== index) : [...previous, index]);
  return <section className="checklist" id="checklist"><div className="checklist-head"><div><span className="section-label">BEFORE YOU FINISH</span><h2>Quick checklist</h2></div><strong>{checked.length} of {items.length}</strong></div><div className="checklist-track"><span style={{width:`${checked.length / items.length * 100}%`}}/></div><ul>{items.map((point,index) => <li key={point}><label><input type="checkbox" checked={checked.includes(index)} onChange={() => toggle(index)}/><span>{point}</span></label></li>)}</ul><small>Saved only in this browser.</small></section>;
}

function CvVisualGuide({item}) {
  const jump = id => document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  return <main className="article-page cv-visual-page">
    <a className="article-back" href="#/guides">← All guides</a>
    <header className="cv-visual-head"><span className="section-label">CAREER / CV GUIDE</span><h1>Make your UX CV <em>easy to read.</em></h1><p>See what goes where, turn a task into evidence, and finish with a file you can send.</p><div className="cv-visual-actions"><button onClick={() => jump('cv-map')}>See the layout <ArrowRight size={17}/></button><button onClick={() => jump('downloads')}>Get the templates <Download size={16}/></button></div></header>
    <section className="cv-visual-section" id="cv-map"><div className="cv-visual-title"><span className="section-label">01 / STRUCTURE</span><h2>What belongs on the page?</h2><p>One clear path from your name to the evidence of your work.</p></div><div className="cv-anatomy"><div className="cv-paper" aria-label="Illustrative UX CV layout"><div className="cv-paper-label">FICTIONAL EXAMPLE · NOT A REAL APPLICANT</div><div className="cv-paper-header"><div><strong>Ari Designer</strong><span>Junior UX Designer</span></div><b>01</b></div><div className="cv-paper-contact">ari@email.com <i>·</i> portfolio.example <i>·</i> LinkedIn</div><div className="cv-paper-block"><b>PROFILE <small>02</small></b><p>Designing clear booking flows through research and prototype testing.</p></div><div className="cv-paper-block"><b>SELECTED PROJECTS <small>03</small></b><strong>Campus event booking <em>Student project · 2026</em></strong><p>Mapped the booking flow, tested a prototype, and moved ticket details earlier after classmates missed them.</p><strong>Course finder <em>Student project · 2026</em></strong><p>Compared navigation options and tested which labels helped students find a course.</p></div><div className="cv-paper-block cv-paper-split"><div><b>SKILLS <small>04</small></b><p>Interviews · user flows · prototyping · Figma</p></div><div><b>EDUCATION <small>05</small></b><p>Relevant course or degree · year</p></div></div></div><ol className="cv-anatomy-notes"><li><b>01</b><div><strong>Easy to contact</strong><span>Name, role, email, portfolio. Test every link.</span></div></li><li><b>02</b><div><strong>Two-line introduction</strong><span>Your focus and one real piece of evidence.</span></div></li><li><b>03</b><div><strong>Work before tool lists</strong><span>Show your role, method, and what you observed.</span></div></li><li><b>04</b><div><strong>Skills you can show</strong><span>List methods and tools you can discuss.</span></div></li><li><b>05</b><div><strong>Relevant learning</strong><span>Keep education and certificates concise.</span></div></li></ol></div></section>
    <section className="cv-visual-section" id="cv-order"><div className="cv-visual-title"><span className="section-label">02 / PRIORITY</span><h2>Lead with your strongest evidence.</h2><p>Choose the order that makes your real work easiest to find.</p></div><div className="cv-path-grid"><article><div className="cv-path-icon"><Layers3 size={20}/></div><h3>New to UX</h3><div className="cv-path-flow"><span>Projects</span><ArrowRight size={15}/><span>Skills</span><ArrowRight size={15}/><span>Education</span></div><p>Show dated class or personal projects near the top.</p></article><article><div className="cv-path-icon"><Target size={20}/></div><h3>Changing careers</h3><div className="cv-path-flow"><span>UX projects</span><ArrowRight size={15}/><span>Transferable work</span></div><p>Connect earlier experience to user needs and problem solving.</p></article><article><div className="cv-path-icon"><BriefcaseBusiness size={20}/></div><h3>Already designing</h3><div className="cv-path-flow"><span>Recent roles</span><ArrowRight size={15}/><span>Selected projects</span></div><p>Lead with scope, decisions, and outcomes from your work.</p></article></div></section>
    <section className="cv-visual-section" id="cv-bullets"><div className="cv-visual-title"><span className="section-label">03 / EVIDENCE</span><h2>Turn a task into a story.</h2><p>Use this pattern for a project or experience bullet.</p></div><div className="cv-formula" aria-label="Bullet formula"><div><span>1</span><strong>Action</strong><small>What you did</small></div><ArrowRight/><div><span>2</span><strong>Work</strong><small>What you changed</small></div><ArrowRight/><div><span>3</span><strong>Method</strong><small>How you learned</small></div><ArrowRight/><div><span>4</span><strong>Result</strong><small>What you observed</small></div></div><div className="cv-bullet-compare"><div><span>VAGUE</span><p>“Worked on an event booking app in Figma.”</p></div><ArrowRight className="cv-compare-arrow"/><div><span>SPECIFIC</span><p>“Mapped a student event booking flow, tested two prototypes, and moved ticket details earlier after classmates missed them.”</p></div></div><p className="cv-example-note">Illustrative example. Replace every detail with your own work; use numbers only when you can explain them.</p></section>
    <section className="cv-visual-section cv-rule-section" id="cv-rules"><div className="cv-visual-title"><span className="section-label">04 / FINISH</span><h2>A few checks make it stronger.</h2></div><div className="cv-rule-grid"><div className="cv-rule-card good"><h3><CheckCircle2 size={19}/> Do</h3><ul><li>Use clear headings and dates</li><li>Link directly to your portfolio</li><li>Label student projects honestly</li><li>Show real observations or learning</li></ul></div><div className="cv-rule-card avoid"><h3><X size={18}/> Avoid</h3><ul><li>Copied sample metrics</li><li>Long software lists or skill bars</li><li>Dense columns and tiny type</li><li>Broken links or placeholder text</li></ul></div></div><div className="cv-file-flow"><div><FileText size={20}/><strong>Edit your DOCX</strong><span>Replace every prompt.</span></div><ArrowRight/><div><FileCheck2 size={20}/><strong>Export your file</strong><span>Use PDF or DOCX as requested.</span></div><ArrowRight/><div><CheckCircle2 size={20}/><strong>Open and test it</strong><span>Check links and selectable text.</span></div></div></section>
    <div className="cv-visual-bottom"><div className="cv-visual-main article-content"><BulletBuilder/><ReferenceCards cards={item.referenceCards}/><TemplateGallery downloads={item.downloads}/><ArticleChecklist slug={item.slug} items={item.checklist}/><details className="cv-deeper"><summary>Want the detailed writing notes?</summary><div>{item.sections.map(section => <section key={section.heading}><h3>{section.heading}</h3>{section.paragraphs.map((paragraph,index) => <p key={index}>{paragraph}</p>)}</section>)}</div></details><SourceLinks sources={item.sources}/></div></div>
  </main>;
}

function Article({ kind, slug }) {
  const item = (kind === 'guide' ? guides : blogs).find(entry => entry.slug === slug);
  if (!item) return <main className="article-page"><h1>Page not found</h1><a href={kind === 'guide' ? '#/guides' : '#/blog'}>Back to {kind === 'guide' ? 'guides' : 'blog'}</a></main>;
  return <main className="article-page">
    <a className="article-back" href={kind === 'guide' ? '#/guides' : '#/blog'}>← {kind === 'guide' ? 'All guides' : 'All articles'}</a>
    <header className="article-head"><div className="article-meta"><span>{item.category}</span><span>·</span><span>{item.readTime} read</span></div><h1>{item.title}</h1><p>{item.summary}</p></header>
    {item.keyPoints && <GuideHighlights points={item.keyPoints}/>}
    {kind === 'guide' && <nav className="article-jump" aria-label="On this page"><strong>On this page</strong>{item.sections.map((section,index) => <button type="button" key={section.heading} onClick={() => document.getElementById(sectionId(section.heading))?.scrollIntoView({behavior:'smooth'})}><span>{String(index+1).padStart(2,'0')}</span>{section.heading}</button>)}{item.examples && <button type="button" onClick={() => document.getElementById('examples')?.scrollIntoView({behavior:'smooth'})}><span>✦</span>Examples</button>}{item.referenceCards && <button type="button" onClick={() => document.getElementById('cv-references')?.scrollIntoView({behavior:'smooth'})}><span>↗</span>CV references</button>}{item.downloads && <button type="button" onClick={() => document.getElementById('downloads')?.scrollIntoView({behavior:'smooth'})}><span>↓</span>Templates</button>}<button type="button" onClick={() => document.getElementById('checklist')?.scrollIntoView({behavior:'smooth'})}><span>✓</span>Checklist</button></nav>}
    <div className="article-layout"><article className="article-content">
      {item.downloads && <BulletBuilder/>}
      {item.sections.map((section,index) => <section className="article-section" id={sectionId(section.heading)} key={section.heading}><div className="article-section-number">{String(index+1).padStart(2,'0')}</div><div><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}</div></section>)}
      {item.examples && <Examples examples={item.examples}/>}
      {item.referenceCards && <ReferenceCards cards={item.referenceCards}/>}
      {item.downloads && <TemplateGallery downloads={item.downloads}/>}
      {item.checklist && <ArticleChecklist slug={slug} items={item.checklist}/>}
      <SourceLinks sources={item.sources}/>
    </article><aside className="article-aside"><span className="section-label">KEEP LEARNING</span><h3>Put this into practice</h3><p>Explore the 30-day course and apply one idea in your next design task.</p><a href="#/lessons">Browse lessons <ArrowRight size={16}/></a></aside></div>
  </main>;
}
export const GuideArticle = ({slug}) => {
  const item = guides.find(entry => entry.slug === slug);
  if (slug === 'ux-cv-guide') return <CvVisualGuide item={item}/>;
  if (item && hasVisualGuide(slug)) return <VisualGuide item={item} Checklist={ArticleChecklist} Sources={SourceLinks}/>;
  return <Article kind="guide" slug={slug}/>;
};
export const BlogArticle = ({slug}) => <Article kind="blog" slug={slug}/>;
