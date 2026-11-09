// Short, concrete examples shown as an extra illustrated slide in each lesson.
// Each illustration is drawn with HTML/CSS so it stays crisp in the browser.
export const examples = {
  1: { heading: 'UI and UX in one booking flow', takeaway: 'UI is what people see and tap. UX is how easily they reach their goal.', cards: [
    ['Clear button', 'A strong “Book now” button makes the next action easy to spot.', 'button'],
    ['Easy journey', 'Seat selection follows the movie and time choice naturally.', 'steps'],
    ['Helpful feedback', 'A confirmation screen tells people the booking worked.', 'success']] },
  2: { heading: 'A design thinking example', takeaway: 'Start with a real problem, explore options, then test a small solution.', cards: [
    ['Observe', 'Students miss class updates scattered across several chats.', 'notes'],
    ['Explore', 'Sketch one shared timetable and a simple reminder.', 'wireframe'],
    ['Test', 'Ask three students to find tomorrow’s class in the prototype.', 'test']] },
  3: { heading: 'Three ways to learn from users', takeaway: 'Pick a research method that matches the question you need to answer.', cards: [
    ['Interview', 'Ask why a person chose a particular way to pay.', 'notes'],
    ['Observation', 'Watch where they pause during a checkout task.', 'phone'],
    ['Survey', 'Collect the most common issue from a larger group.', 'chart']] },
  4: { heading: 'Turn interviews into better design', takeaway: 'Compare what people say with what existing products make them do.', cards: [
    ['Ask neutrally', '“Tell me how you booked your last trip” invites a real story.', 'notes'],
    ['Compare flows', 'Check how two apps show dates, prices, and checkout.', 'compare'],
    ['Find a pattern', 'Repeated confusion around fees becomes a design opportunity.', 'chart']] },
  5: { heading: 'A persona grounded in evidence', takeaway: 'A useful persona connects a goal, a difficulty, and real research.', cards: [
    ['Goal', 'Maya wants to book a clinic visit before work.', 'persona'],
    ['Difficulty', 'She cannot tell which appointment times are still open.', 'calendar'],
    ['Evidence', 'Three interviewees mentioned the same uncertainty.', 'notes']] },
  6: { heading: 'A journey, from need to result', takeaway: 'Map the whole experience, including the moments around the app.', cards: [
    ['Before', 'A rider checks whether the train is delayed.', 'phone'],
    ['During', 'They compare a route, price, and arrival time.', 'steps'],
    ['After', 'They look for a receipt and trip support.', 'success']] },
  7: { heading: 'From insight to design question', takeaway: 'Frame the problem around the user before deciding on a feature.', cards: [
    ['Research finding', 'New users often miss the delivery fee until checkout.', 'notes'],
    ['Problem statement', 'Shoppers need the full cost before they commit.', 'compare'],
    ['How might we…', 'How might we make total cost clear earlier?', 'button']] },
  8: { heading: 'Make content easier to find', takeaway: 'Group content by what people look for, then test the labels.', cards: [
    ['Content inventory', 'List every page, feature, and help topic first.', 'notes'],
    ['Useful groups', 'Put orders, returns, and delivery in clear sections.', 'sitemap'],
    ['Plain labels', '“Track order” is clearer than “My logistics”.', 'navtop']] },
  9: { heading: 'Choose the right navigation pattern', takeaway: 'Let the content and the user’s task decide the navigation.', cards: [
    ['Top navigation', 'Useful for a few clear sections on a website.', 'navtop'],
    ['Bottom navigation', 'Keeps key destinations within reach in an app.', 'navbottom'],
    ['Filters and search', 'Help people explore a large collection.', 'filters']] },
  10: { heading: 'Show the full task flow', takeaway: 'Include choices and recovery, not only the ideal path.', cards: [
    ['Happy path', 'Choose a product, add it to the cart, then pay.', 'steps'],
    ['Decision', 'Guest checkout or sign in? Show both routes.', 'branch'],
    ['Error recovery', 'A declined payment offers a clear retry.', 'error']] },
  11: { heading: 'Wireframe before polishing', takeaway: 'Explore structure and priority before choosing colors or decoration.', cards: [
    ['Home screen', 'Put search and the main categories first.', 'wireframe'],
    ['Detail screen', 'Place key information above the primary action.', 'phone'],
    ['Checkout screen', 'Show total price and the next step clearly.', 'button']] },
  12: { heading: 'Build a simple sign-in screen', takeaway: 'Use basic Figma tools to make a screen that is easy to scan.', cards: [
    ['Frame', 'Start with a phone-sized canvas and safe margins.', 'phone'],
    ['Fields', 'Group email and password with readable labels.', 'form'],
    ['Action', 'Give the sign-in button clear priority.', 'button']] },
  13: { heading: 'A type scale with clear jobs', takeaway: 'Typography should help people scan, read, and act.', cards: [
    ['Page title', 'Large, short text tells people where they are.', 'type'],
    ['Body copy', 'Comfortable line length supports longer reading.', 'article'],
    ['Helper text', 'Small text still needs enough contrast to read.', 'form']] },
  14: { heading: 'Color that carries meaning', takeaway: 'Check contrast and never use color as the only signal.', cards: [
    ['Primary action', 'A distinct color draws attention to the next step.', 'button'],
    ['Status', 'Pair a warning color with words and an icon.', 'error'],
    ['Readable text', 'Check the text and background together.', 'palette']] },
  15: { heading: 'Spacing makes a layout readable', takeaway: 'Consistent gaps show which elements belong together.', cards: [
    ['Group related items', 'Keep a label close to its input field.', 'form'],
    ['Use a grid', 'Align cards to a shared column structure.', 'grid'],
    ['Leave breathing room', 'Separate sections more than individual rows.', 'article']] },
  16: { heading: 'Watch Auto Layout respond', takeaway: 'A component should adapt when text or available width changes.', cards: [
    ['Growing button', 'Padding stays even when the label gets longer.', 'button'],
    ['Stacked card', 'Details move down when an extra line is added.', 'article'],
    ['Narrow screen', 'Two columns become one without breaking order.', 'responsive']] },
  17: { heading: 'One component, useful states', takeaway: 'Variants keep familiar controls consistent across the product.', cards: [
    ['Default', 'The primary button is ready to use.', 'button'],
    ['Disabled', 'The same button shows why action is unavailable.', 'disabled'],
    ['Loading', 'Feedback appears after a person taps it.', 'loading']] },
  18: { heading: 'A small design system in practice', takeaway: 'Shared decisions reduce visual drift as screens grow.', cards: [
    ['Color tokens', 'The same action color appears across screens.', 'palette'],
    ['Type styles', 'Headings and labels follow a clear scale.', 'type'],
    ['Components', 'Buttons and fields reuse the same patterns.', 'form']] },
  19: { heading: 'Mobile patterns people recognize', takeaway: 'Familiar patterns help people focus on their task.', cards: [
    ['Bottom navigation', 'Core destinations stay reachable with a thumb.', 'navbottom'],
    ['Search', 'A clear search field helps with specific items.', 'filters'],
    ['Empty state', 'Explain what is missing and what to do next.', 'empty']] },
  20: { heading: 'Polish without losing clarity', takeaway: 'High-fidelity UI still needs clear hierarchy and useful feedback.', cards: [
    ['Consistent screen', 'Reuse spacing, color, and type across the flow.', 'phone'],
    ['Primary action', 'One main action stands out on each screen.', 'button'],
    ['State changes', 'Show success, errors, and empty results.', 'success']] },
  21: { heading: 'Make the main journey clickable', takeaway: 'Prototype the important decisions and feedback states.', cards: [
    ['Tap target', 'A visible card opens a product detail.', 'phone'],
    ['Transition', 'The next screen keeps the person oriented.', 'steps'],
    ['Feedback', 'A completed action shows confirmation.', 'success']] },
  22: { heading: 'One page, two screen sizes', takeaway: 'Keep the same priority while changing the layout.', cards: [
    ['Desktop', 'A wide hero gives copy and image their own columns.', 'browser'],
    ['Mobile', 'Stack the message before the supporting visual.', 'responsive'],
    ['Navigation', 'Condense links into a menu when space is tight.', 'navtop']] },
  23: { heading: 'A landing page that guides action', takeaway: 'Show the offer, evidence, and next step in a clear order.', cards: [
    ['Hero', 'A short headline explains the product in seconds.', 'browser'],
    ['Proof', 'A testimonial answers a common doubt.', 'quote'],
    ['Call to action', 'The same clear action appears at the right moment.', 'button']] },
  24: { heading: 'Watch a user test, then learn', takeaway: 'Observe behavior first; ask for an explanation after the task.', cards: [
    ['Set a task', '“Find a delivery date” is clearer than “Explore the app”.', 'notes'],
    ['Observe', 'Write down pauses, mistakes, and workarounds.', 'test'],
    ['Prioritize', 'Fix the issue that blocked the most important task.', 'chart']] },
  25: { heading: 'Spot usability and access issues', takeaway: 'Small interface details can make a task much harder.', cards: [
    ['Visibility', 'Show what happened after a form is submitted.', 'success'],
    ['Clear errors', 'Explain which field needs attention and why.', 'error'],
    ['Keyboard access', 'Keep focus visible as people move through controls.', 'form']] },
  26: { heading: 'Give developers usable details', takeaway: 'Handoff should explain behavior as well as appearance.', cards: [
    ['Specs', 'Note spacing, colors, and component states.', 'grid'],
    ['Behavior', 'Show what a button does after a tap.', 'steps'],
    ['Edge cases', 'Include empty, loading, and error screens.', 'empty']] },
  27: { heading: 'A case study with evidence', takeaway: 'Explain what you knew, what you changed, and what happened.', cards: [
    ['Problem', 'Name the user need and project constraint.', 'notes'],
    ['Process', 'Show a research note, sketch, and test result.', 'wireframe'],
    ['Outcome', 'Share the final screen and what you learned.', 'success']] },
  28: { heading: 'Tell a project story clearly', takeaway: 'Select a few useful artifacts instead of showing every screen.', cards: [
    ['Open with context', 'What was the product and who was it for?', 'article'],
    ['Show decisions', 'Connect evidence to a design change.', 'compare'],
    ['End honestly', 'Share results, limits, and the next question.', 'chart']] },
  29: { heading: 'Talk through your design work', takeaway: 'Use one real example for each answer in an interview.', cards: [
    ['The challenge', 'Describe a specific user problem.', 'notes'],
    ['Your decision', 'Explain the trade-off you made and why.', 'branch'],
    ['What changed', 'Say what feedback taught you.', 'chart']] },
  30: { heading: 'Review the complete project', takeaway: 'A strong review connects the app, landing page, and case study.', cards: [
    ['Mobile app', 'Can someone complete the main task?', 'phone'],
    ['Landing page', 'Can a visitor understand the offer quickly?', 'browser'],
    ['Case study', 'Can you explain why the design changed?', 'article']] }
};
