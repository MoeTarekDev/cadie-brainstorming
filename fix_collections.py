import os
import re

base_dir = r"c:\Users\Office\Desktop\brainstorming-cadie"

# 1. Add app.js to search.html and collections-hybrid.html
for f in ['search.html', 'collections-hybrid.html']:
    path = os.path.join(base_dir, f)
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
    if '<script src="app.js"></script>' not in content:
        content = content.replace('</body>', '  <script src="app.js"></script>\n</body>')
        with open(path, 'w', encoding='utf-8') as file:
            file.write(content)

# 2. Update app.js to handle resize dynamically
app_path = os.path.join(base_dir, "app.js")
with open(app_path, 'r', encoding='utf-8') as file:
    app_js = file.read()

resize_logic = """
  // Check initial state on mobile
  if (window.innerWidth <= 768 && sidebar) {
    sidebar.classList.add('collapsed');
  }

  // Handle resize dynamically
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && sidebar) {
      if (!sidebar.classList.contains('collapsed')) {
        sidebar.classList.add('collapsed');
      }
    }
  });
"""

if "Handle resize dynamically" not in app_js:
    app_js = app_js.replace("""  // Check initial state on mobile
  if (window.innerWidth <= 768 && sidebar) {
    sidebar.classList.add('collapsed');
  }""", resize_logic)
    with open(app_path, 'w', encoding='utf-8') as file:
        file.write(app_js)

# 3. Modify collections-hybrid.html
hybrid_path = os.path.join(base_dir, "collections-hybrid.html")
with open(hybrid_path, 'r', encoding='utf-8') as file:
    hybrid = file.read()

# Remove the inner sidebar HTML
hybrid = re.sub(r'<!-- Inner Sidebar \(Discord Channels Style\) -->.*?<\/aside>\n', '', hybrid, flags=re.DOTALL)

# Update the JS to read from URL and remove local sidebar rendering
new_js = """  <script>
    const collections = [
      { id: 'checkout', group: 'Core Product', name: 'Checkout', desc: 'Experiments related to the cart and checkout flow. Minimizing friction and reducing cart abandonment.' },
      { id: 'onboarding', group: 'Core Product', name: 'Onboarding', desc: 'First-time user experience, sign-up flows, and tutorials.' },
      { id: 'core-ui', group: 'Core Product', name: 'Core UI', desc: 'Design system, navigation components, and global layout changes.' },
      { id: 'ai-features', group: 'Innovation', name: 'AI Features', desc: 'Integrations with generative models, magic copywriters, and smart recommendations.' },
      { id: 'growth', group: 'Growth & Marketing', name: 'Growth', desc: 'Referral loops, viral mechanics, and paid acquisition landing pages.' },
      { id: 'retention', group: 'Growth & Marketing', name: 'Retention', desc: 'Email campaigns, push notifications, and win-back mechanics.' }
    ];

    const mockExperiments = [
      { title: 'One-click checkout flow', collection: 'checkout', status: 'Shipped', color: '#34d399', bg: 'rgba(52,211,153,0.1)', date: 'Oct 28' },
      { title: 'Guest checkout default', collection: 'checkout', status: 'Testing', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', date: 'Nov 02' },
      { title: 'Remove coupon field', collection: 'checkout', status: 'Rejected', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', date: 'Sep 15' },
      
      { title: 'Magic Copywriter Prototype', collection: 'ai-features', status: 'Parked', color: '#9ca3af', bg: 'rgba(156,163,175,0.1)', date: 'Aug 10' },
      { title: 'AI Image Gen Onboarding', collection: 'ai-features', status: 'Testing', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', date: 'Nov 01' },
      
      { title: 'Skip tutorial button', collection: 'onboarding', status: 'Shipped', color: '#34d399', bg: 'rgba(52,211,153,0.1)', date: 'Jul 22' },
      { title: 'Interactive walkthrough', collection: 'onboarding', status: 'Rejected', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', date: 'Jun 14' },
      
      { title: 'Invite 3 friends modal', collection: 'growth', status: 'Testing', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', date: 'Nov 05' },
      { title: 'Gamified referral rewards', collection: 'growth', status: 'Evolved', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', date: 'Oct 01' },
      
      { title: 'Dark mode toggle', collection: 'core-ui', status: 'Shipped', color: '#34d399', bg: 'rgba(52,211,153,0.1)', date: 'Sep 20' },
      { title: 'Sidebar re-org', collection: 'core-ui', status: 'Testing', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', date: 'Nov 10' },
      
      { title: 'Weekly recap email', collection: 'retention', status: 'Evolved', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', date: 'Oct 15' }
    ];

    const urlParams = new URLSearchParams(window.location.search);
    let currentActiveId = urlParams.get('c') || 'all';

    const renderMainContent = () => {
      const grid = document.getElementById('hybrid-experiments-grid');
      grid.innerHTML = '';

      let experimentsToRender = [];

      if (currentActiveId === 'all') {
        document.getElementById('current-collection-name').textContent = 'All Experiments';
        document.getElementById('current-collection-desc').textContent = 'A complete view of every experiment stored across all collections in Cadie.';
        experimentsToRender = mockExperiments;
      } else {
        const activeCollection = collections.find(c => c.id === currentActiveId);
        if (activeCollection) {
          document.getElementById('current-collection-name').textContent = activeCollection.name;
          document.getElementById('current-collection-desc').textContent = activeCollection.desc;
          experimentsToRender = mockExperiments.filter(e => e.collection === currentActiveId);
        } else {
          document.getElementById('current-collection-name').textContent = 'Unknown Collection';
          document.getElementById('current-collection-desc').textContent = '';
        }
      }

      if (experimentsToRender.length === 0) {
        grid.innerHTML = `<p class="text-muted" style="grid-column: 1/-1;">No experiments found.</p>`;
        return;
      }

      experimentsToRender.forEach(exp => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => window.location.href = 'experiment.html';
        
        let badgeClass = '';
        if (exp.status === 'Shipped') badgeClass = 'badge-success';
        if (exp.status === 'Testing') badgeClass = 'badge-warning';
        if (exp.status === 'Rejected') badgeClass = 'badge-danger';

        card.innerHTML = `
          <div class="card-image" style="background: linear-gradient(135deg, ${exp.bg} 0%, rgba(0,0,0,0) 100%); display:flex; align-items:center; justify-content:center;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${exp.color}" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </div>
          <div class="card-content">
            <div class="flex justify-between items-center" style="margin-bottom: var(--space-2);">
              <span class="badge ${badgeClass}" style="font-size: 10px;">${exp.status}</span>
              <span class="text-xs text-muted">${exp.date}</span>
            </div>
            <h3 class="card-title">${exp.title}</h3>
            <p class="card-desc">Exploration of ${exp.title.toLowerCase()} to improve user experience.</p>
          </div>
        `;
        grid.appendChild(card);
      });
    };

    renderMainContent();
  </script>"""

hybrid = re.sub(r'  <script>\n    // Data setup[\s\S]*?<\/script>', new_js, hybrid)

with open(hybrid_path, 'w', encoding='utf-8') as file:
    file.write(hybrid)

print("Fixes applied.")
