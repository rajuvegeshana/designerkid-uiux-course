import React from 'react';
import { ArrowRight, CheckCircle2, CircleHelp, FileText, MessageCircle, MousePointer2, Search, X } from 'lucide-react';
import './visual-guides.css';

const guideVisuals = {
  'ux-interview-preparation': {
    eyebrow: 'INTERVIEW PREP / VISUAL GUIDE', title: <>Walk in with <em>two clear stories.</em></>, intro: 'A simple path from reading the role to discussing your work.',
    sections: [
      {label:'01 / BEFORE THE CALL', title:'Prepare in four moves.', type:'steps', steps:[['Read the role','Mark repeated skills.'],['Explore the product','Try one real user task.'],['Pick two projects','Know your role and decisions.'],['Prepare questions','Ask about users and teamwork.']]},
      {label:'02 / YOUR INTRODUCTION', title:'A one-minute introduction.', type:'formula', steps:[['Background','Where you come from'],['UX direction','What drew you in'],['Evidence','One relevant project'],['Next step','Work you hope to do']]},
      {label:'03 / PROJECT WALKTHROUGH', title:'Show the decision, not just the screen.', type:'story', before:'“Here is the final app screen.”', after:'“Students missed the ticket price in our first prototype. I moved it beside each option, then checked the revised flow with classmates.”', note:'Fictional example. Use your own contribution, observations, and limits.'},
    ]
  },
  'ux-interview-questions': {
    eyebrow:'INTERVIEW QUESTIONS / VISUAL GUIDE', title:<>Practice the <em>shape of an answer.</em></>, intro:'Use real projects to explain what you did and what you learned.',
    sections:[
      {label:'01 / ANSWER FRAME',title:'Five beats for a useful answer.',type:'formula',steps:[['Context','What was happening?'],['Your role','What did you own?'],['Action','What did you do?'],['Evidence','What did you learn?'],['Reflection','What next?']]},
      {label:'02 / PRACTICE CARDS',title:'Three questions worth rehearsing.',type:'questions',questions:[['Research','When did a finding change your design?','Show the observation → decision.'],['Collaboration','What feedback did you disagree with?','Explain how you listened and responded.'],['Growth','What would you redo in a project?','Name a limitation and next test.']]},
      {label:'03 / EXAMPLE ANSWER',title:'Move from a claim to a story.',type:'story',before:'“I am good at user research.”',after:'“In a course project, I interviewed three students about finding workshops. Their different search terms led me to test clearer category labels.”',note:'Illustrative student example. Keep your own project setting and sample size honest.'}
    ]
  },
  'ux-portfolio-guide': {
    eyebrow:'PORTFOLIO / VISUAL GUIDE',title:<>Let the work <em>tell the story.</em></>,intro:'Help a visitor find your strongest project and understand your decisions.',
    sections:[
      {label:'01 / SITE MAP',title:'A simple portfolio is enough.',type:'site',steps:[['Work','2–3 strong project cards'],['About','Your focus and experience'],['Contact','One easy next step']]},
      {label:'02 / PROJECT CARD',title:'Make each project easy to choose.',type:'project'},
      {label:'03 / KEEP OR CUT',title:'Keep evidence. Cut noise.',type:'compare',good:['Your role and project type','A finding that changed a decision','Selected screens with captions','Honest outcome and limits'],bad:['Unlabelled concepts','Every sketch you made','Decorative motion that slows reading','Claims without evidence']}
    ]
  },
  'case-study-outline': {
    eyebrow:'CASE STUDY / VISUAL GUIDE',title:<>Follow the <em>evidence trail.</em></>,intro:'A repeatable structure for one project, from question to next step.',
    sections:[
      {label:'01 / STORY SPINE',title:'Six blocks, one clear story.',type:'steps',steps:[['Snapshot','Role, timeline, project type'],['Problem','Who needed what?'],['Evidence','What did you observe?'],['Decision','What changed and why?'],['Outcome','What happened?'],['Reflection','What would you test next?']]},
      {label:'02 / EXAMPLE',title:'Connect a finding to a design change.',type:'trail'},
      {label:'03 / IMAGE CAPTIONS',title:'Give every visual a job.',type:'story',before:'“Final screens.”',after:'“Before: ticket price appeared after selection. After: each option shows price up front, following a prototype test where classmates missed it.”',note:'Fictional example. Say whether a result was observed, proposed, or shipped.'}
    ]
  },
  'research-interview-starter': {
    eyebrow:'USER RESEARCH / VISUAL GUIDE',title:<>Ask about <em>real behavior.</em></>,intro:'Plan a short conversation, ask neutral questions, and separate notes from guesses.',
    sections:[
      {label:'01 / INTERVIEW PLAN',title:'Start with one learning goal.',type:'steps',steps:[['Goal','What do you need to learn?'],['People','Who does this task?'],['Questions','Ask about a past experience.'],['Notes','Record what was said.']]},
      {label:'02 / QUESTION SWAP',title:'Make a leading question neutral.',type:'story',before:'“Would this helpful course filter save you time?”',after:'“Tell me about the last time you searched for a course. What did you do first?”',note:'Follow up with “What happened next?” and allow silence.'},
      {label:'03 / AFTER THE CALL',title:'Keep observation and interpretation apart.',type:'notes'}
    ]
  }
};

