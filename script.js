(function(){
  var btn=document.querySelector('.menu-btn'), menu=document.getElementById('menu');
  function set(o){btn.setAttribute('aria-expanded',String(o));btn.setAttribute('aria-label',o?'Close menu':'Open menu');menu.classList.toggle('open',o);}
  btn.addEventListener('click',function(){set(btn.getAttribute('aria-expanded')!=='true');});
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){set(false);});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});

  // Links between services and conditions open the matching panel (and any panel around it).
  function openTo(id){var el=document.getElementById(id);if(!el)return;var p=el;while(p){if(p.tagName==='DETAILS')p.open=true;p=p.parentElement;}
    setTimeout(function(){el.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});},30);}
  function fromHash(){var h=location.hash.slice(1);if(h)openTo(h);}
  window.addEventListener('hashchange',fromHash);fromHash();

  // Contact form. The old form posted to the Base44 app backend (with a Cloudflare Turnstile check),
  // which only works inside Base44. Until a form service is connected, this opens the visitor's
  // email app with the same fields filled in, addressed to reception.
  var form=document.getElementById('contact-form');
  form.addEventListener('submit',function(ev){
    ev.preventDefault();
    if(!form.reportValidity())return;
    var f=form.elements;
    var body='Name: '+f.name.value+'\nCompany: '+f.company.value+'\nPhone: '+f.phone.value+'\nEmail: '+f.email.value+'\n\n'+f.message.value;
    window.location.href='mailto:'+form.getAttribute('data-to')+'?subject='+encodeURIComponent('Website enquiry from '+f.name.value)+'&body='+encodeURIComponent(body);
    form.querySelector('.form-note').textContent='Opening your email app to send your message to reception.';
  });

  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
    var els=document.querySelectorAll('.hero-head, .hero-media, .sec-head, .clinic, .split-media, .band-head, .band-card, .photo-row img, .team-group, .timeline li, .duo .card, .visit-grid .card, .ins, .contact-copy, .form');
    document.documentElement.classList.add('js-reveal');
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:0.05});
    els.forEach(function(el,i){el.classList.add('reveal');el.style.transitionDelay=((i%3)*80)+'ms';io.observe(el);});
  }
})();
