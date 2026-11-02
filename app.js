const menuButton=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('#mobile-nav');
menuButton.addEventListener('click',()=>{const expanded=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!expanded));mobileNav.hidden=expanded;menuButton.querySelector('span').textContent=expanded?'+':'−';});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.querySelector('span').textContent='+';}));
const projects={
careerforge:`<p class="eyebrow">01 / CAREER PREPARATION PLATFORM</p><h2 id="case-dialog-title">CareerForge</h2><p class="dialog-intro">A connected workflow from resume review to learning and interview practice.</p><div class="architecture-line">React interface <span>→</span> Spring Boot REST API <span>→</span> MySQL</div><h3>The problem</h3><p>Resume review, learning resources, and interview practice can become separate activities. CareerForge brings those steps together and keeps the user’s progress connected to their account.</p><h3>Core workflows</h3><ul><li>Extract skills from PDF and DOCX resumes, then review the detected skills.</li><li>Generate role-based learning roadmaps with tasks, resources, and saved progress.</li><li>Save and resume mock interviews, then review feedback.</li><li>Compare a job description with the supported skill catalog.</li></ul><h3>Implementation</h3><p>The React frontend communicates with a Java Spring Boot REST API. MySQL persists account data, learning progress, and interview sessions. JWT authentication protects account access. The interface uses loading states, error messages, and resumable workflows to support continuity.</p><div class="dialog-status"><p><strong>Current scope</strong><br>Job matching is a keyword comparison, not a validated ATS score. Optional AI guidance needs server-side provider credentials. Source code is published; hosting availability and student usability testing remain separate validation steps.</p></div><a class="button button-dark" href="https://github.com/shashank77889/careerforge" target="_blank" rel="noopener noreferrer">Explore source code <span aria-hidden="true">↗</span></a>`,
leaf:`<p class="eyebrow">02 / COMMERCE APPLICATION</p><h2 id="case-dialog-title">Leaf Bookstore</h2><p class="dialog-intro">A customer storefront connected to store administration.</p><div class="architecture-line">React storefront & admin <span>→</span> Spring Boot API <span>→</span> H2</div><h3>The problem</h3><p>A shopping application needs more than product cards. Customer actions must connect to accounts, orders, and the inventory workflows used by store administrators.</p><h3>Core workflows</h3><ul><li>Browse products and manage a shopping cart.</li><li>Use customer accounts and place orders.</li><li>Manage products, orders, and inventory through an admin panel.</li><li>Demonstrate checkout using a simulated payment flow.</li></ul><h3>Implementation</h3><p>React powers the storefront and admin interface. A Java Spring Boot backend manages products, accounts, orders, and inventory using H2 persistence. Spring Security handles session authentication with BCrypt password hashing. Razorpay test-mode integration includes payment verification code.</p><div class="dialog-status"><p><strong>Payment integration status</strong><br>Simulated checkout is available. Razorpay gateway testing awaits test API keys; live payments are not presented as verified. The GitHub release is planned.</p></div>`};
const dialog=document.querySelector('#case-dialog');
const dialogBody=document.querySelector('#case-dialog-content');
let lastTrigger=null;
document.querySelectorAll('[data-case]').forEach(button=>button.addEventListener('click',()=>{lastTrigger=button;dialogBody.innerHTML=projects[button.dataset.case];dialog.showModal();document.body.classList.add('modal-open');dialog.scrollTop=0;dialog.querySelector('.dialog-close').focus();}));
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastTrigger?.focus();});

// Motion stays optional and honors the visitor's system preference.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton=document.querySelector('.motion-toggle');
let manuallyPaused=false;
function syncMotion(){
 const paused=manuallyPaused||reducedMotion.matches;
 document.body.classList.toggle('motion-paused',paused);
 motionButton.setAttribute('aria-pressed',String(paused));
 motionButton.innerHTML=paused?'Resume motion <span aria-hidden="true">▷</span>':'Pause motion <span aria-hidden="true">Ⅱ</span>';
}
motionButton.addEventListener('click',()=>{manuallyPaused=!manuallyPaused;syncMotion();});
reducedMotion.addEventListener('change',syncMotion);
syncMotion();
if('IntersectionObserver' in window&&!reducedMotion.matches){
 document.body.classList.add('reveal-ready');
 const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}});},{threshold:0.06});
 document.querySelectorAll('.section-heading,.case-study,.experience-row,.about-grid,.credentials-grid').forEach(section=>revealObserver.observe(section));
}
const progressIndicator=document.querySelector('.reading-progress');
let progressPending=false;
function updateProgress(){const scrollable=document.documentElement.scrollHeight-innerHeight;progressIndicator.style.width=(scrollable>0?Math.min(100,Math.max(0,scrollY/scrollable*100)):0)+'%';progressPending=false;}
window.addEventListener('scroll',()=>{if(!progressPending){progressPending=true;requestAnimationFrame(updateProgress);}},{passive:true});
window.addEventListener('resize',updateProgress);
updateProgress();