function Visual({section}) {
  switch(section.type) {
    case 'steps': return <div className="vg-steps">{section.steps.map(([heading,body],i)=><div className="vg-step" key={heading}><b>{String(i+1).padStart(2,'0')}</b><strong>{heading}</strong><span>{body}</span></div>)}</div>;
    case 'formula': return <div className="vg-formula">{section.steps.map(([heading,body],i)=><React.Fragment key={heading}><div><b>{i+1}</b><strong>{heading}</strong><span>{body}</span></div>{i<section.steps.length-1&&<ArrowRight size={17} aria-hidden="true"/>}</React.Fragment>)}</div>;
    case 'story': return <div className="vg-story"><div><small>TOO VAGUE / LEADING</small><p>{section.before}</p></div><ArrowRight aria-hidden="true"/><div><small>SHOW THE THINKING</small><p>{section.after}</p></div><span>{section.note}</span></div>;
    case 'questions': return <div className="vg-questions">{section.questions.map(([category,question,hint])=><article key={category}><CircleHelp size={21}/><small>{category}</small><h3>{question}</h3><p>{hint}</p></article>)}</div>;
    case 'site': return <div className="vg-site"><div className="vg-site-bar"><span>YOUR PORTFOLIO</span><span>Work &nbsp; About &nbsp; Contact</span></div><div className="vg-site-hero">Selected work<br/><small>Show what you solved and why.</small></div><div className="vg-site-cards">{section.steps.map(([heading,body],i)=><div key={heading}><b>0{i+1}</b><strong>{heading}</strong><span>{body}</span></div>)}</div></div>;
    case 'project': return <div className="vg-project"><div className="vg-project-image"><div className="vg-screen"><div/><div/><div/></div><span>SELECTED SCREEN + SHORT CAPTION</span></div><div className="vg-project-copy"><small>FICTIONAL STUDENT PROJECT</small><h3>Finding campus events</h3><p>Role: UX designer · Prototype</p><div><strong>Problem</strong><span>Students struggled to compare event details.</span></div><div><strong>Evidence</strong><span>A prototype test showed where details were missed.</span></div><div><strong>Decision</strong><span>Move key information closer to each event choice.</span></div></div></div>;
    case 'compare': return <div className="vg-compare"><div><h3><CheckCircle2 size={19}/> Keep</h3>{section.good.map(x=><p key={x}>{x}</p>)}</div><div><h3><X size={18}/> Avoid</h3>{section.bad.map(x=><p key={x}>{x}</p>)}</div></div>;
    case 'trail': return <div className="vg-trail"><div><Search size={22}/><small>OBSERVATION</small><strong>Students missed the price.</strong></div><ArrowRight/><div><MousePointer2 size={22}/><small>DECISION</small><strong>Show price beside each option.</strong></div><ArrowRight/><div><MessageCircle size={22}/><small>NEXT CHECK</small><strong>Test the revised flow.</strong></div></div>;
    case 'notes': return <div className="vg-notes"><div><small>WHAT WAS SAID</small><p>“I opened three course pages to compare the schedule.”</p></div><ArrowRight/><div><small>POSSIBLE INTERPRETATION</small><p>Schedule may be hard to compare.</p></div><ArrowRight/><div><small>NEXT QUESTION</small><p>What information matters most when choosing?</p></div></div>;
    default: return null;
  }
}

export default function VisualGuide({item,Checklist,Sources}) {
  const visual=guideVisuals[item.slug];
  if(!visual) return null;
  return <main className="article-page vg-page"><a className="article-back" href="#/guides">← All guides</a><header className="vg-hero"><span className="section-label">{visual.eyebrow}</span><h1>{visual.title}</h1><p>{visual.intro}</p><button type="button" onClick={() => document.getElementById('guide-visuals')?.scrollIntoView({behavior:'smooth'})}>See the examples <ArrowRight size={17}/></button></header><div id="guide-visuals">{visual.sections.map(section=><section className="vg-section" key={section.label}><div className="vg-section-head"><span className="section-label">{section.label}</span><h2>{section.title}</h2></div><Visual section={section}/></section>)}</div><div className="vg-bottom"><Checklist slug={item.slug} items={item.checklist}/><details className="cv-deeper"><summary>Want the detailed writing notes?</summary><div>{item.sections.map(section=><section key={section.heading}><h3>{section.heading}</h3>{section.paragraphs.map((paragraph,i)=><p key={i}>{paragraph}</p>)}</section>)}</div></details><Sources sources={item.sources}/></div></main>;
}

export const hasVisualGuide = slug => Boolean(guideVisuals[slug]);
