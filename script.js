(function(){
  const root = document.body;
  const toggle = document.getElementById('skyToggle');
  const label = document.getElementById('toggleLabel');
  const starsContainer = document.getElementById('stars');
  const STORAGE_KEY = 'theme';
  function buildStars(count){
    const frag = document.createDocumentFragment();
    for(let i = 0; i < count; i++){
      const s = document.createElement('span');
      const size = Math.random() * 1.5 + 1;
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      s.style.top = Math.random() * 100 + '%';
      s.style.left = Math.random() * 100 + '%';
      s.style.animationDelay = (Math.random() * 3) + 's';
      frag.appendChild(s);
    }
    starsContainer.appendChild(frag);
  }
  buildStars(60);
  function applyTheme(theme, persist){
    root.setAttribute('data-theme', theme);
    toggle.setAttribute('aria-checked', theme === 'dark' ? 'true' : 'false');
    label.textContent = theme === 'dark' ? 'Dark mode' : 'Light mode';
    if(persist){
      try{ localStorage.setItem(STORAGE_KEY, theme); }catch(e){ /* storage unavailable */ }
    }
  }
  function getPreferredTheme(){
    try{
      const stored = localStorage.getItem(STORAGE_KEY);
      if(stored === 'light' || stored === 'dark') return stored;
    }catch(e){ /* storage unavailable */ }
    // fall back to system preference if nothing saved yet
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  // initialize on load — no persist, just reflecting saved/system state
  applyTheme(getPreferredTheme(), false);

  toggle.addEventListener('click', function(){
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
  });
  toggle.addEventListener('keydown', function(e){
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      toggle.click();
    }
  });
})();
