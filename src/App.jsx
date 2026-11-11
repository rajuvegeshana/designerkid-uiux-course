import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ChevronLeft, ChevronRight, ExternalLink, Expand, Grid2X2, Menu, Search, X } from 'lucide-react';
import course from '../content/course.json';
import slideManifest from '../content/slides.json';
import { examples } from '../content/examples.js';
import ExampleSlide from './ExampleSlide.jsx';
import { Landing, Guides, GuideArticle, Blog, BlogArticle } from './ContentPages.jsx';

const base = import.meta.env.BASE_URL;
const dayLabel = (day) => `Day ${String(day).padStart(2, '0')}`;
const readHash = () => {
  const match = location.hash.match(/^#\/lesson\/(\d{1,2})(?:\/(\d+))?/);
  if (match) return { page: 'lesson', day: Number(match[1]), slide: Number(match[2] || 1) };
  const page = location.hash.match(/^#\/(lessons|guides|guide|blog)(?:\/([a-z0-9-]+))?/);
  return { page: page?.[1] || 'home', slug: page?.[2] || null, day: null, slide: 1 };
};
const slideUrl = (day, slide, format = 'jpg') => `${base}images/lessons/day-${String(day).padStart(2, '0')}/slide-${String(slide).padStart(2, '0')}.${format}`;
const moduleFor = (day) => course.modules.find(module => day >= module.start && day <= module.end);

function App() {
  const [route, setRoute] = useState(readHash);
  const [search, setSearch] = useState('');
  const [moduleIndex, setModuleIndex] = useState(-1);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [done, setDone] = useState(() => { try { return JSON.parse(localStorage.getItem('designerkid-progress') || '[]'); } catch { return []; } });
  const slideRef = useRef(null);
  const lesson = route.day && course.lessons.find(item => item.day === route.day);
  const deck = lesson && slideManifest[String(lesson.day)];
  const hasExample = !!(lesson && examples[lesson.day]);
  const totalSlides = deck ? deck.count + (hasExample ? 1 : 0) : 0;
  const currentSlide = deck ? Math.min(Math.max(route.slide, 1), totalSlides) : 1;
  const isExample = hasExample && currentSlide === 5;
  const sourceSlide = currentSlide > 5 && hasExample ? currentSlide - 1 : currentSlide;

  useEffect(() => {
    const onHash = () => { setRoute(readHash()); setMobileMenu(false); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => { localStorage.setItem('designerkid-progress', JSON.stringify(done)); }, [done]);
  useEffect(() => {
    if (!lesson || !deck) return;
    const onKey = (event) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (event.key === 'ArrowRight' && currentSlide < totalSlides) goSlide(currentSlide + 1);
      if (event.key === 'ArrowLeft' && currentSlide > 1) goSlide(currentSlide - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lesson?.day, totalSlides, currentSlide]);

  const goHome = () => { location.hash = '#/'; };
  const goLessons = () => { location.hash = '#/lessons'; };
  const goLesson = (day) => { location.hash = `#/lesson/${day}/1`; };
  const goSlide = (slide) => { location.hash = `#/lesson/${lesson.day}/${slide}`; };
  const toggleDone = (day) => setDone(previous => previous.includes(day) ? previous.filter(x => x !== day) : [...previous, day]);
  const filtered = useMemo(() => course.lessons.filter(item => {
    const inModule = moduleIndex < 0 || course.modules[moduleIndex] === moduleFor(item.day);
    return inModule && `${item.title} ${item.description} ${item.day}`.toLowerCase().includes(search.toLowerCase());
  }), [search, moduleIndex]);

  return <div className="site-shell">
    <header className="topbar">
      <div className="topbar-inner">
        <button className="brand" onClick={goHome} aria-label="Designerkid home"><span className="brand-mark">d<span>.</span></span><span>designerkid</span></button>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#/lessons" className={route.page === 'lessons' || route.page === 'lesson' ? 'active' : ''}>All lessons</a><a href="#/guides" className={route.page === 'guides' || route.page === 'guide' ? 'active' : ''}>Docs & guides</a><a href="#/blog" className={route.page === 'blog' ? 'active' : ''}>Blog</a></nav>
        <div className="topbar-right"><span className="course-tag"><span className="tag-dot"/> UI/UX Foundations</span><button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label={mobileMenu ? 'Close menu' : 'Open menu'}>{mobileMenu ? <X size={21}/> : <Menu size={21}/>}</button></div>
      </div>
      {mobileMenu && <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#/lessons">All lessons</a><a href="#/guides">Docs & guides</a><a href="#/blog">Blog</a></nav>}
    </header>

    {lesson ? <main className="lesson-page">
      <div className="lesson-topline"><button className="back-link" onClick={goLessons}><ArrowLeft size={17}/> All lessons</button><span>{dayLabel(lesson.day)} <span className="tiny-divider">/</span> 30</span></div>
      <div className="lesson-heading"><div><span className="eyebrow">{moduleFor(lesson.day).name} · 1 hour</span><h1>{lesson.title}</h1><p>{lesson.description}</p></div><button className={`complete-btn ${done.includes(lesson.day) ? 'is-complete' : ''}`} onClick={() => toggleDone(lesson.day)}>{done.includes(lesson.day) ? <CheckCircle2 size={18}/> : <Check size={18}/>} {done.includes(lesson.day) ? 'Completed' : 'Mark complete'}</button></div>
      {lesson.session && <a className="lesson-session" href={lesson.session.url} target="_blank" rel="noopener noreferrer"><span className="lesson-session-icon"><BookOpen size={20}/></span><span><small>SESSION DECK</small><strong>{lesson.session.label}</strong><em>Open the Figma slides in a new tab</em></span><ExternalLink size={18} aria-hidden="true"/></a>}
      {deck ? <div className="viewer-layout"><div className="viewer-main"><div className={`slide-frame ${isExample ? 'example-frame' : ''}`} ref={slideRef}>{isExample ? <ExampleSlide day={lesson.day}/> : <img src={slideUrl(lesson.day, sourceSlide, deck.format)} alt={`${lesson.title}, slide ${currentSlide} of ${totalSlides}`} draggable="false"/>}</div><div className="viewer-toolbar"><div className="slide-count"><span className="live-dot"/> Slide {currentSlide} <span>of {totalSlides}</span></div><div className="viewer-actions"><button onClick={() => slideRef.current?.requestFullscreen?.()} title="Fullscreen" aria-label="View slide fullscreen"><Expand size={18}/></button><span className="toolbar-separator"/><button onClick={() => goSlide(currentSlide - 1)} disabled={currentSlide === 1} aria-label="Previous slide"><ChevronLeft size={20}/></button><button onClick={() => goSlide(currentSlide + 1)} disabled={currentSlide === totalSlides} aria-label="Next slide"><ChevronRight size={20}/></button></div></div><div className="viewer-note">Use the arrow keys to move between slides. Slides are view only.</div></div><aside className="slide-sidebar"><div className="sidebar-header"><span>IN THIS LESSON</span><span>{totalSlides} slides</span></div><div className="thumb-list">{Array.from({length: totalSlides}, (_, i) => { const example = hasExample && i === 4; const imageIndex = i > 4 && hasExample ? i : i + 1; return <button key={i} className={`thumb-row ${currentSlide === i+1 ? 'selected' : ''}`} onClick={() => goSlide(i+1)} aria-label={`Go to slide ${i+1}${example ? ', visual examples' : ''}`} aria-current={currentSlide === i+1 ? 'true' : undefined}><span className="thumb-num">{String(i+1).padStart(2,'0')}</span>{example ? <span className="example-thumb">✦ <small>examples</small></span> : <img loading="lazy" src={slideUrl(lesson.day, imageIndex, deck.format)} alt=""/>}<span>{example ? 'Visual examples' : `Slide ${i+1}`}</span></button>; })}</div></aside></div> : <div className="empty-deck"><div className="empty-icon"><BookOpen size={28}/></div><h2>Lesson slides are being prepared</h2><p>The course topic and practice task are ready. The original PowerPoint for this day has not been added to the website yet.</p><button onClick={goLessons}>Browse other lessons <ArrowRight size={17}/></button></div>}
      <div className="lesson-bottom"><div className="practice-card"><span className="eyebrow">YOUR PRACTICE</span><h2>Try this after class</h2><p>{lesson.task}</p>{lesson.resource && <a href={lesson.resource.url} target="_blank" rel="noopener noreferrer">Live example: {lesson.resource.label} <ExternalLink size={15}/></a>}</div><div className="next-card"><span className="eyebrow">KEEP GOING</span><h2>{lesson.day < 30 ? course.lessons[lesson.day].title : 'You made it to day 30'}</h2>{lesson.day < 30 && <button onClick={() => goLesson(lesson.day + 1)}>Day {String(lesson.day + 1).padStart(2,'0')} <ArrowRight size={17}/></button>}</div></div>
    </main> : route.page === 'home' ? <Landing progress={done.length} startLesson={() => goLesson(done.length ? Math.min(Math.max(...done)+1, 30) : 1)}/> : route.page === 'guides' ? <Guides/> : route.page === 'guide' ? <GuideArticle slug={route.slug}/> : route.page === 'blog' && route.slug ? <BlogArticle slug={route.slug}/> : route.page === 'blog' ? <Blog/> : <main>
      <section className="hero"><div className="hero-inner"><div className="hero-copy"><div className="hero-kicker"><span className="sparkle">✦</span> THE DESIGNERKID CLASSROOM</div><h1>Learn design.<br/><em>One day at a time.</em></h1><p>A friendly, practical path through UI and UX design. Start with the basics, practice in Figma, and build work you’re proud to share.</p><button className="primary-button" onClick={() => goLesson(done.length ? Math.min(Math.max(...done)+1, 30) : 1)}>Start learning <ArrowRight size={18}/></button><div className="hero-metrics"><div><strong>30</strong><span>guided lessons</span></div><div><strong>1 hr</strong><span>per session</span></div><div><strong>6</strong><span>course modules</span></div></div></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="art-card card-back"><div className="mini-heading"/><div className="mini-line"/><div className="mini-line short"/><div className="mini-blocks"><i/><i/><i/></div></div><div className="art-card card-front"><div className="front-top"><span>DESIGN NOTES</span><b>✳</b></div><div className="front-title">Good design<br/>starts with <em>people.</em></div><div className="front-bottom"><span>DAY 01 / 30</span><span>↗</span></div></div><div className="floating-star">✦</div></div></div></section>
      <section className="overview-strip"><div><span className="section-label">YOUR JOURNEY</span><p>From your first design question to a project you can present.</p></div><div className="progress-wrap"><div className="progress-text"><span>Your progress</span><strong>{done.length} of 30 lessons</strong></div><div className="progress-track"><span style={{width: `${done.length / 30 * 100}%`}}/></div><small>Saved in this browser</small></div></section>
      <section className="course-section" id="lessons"><div className="section-heading"><div><span className="section-label">THE COURSE</span><h2>Your 30-day learning path</h2><p>Pick up where you left off, or explore any topic at your own pace.</p></div><div className="search-box"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search lessons" aria-label="Search lessons"/></div></div><div className="module-tabs" role="group" aria-label="Filter by module"><button className={moduleIndex === -1 ? 'active' : ''} onClick={() => setModuleIndex(-1)}>All lessons <span>30</span></button>{course.modules.map((module, i) => <button key={module.name} className={moduleIndex === i ? 'active' : ''} onClick={() => setModuleIndex(i)}>{module.name}</button>)}</div><div className="lessons-grid">{filtered.map(item => { const available = !!slideManifest[String(item.day)]; const complete = done.includes(item.day); return <button className="lesson-card" key={item.day} onClick={() => goLesson(item.day)}><div className="card-meta"><span className="day-pill">{dayLabel(item.day)}</span><span className={`status ${available ? 'ready' : ''}`}>{complete ? <><CheckCircle2 size={14}/> Completed</> : available ? 'Slides ready' : 'Overview ready'}</span></div><div className="card-symbol" aria-hidden="true">{['✳','◒','◎','▦','↗','✦'][course.modules.indexOf(moduleFor(item.day))]}</div><h3>{item.title}</h3><p>{item.description}</p><div className="card-footer"><span>{moduleFor(item.day).name}</span><ArrowRight size={18}/></div></button>; })}</div>{filtered.length === 0 && <div className="no-results">No lessons match your search. Try another word.</div>}</section>
    </main>}
    <footer className="footer"><div><span className="footer-brand">designerkid<span>.</span></span><p>Learn, make, and grow your design skills.</p></div><span>Made for curious designers · 30 days of UI/UX</span></footer>
  </div>;
}

export default App;
