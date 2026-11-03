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

// Reference-inspired introduction, using only roles grounded in the portfolio.
const roleElement=document.querySelector('.typed-role');
const roleNames=['full-stack development','Python automation','technical content'];
let roleIndex=0,letterIndex=roleNames[0].length,erasing=false,roleTimer;
function typeRole(){
 if(document.hidden||manuallyPaused||reducedMotion.matches){roleTimer=setTimeout(typeRole,300);return;}
 const role=roleNames[roleIndex];
 if(erasing){letterIndex=Math.max(0,letterIndex-1);}else{letterIndex=Math.min(role.length,letterIndex+1);}
 roleElement.textContent=role.slice(0,letterIndex);
 let delay=erasing?35:65;
 if(!erasing&&letterIndex===role.length){erasing=true;delay=2200;}
 else if(erasing&&letterIndex===0){erasing=false;roleIndex=(roleIndex+1)%roleNames.length;delay=350;}
 roleTimer=setTimeout(typeRole,delay);
}
roleTimer=setTimeout(typeRole,2200);
const header=document.querySelector('.site-header');
function syncHeader(){header.classList.toggle('nav-scrolled',scrollY>40);}
window.addEventListener('scroll',syncHeader,{passive:true});syncHeader();
const navLinks=[...document.querySelectorAll('.site-header nav a')];
if('IntersectionObserver' in window){
 const navObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id));}});},{rootMargin:'-15% 0px -65% 0px'});
 document.querySelectorAll('main section[id]').forEach(section=>navObserver.observe(section));
}
// Light atmospheric particles: pause when requested or when the page is hidden.
const atmosphere=document.querySelector('.atmosphere');
const context=atmosphere.getContext('2d');
let canvasWidth=0,canvasHeight=0,lastFrame=0;
let particles=[];
function sizeAtmosphere(){
 const rect=atmosphere.getBoundingClientRect();canvasWidth=rect.width;canvasHeight=rect.height;
 const ratio=Math.min(devicePixelRatio||1,1.5);atmosphere.width=Math.round(canvasWidth*ratio);atmosphere.height=Math.round(canvasHeight*ratio);context.setTransform(ratio,0,0,ratio,0,0);
 particles=Array.from({length:28},()=>({x:Math.random()*canvasWidth,y:Math.random()*canvasHeight,r:.5+Math.random(),speed:.12+Math.random()*.24,opacity:.1+Math.random()*.25}));
}
sizeAtmosphere();window.addEventListener('resize',sizeAtmosphere);
function drawAtmosphere(time){
 requestAnimationFrame(drawAtmosphere);
 if(document.hidden||manuallyPaused||reducedMotion.matches||time-lastFrame<33)return;
 lastFrame=time;context.clearRect(0,0,canvasWidth,canvasHeight);
 particles.forEach(p=>{p.y-=p.speed;p.x+=Math.sin(time*.0003+p.y)*.05;if(p.y<0)p.y=canvasHeight;context.beginPath();context.arc(p.x,p.y,p.r,0,Math.PI*2);context.fillStyle='rgba(233,194,143,'+p.opacity+')';context.fill();});
}
requestAnimationFrame(drawAtmosphere);
