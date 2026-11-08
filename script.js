// Mobile menu
const btn = document.querySelector('.menu-btn');
const links = document.querySelector('.nav-links');
btn.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
links.addEventListener('click', e => {
  if (e.target.tagName === 'A') links.classList.remove('open');
});

// Health check: score each pillar and name the weakest
const quiz = document.getElementById('quiz');
const result = document.getElementById('result');
const advice = {
  Trust: 'Your weakest pillar is Trust. Agree one definition per metric before building anything new.',
  Speed: 'Your weakest pillar is Speed. Reports are arriving after the decision has been made.',
  Effort: 'Your weakest pillar is Effort. Automating the recurring reports is the fastest win.',
  Action: 'Your weakest pillar is Action. Add corrective-action tracking so bad numbers get fixed.'
};
quiz.addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  b.parentElement.querySelectorAll('button').forEach(x => x.classList.remove('on'));
  b.classList.add('on');
  const qs = [...quiz.querySelectorAll('.q')];
  const done = qs.filter(q => q.querySelector('.on'));
  if (done.length < qs.length) {
    result.textContent = (qs.length - done.length) + ' more to answer.';
    return;
  }
  const scores = qs.map(q => ({ p: q.dataset.pillar, v: +q.querySelector('.on').dataset.v }));
  const total = scores.reduce((a, s) => a + s.v, 0);
  const worst = scores.reduce((a, s) => (s.v < a.v ? s : a));
  result.textContent = total === 8
    ? 'Score 8 of 8. Your reporting is in good shape.'
    : 'Score ' + total + ' of 8. ' + advice[worst.p];
});

// Rotating line above the headline
const lines = ['Data & Business Intelligence Analyst', 'Power BI · SQL · Python', 'Dashboards · Automation · Audit analytics'];
const el = document.getElementById('kicker-typing') || document.querySelector('.kicker');
if (el && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let i = 0, c = 0, del = false;
  (function tick() {
    const t = lines[i];
    el.textContent = t.slice(0, c);
    if (!del && c === t.length) { del = true; return setTimeout(tick, 1800); }
    if (del && c === 0) { del = false; i = (i + 1) % lines.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 30 : 60);
  })();
}
